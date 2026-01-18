import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-shop',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-shop.component.html',
  styleUrl: './add-shop.component.scss'
})
export class AddShopComponent {
  constructor(private adminService:AdminService){}
  shop :AddShop={
    name :'',
    email :'',
    password :'',
  }

  addShop(){
    if(this.shop.password!=''&&this.shop.email!=''&&this.shop.password!=''){
      this.adminService.AddShop(this.shop).subscribe(
        (resp)=>{
        }
      )
    }
  }
}
export interface AddShop{
  name:string;
  email:string;
  password:string;
}