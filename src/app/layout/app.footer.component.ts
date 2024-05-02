import { Component } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
    url_endpoint:string = '';
    routeSubscribe: any;
    active_menu:string= 'Home';
    bottom_menus: any = [
        {
            menu_name: 'Home',
            menu_link: '/',
            menu_icon: 'pi pi-home text-2xl'
        },
        {
            menu_name: 'Chat',
            menu_link: '/chat',
            menu_icon: 'pi pi-comments text-2xl'
        },
        {
            menu_name: 'My world',
            menu_link: '/my-world',
            menu_icon: 'pi pi-shopping-bag text-2xl'
        },
        {
            menu_name: 'Profile',
            menu_link: '/profile',
            menu_icon: 'pi pi-user text-2xl'
        },
    ]
    constructor(public layoutService: LayoutService,public route: Router) { }
    ngOnInit() {
        //get current url path
        this.url_endpoint = this.route.url;
        console.log('this.url_endpoint :', this.url_endpoint);
        this.checkActiveMenu();
        //route subscribe instanceof NavigationEnd
       this.routeSubscribe =  this.route.events.subscribe((val) => {
            if(val instanceof NavigationEnd){
                this.url_endpoint = val.url;
                this.checkActiveMenu();
            }
        });


    }
    changeMenu(menu_name){
        this.active_menu = menu_name;
    }
    ngOnDestroy() {
       this.routeSubscribe ?  this.routeSubscribe.unsubscribe() : '';
    }
    checkActiveMenu(){
        if(this.url_endpoint == '/'){
            this.active_menu = 'Home';
        }
        if(this.url_endpoint == '/chat'){
            this.active_menu = 'Chat';
            console.log('this.active_menu :', this.active_menu);
        }
        if(this.url_endpoint == '/my-world'){
            this.active_menu = 'My world';
        }
        if(this.url_endpoint == '/profile'){
            this.active_menu = 'Profile';
        }
    }

}
