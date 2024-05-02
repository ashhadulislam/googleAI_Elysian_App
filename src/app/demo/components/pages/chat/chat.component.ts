import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/demo/service/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
    query: string = '';
    chatData: any = [];
    isSending: boolean = false;
    constructor(public api: ApiService) { }
    send(event) {

        let obj = {
            "text" : this.query
        };
        this.chatData.push({
            text: this.query,
            sender: 'user'
        });
        this.query = '';
        this.isSending = true;
        this.api.callApi({
            method: this.api.generateContent.method,
            path: this.api.generateContent.path,
            data: obj,
            // showSuccess: true,
            showError: true,
            successMessage: 'Message sent successfully',
            errorMessage: 'Message sending failed',
            event: event
        }).then((res:any) => {
            console.log(res);
            this.isSending = false;
            if(res?.Answer && res?.Answer != '')
            {
                // this.chatData.push({
                //     text: res?.Answer,
                //     sender: 'ai'
                // });
                this.convertMessage(res?.Answer);
            }
        }, (err) => {
            console.log(err);
            this.isSending = false;
        })
    }
    checkIfEmpty() {
        return this.query.trim().length === 0;

    }
    convertMessage(content)
    {
        // replace starting ** with <strong> and ending ** with </strong>
        // let formattedText = content.replace(/\*\*/g, "<strong>").replace(/\*\*/g, "</strong>");
        let formattedText = "";
        let currentIdx = 0;
        while(currentIdx < content.length)
        {
            const nextIdx = content.indexOf("**", currentIdx);
            if(nextIdx === -1)
            {
                formattedText += content.substring(currentIdx);
                break;
            }
            formattedText += content.substring(currentIdx, nextIdx);
            formattedText += "<br><b>";
            currentIdx = nextIdx + 2;
            const closingIdx = content.indexOf("**", currentIdx);
            if (closingIdx !== -1) {
                formattedText += content.substring(currentIdx, closingIdx);
                formattedText += "</b>";
                currentIdx = closingIdx + 2; // Move to the character after the closing **
            }
        }
        this.chatData.push({
            text: formattedText,
            sender: 'ai'
        });

    }

}
