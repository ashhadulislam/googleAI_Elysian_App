import { Component } from '@angular/core';
import { ApiService } from 'src/app/demo/service/api.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss']
})
export class SearchHomeComponent {
news:any[]=[];
isFetching:boolean=false
constructor(private api: ApiService){}
ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getNews();

}
getNews()
{
    this.isFetching = true;
    this.api.getRssFeeds().subscribe((data:any)=>{
    console.log('data :', data);
        this.news = data.item;
        this.isFetching = false;
    },(error)=>{
        console.log(error);
        this.isFetching = false;
    })
}

}
