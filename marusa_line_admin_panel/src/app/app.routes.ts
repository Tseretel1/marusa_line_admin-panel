import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopDetailsComponent } from './pages/shop-details/shop-details.component';
import { AddShopComponent } from './pages/add-shop/add-shop.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    { path:'home', component: HomeComponent},
    { path:'shop-details/:id', component: ShopDetailsComponent},
    { path:'add-shop', component: AddShopComponent},
    { path:'users', component: UsersComponent},
    { path: '', component: HomeComponent }, 
    { path: '**', component: HomeComponent }  
];
