import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { AddShopComponent } from './pages/add-shop/add-shop.component';

export const routes: Routes = [
    { path:'home', component: HomeComponent},
    { path:'shop-details/:id', component: ShopDetailsComponent},
    { path:'add-shop', component: AddShopComponent},
    { path: '', component: HomeComponent }, 
    { path: '**', component: HomeComponent }  
];
