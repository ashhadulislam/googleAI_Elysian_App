import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchHomeRoutingModule } from './search-home-routing.module';
import { SearchHomeComponent } from './search-home.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    imports: [
        CommonModule,
        SearchHomeRoutingModule,
        AutoCompleteModule,
        ProgressSpinnerModule
    ],
    declarations: [SearchHomeComponent]
})
export class SearchHomeModule { }
