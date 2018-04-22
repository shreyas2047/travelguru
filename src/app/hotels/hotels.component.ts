import { Component, OnInit } from '@angular/core';
import { HotelDataService } from '../services/hoteldata.servcie';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
  hotels: Array<any>;
  constructor(private hotelSvc: HotelDataService) {

    this.hotelSvc.getRoomsList()
      .subscribe(x => {
        console.log(x.json());
        this.hotels = x.json().hotels;
      },
      err => {
        console.log(err);
      });
  }

}
