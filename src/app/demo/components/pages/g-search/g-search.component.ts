import { Component } from '@angular/core';
import { ApiService } from 'src/app/demo/service/api.service';

@Component({
  selector: 'app-g-search',
  templateUrl: './g-search.component.html',
  styleUrls: ['./g-search.component.scss']
})
export class GSearchComponent {
    searchResults: any[] = [];
    faker: any[] = [1,2,3,4];
    query:String= '';
    isSearching:boolean = false;
    constructor(public api: ApiService) { }

    search(p=1,l=10) {
        let q = this.query != '' ? this.query : 'diabetes';
        this.isSearching = true;
        this.api.callApi({
            method: this.api.generateSearch.method,
            path: this.api.generateSearch.path,
            data: {text:q.replace(/ /g,'+'),page:p,limit:l},
            showError: true,

        }).then((res:any)=>{
            if(res?.length && Array.isArray(res)){
                this.searchResults = res;
            }
            this.isSearching = false;
        },(err)=>{
            this.isSearching = false;
        })
    }
    navigate(link)
    {
        window.open(link);
    }
    navBack()
    {
        window.history.back();
    }
}
