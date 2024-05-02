import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchHomeComponent } from './search-home.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SearchHomeComponent }
    ])],
    exports: [RouterModule]
})
export class SearchHomeRoutingModule { }
