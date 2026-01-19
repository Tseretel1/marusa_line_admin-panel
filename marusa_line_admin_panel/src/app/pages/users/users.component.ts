import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService, Pagination } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
constructor (private service:AdminService,private router: Router){

  }
  ngOnInit(): void {
    this.getUsers();
  }
  
  userId:number |null= null;
  getuserFitler:Pagination={
    userName:null,
    gmail:null,
    pageNumber:1,
    pageSize:100,
  }
  users:GetusersDto[]= [];
  totalCount:number = 0;
  getUsers(){
    this.service.GetusersList(this.getuserFitler).subscribe((resp)=>{
      this.users = resp;
      this.hideInputsModal();
      if(resp){
        this.CreatePagenation(this.users[0].totalCount);
        if(this.totalUserCount==0){
          this.getUserStats();
         }
       }
    })
  }
  CreatePagenation(totalcount:number){
    this.totalCount = totalcount; 
    this.totalPages = Math.ceil(this.totalCount / this.getuserFitler.pageSize);
    this.lastPage = Math.ceil(this.totalCount / this.getuserFitler.pageSize);
  }
  UserId:number = 0;
  isBlocked :boolean = false;
  openBlockModal(num:number, block :boolean){
    this.UserId = num;
    this.isBlocked = block;
  }
  hideBlockModal(){
    this.UserId = 0;
  }

  getEveryUser(){
    this.getuserFitler.userName = null;
    this.getuserFitler.gmail = null;
    this.getUsers();
  }

  lastPage: number = 0; 
  selectedPage: number = 1;
  pageNumber: number = 1;
  changePage(page: number) {
    if (page < 1 || page > this.lastPage) return;
    this.selectedPage = page;
    this.getuserFitler.pageNumber = page;
    const middle = this.pageNumber + 2;
    if (page > middle) {
      this.pageNumber = page - 2;
    } else if (page < middle && this.pageNumber > 1) {
      this.pageNumber = Math.max(1, page - 2);
    }
    this.getUsers();
  }
  totalPages:number =0;

  copiedNumber:number = 0;
  spanId:number =0;
  copyToClipboard(text: string,numebr:number, spanId:number): void {
    this.copiedNumber = numebr;
    this.spanId = spanId;
    navigator.clipboard.writeText(text)
    .then(() => {
    })
    .catch(err => {
    });
    setTimeout(() => {
      this.copiedNumber = 0;
      this.spanId = 0;
    }, 3000);
  }

  searchUser(){
    this.getUsers();  
  }
  clearGmail(){
    this.getuserFitler.gmail = null;
    this.getUsers();
  }
  clearUserName(){
    this.getuserFitler.userName = null;
    this.getUsers();
  }
  blockedCount:number = 0;
  NotblockedCount:number = 0;
  totalUserCount:number = 0;
  getUserStats() {
    this.blockedCount  =this.users.filter(u => u.isBlocked).length;
    this.NotblockedCount = this.users.filter(u => !u.isBlocked).length;
    this.totalUserCount = this.users.length;
  }

  inputsModalVisible:boolean = false;
  openInputsModal(){
    this.inputsModalVisible = true;
  }
  hideInputsModal(){
    this.inputsModalVisible = false;
  }

}

export interface GetusersDto {
  id: number;
  email: string;
  name: string;
  profilePhoto: string;
  location: string;
  phoneNumber: string;
  role: string;
  totalCount:number;
  paidOrdersCount: number,
  unPaidOrdersCount: number,
  isBlocked: boolean,
}

export interface GetUserFilteredDto {
  userId: number|null;      
  isBlocked: boolean|null; 
  pageNumber: number;   
  pageSize: number;
  shopId:number;     
}
