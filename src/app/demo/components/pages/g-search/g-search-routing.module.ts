import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GSearchComponent } from './g-search.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: GSearchComponent }
    ])],
    exports: [RouterModule]
})
export class GSearchRoutingModule { }
