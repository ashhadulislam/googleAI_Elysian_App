import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GSearchComponent } from './g-search.component';
import { GSearchRoutingModule } from './g-search-routing.module';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
    imports: [
        CommonModule,
        GSearchRoutingModule,
        FormsModule,
        ToolbarModule,
        InputTextareaModule,
        ToastModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        SkeletonModule

    ],
    declarations: [GSearchComponent]
})
export class GSearchModule { }
