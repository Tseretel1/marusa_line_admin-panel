import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from '../pages/shop-details/shop-details.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private apiUrl = 'https://localhost:7173/';
 //private apiUrl = 'https://192.168.1.11:7174/';
  constructor(private http:HttpClient)
  {

  }

  private cloudName = 'ds1q7oiea';
  private uploadPreset = 'cloudinary_Upload_Preset';

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      formData
    );
  }
  
  getEveryShop(): Observable<any> {
    return this.http.get<any>(this.apiUrl+`ControlPanel/get-every-shop`,);
  }
  getShopStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl+`ControlPanel/get-shop-stats`);
  }
  getShopById(): Observable<any> {
    return this.http.get<any>(this.apiUrl+`ControlPanel/get-shop-by-id`);
  }
  UpdateShop(Newshop:Shop): Observable<any> {
    return this.http.put<any>(this.apiUrl+`ControlPanel/update-shop`,Newshop);
  }
}
