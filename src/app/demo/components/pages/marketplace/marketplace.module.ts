import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceComponent } from './marketplace.component';
import { MarketplaceRoutingModule } from './marketplace-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MarketplaceRoutingModule,
    ],
    declarations: [MarketplaceComponent]
})
export class MarketplaceModule { }
