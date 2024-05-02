import { Component } from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent {
marketPlaceOptions: any[] = [
    {
        title: 'Health',
        image: './assets/elysian/health.png',
        description: 'Buy and sell items from other players.',
        link: '/marketplace'
        },
        {
        title: 'Sleep',
        image: './assets/elysian/sleep.png',
        description: 'Bid on items from other players.',
        link: '/auction-house'
        },
        {
        title: 'Incontinence',
        image: './assets/elysian/incontinence.png',
        description: 'Trade items with other players.',
        link: '/trade'
        },
        {
            title: 'Fall Prevention',
            image: './assets/elysian/fall_prevention.png',
            description: 'Buy and sell items from other players.',
            link: '/marketplace'
        },
        {
            title: 'Entertainment',
            image: './assets/elysian/entertainment.png',
            description: 'Buy and sell items from other players.',
            link: '/marketplace'
        },
        {
            title: 'Shopping',
            image: './assets/elysian/shopping.png',
            description: 'Buy and sell items from other players.',
            link: '/marketplace'
        },

]
constructor(){}
amazonMarketPlaceSearch(menu)
{
    let query:String = ''
    if(menu == 'Health')
    {
        // Health & Wellness Medication management tools
        query = 'Health+%26+Wellness+Medication+management+tools';
        // url = 'https://www.amazon.com/s?k=Health+%26+Wellness+Medication+management+tools';
    }
    if(menu == 'Sleep')
    {
        // Sleep & Rest Sleep aids
        query = 'Sleep+%26+Rest+Sleep+aids';
        // url = 'https://www.amazon.com/s?k=Sleep+%26+Rest+Sleep+aids';
    }
    if(menu == 'Incontinence')
    {
        // Incontinence Incontinence aids
        query = 'Incontinence+Incontinence+aids';
        // url = 'https://www.amazon.com/s?k=Incontinence+Incontinence+aids';
    }
    if(menu == 'Fall Prevention')
    {
        // Fall Prevention Fall prevention aids
        query = 'Fall+Prevention+Fall+prevention+aids';
        // url = 'https://www.amazon.com/s?k=Fall+Prevention+Fall+prevention+aids';
    }
    if(menu == 'Entertainment')
    {
        // Entertainment Entertainment aids
        query = 'Entertainment+Entertainment+aids';
        // url = 'https://www.amazon.com/s?k=Entertainment+Entertainment+aids';
    }
    if(menu == 'Shopping')
    {
        // Shopping Shopping aids
        query = 'Shopping Shopping aids';
        // url = 'https://www.amazon.com/s?k=Shopping+Shopping+aids';
    }
    // window.open(`https://www.amazon.com/s?k=${query}`);
    window.location.href = `https://www.amazon.in/s?k=${query}`;

}
}
