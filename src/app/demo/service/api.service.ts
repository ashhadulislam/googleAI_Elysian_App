import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
export interface IApiConfig {
  method: 'get' | 'post' | 'delete' | 'put' | 'patch',
  params?: string;
  data?: any;
  path: string;
  showLoader?: boolean;
  showSuccess?: boolean;
  showError?: boolean;
  duration?: number; // in milliseconds
  successMessage?: string;
  errorMessage?: string;
  pageAction?: string;
  pageName?: string;
  confirmation?: boolean;
  confirmationMessage?: string;
  confirmationTitle?: string;
  confirmationYes?: string;
  confirmationNo?: string;
  isPagination?: boolean;
  event?: any;
  paginationConfig?: {
    pageIndex: number;
    pageSize: number;
  };
  toastPosition?: 'topCenter' | 'botomCenter' | 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight';
}
interface EndPoint {
  path: string;
  method: 'get' | 'post' | 'delete' | 'put' | 'patch';
}
interface ToastCustomConfig {
  detail: 'SUCCESS' | 'ERROR' | 'WARNING',
  duration?:number, //miliseconds
  summary?: string,
}
@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor {

  constructor(private http: HttpClient, public _router: Router,public toast: MessageService,
    public _dialog: ConfirmationService
  ) { }

  URL = "http://54.210.146.5:5000/";
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let status = true;
    const api_token = sessionStorage.getItem('access_token');
    // const menu_list = JSON.parse(sessionStorage.getItem('menu_list')!);
    if (api_token && req?.responseType != 'blob') {
      const authReq = req.clone({
        setHeaders: {
          "Authorization": `Bearer ${api_token}`
        }
      });
      return next.handle(authReq).pipe(
        catchError(error => {
          if (error.status === 401) {
            // this._router.navigate(['/authentication/login']);
          }
          return throwError(error);
        })
      );
    }
    return next.handle(req);
    // throw new Error('Method not implemented.');
  }

  callApi(config: IApiConfig) {
    return new Promise(async(resolve, reject) => {
      let url = `${this.URL}${config.path}`;
      config?.params && config?.params != '' ? url = `${url}?${config.params}` : url = `${url}?`;

      try{ var confirmRes = config.confirmation ? await this.confirmDialog(config): true;}catch(err){reject(false);return}
      if(!confirmRes){reject(false);}
      if(config.method == 'get' || config.method == 'delete'){
        if(config.isPagination){
          url = `${url}&page=${config.paginationConfig?.pageIndex}&limit=${config.paginationConfig?.pageSize}`;
        }
        config.data = {}; //as second parameter can be used for headers
        this.http[config.method](url).subscribe(
            (res:any) => {
            console.log('res :', res);
                this.handleSuccessCallback(config, res);
                res?.status == true ? resolve(res) : reject(false);
        }, (err:HttpErrorResponse) => {
            this.handleErrorCallback(config, err);
            reject(false);
        });
      }
      else{
        //here for post,put,patch we can pass the data as second parameter and headers as third parameter
        this.http[config.method](url, config.data).subscribe(
          (res:any) => {
          this.handleSuccessCallback(config, res);
          resolve(res);
        //   res?.status == true ? resolve(res) : reject(false);
        }, (err:HttpErrorResponse) => {
          this.handleErrorCallback(config, err);
          reject(false);
        });
      }

    });
  }
  handleSuccessCallback(config: IApiConfig, res: any)
  {
    if(res?.Answer != '')
    {
      if(config.showSuccess){
        this.toast.add({
            severity: 'success',
            summary: 'Success',
            detail: res?.message || config.successMessage || 'Success',
            life: config.duration || 3000,
            closable: true,

        })
        // this.toast.add({  severity: 'info', summary: 'Info', detail: 'Message Content' });
      }
    }
    else{
          if(config.showError){
            this.toast.add({
              severity: 'error',
              summary: 'Error',
              detail: res?.message || config.errorMessage || 'Error',
              life: config.duration || 3000,
              closable: true,
            })
          }
      }
  }
  handleErrorCallback(config: IApiConfig, err: HttpErrorResponse){
    err.status === 404 ? config.errorMessage = 'API Not Found' : '';
    if(config.showError){
        this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message || config.errorMessage || 'Error',
            life: config.duration || 3000,
            closable: true,
        })
    }
  }
  confirmDialog(config: IApiConfig){
    return new Promise((resolve, reject) => {
    //   Swal.fire({
    //     title: config.confirmationTitle || 'Are you sure?',
    //     text: config.confirmationMessage || 'You won\'t be able to revert this!',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: config.confirmationYes || 'Yes, delete it!',
    //     cancelButtonText: config.confirmationNo || 'No, cancel!',
    //   }).then((_result:any)=>{
    //       if(_result.isConfirmed){resolve(true);}else{reject('false');}
    //     },(err:any)=>{
    //       reject('false');
    //     });
    this._dialog.confirm({
        message: config.confirmationMessage || 'Are you sure?',
        header: config.confirmationTitle || 'Confirmation',
        target: config.event?.target || null,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            resolve(true);
        },
        reject: () => {
          reject(false);
        }
    });
    });
  }
  showToast(data : ToastCustomConfig)
  {
    !data.duration ? data.duration = 2000:'';
    !data.summary ? data.summary = "This is Toast" : '';
      if(data.detail == "SUCCESS")
      {
        this.toast.add({severity: 'success', summary: data.summary, detail: data.detail, life: data.duration})
      }
      if(data.detail == "ERROR")
      {
        this.toast.add({severity: 'error', summary: data.summary, detail: data.detail, life: data.duration})
      }
      if(data.detail == "WARNING")
      {
        this.toast.add({severity: 'warn', summary: data.summary, detail: data.detail, life: data.duration})
      }
  }
  googleSearch(query: string = '', page: number = 1, limit: number = 10)
  {
    query = query.replace(' ', '+');
    // let url = 'https://customsearch.googleapis.com/customsearch/v1?key=AIzaSyBaEhhWxP0ylr47eXY0zn_l6wkOXSXRuDU&cx=43786953a7ee9418b&q='+query;
    let url = "https://phpstack-821135-4143862.cloudwaysapps.com/gsearch?query="+query+"&page="+page+"&limit="+limit;
    return this.http.get(url);
  }
  getRssFeeds()
  {
    let url = "assets/demo/data/news-rss.json";
    // let url = "https://timesofindia.indiatimes.com/rssfeedstopstories.cms";
    return this.http.get(url);

  }
  //endpoints
  generateContent: EndPoint = {path: 'generate-content',method: 'post'};
  generateSearch: EndPoint = {path: 'generate-search',method: 'post'};
  operatorAdd: EndPoint = {path: 'operator',method: 'post'};
}
