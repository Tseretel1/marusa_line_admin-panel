import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Shop } from '../shop-details/shop-details.component';
import { AppRoutes } from '../../shared/appRoutes';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  shopsList: Shop[] = [];
  AppRoutes =AppRoutes;
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {
    this.loadeveryShop();
  }

  loadeveryShop(): void {
    this.adminService.getEveryShop().subscribe(
      (data) => {
        this.shopsList = data;
        console.log(this.shopsList)
      },
    );
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text)
    .then(() => {
    })
    .catch(err => {
    });
    setTimeout(() => {
    }, 3000);
  }

  openedShop!: Shop;
  modalVisible:boolean = false; 
  showModal(shopId:number){
    this.subcsription.shopId = shopId;
      var shop = this.shopsList.find(x=>x.id== this.subcsription.shopId);
      if(shop){
        this.openedShop = shop;
      }
    this.modalVisible = true;
  }
  hideModal(){
    this.subcsription.shopId =0;
    this.modalVisible =false;
  }
  subcsription:SubscriptionObj={
    shopId :0,
    subscription :'',
  }
  addSubscription(subName:string){
    this.subcsription.subscription = subName;
    this.openedShop.subscription = subName;
    this.adminService.ChangeSubscription(this.subcsription).subscribe(
      (resp)=>{
        this.hideModal();
      }
    )
  }
}
export interface SubscriptionObj{
  shopId:number;
  subscription:string;
}