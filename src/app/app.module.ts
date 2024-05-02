import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './demo/service/api.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,

    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: ApiService, multi: true },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        MessageService,
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
