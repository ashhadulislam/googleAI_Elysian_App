import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    imports: [
        CommonModule,
        ChatRoutingModule,
        FormsModule,
        ToolbarModule,
        InputTextareaModule,
        ToastModule,
        ConfirmDialogModule,
        ProgressSpinnerModule
    ],
    declarations: [ChatComponent]
})
export class ChatModule { }
