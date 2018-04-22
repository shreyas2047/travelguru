import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { HotelDataService } from '../services/hoteldata.servcie';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    selector: 'travel-topnav',
    templateUrl: './topnav.component.html'
})
export class TopNavComponent {
    TitleAndImage: any;
    CenterTabs: any;
    RightTabs: any;
    LogoutTab: any;
    UserDetails: any;

    constructor(private dataSvc: DataService, private hotelDataSvc: HotelDataService, private router: Router) {
      this.UserDetails = {
        isAuthenticated: false,
        firstName: '',
        lastName: ''
      };
        this.TitleAndImage = {
            title: 'Travel Guru',
            image: 'https://www.travelguru.com/travelguru/resources/beetle/images/tg/travelguru-homestay-logo-199x52.png'
        };
        this.CenterTabs = [];
        this.RightTabs = this.dataSvc.getRightMenu();
        this.hotelDataSvc.handleLoginAndLogout()
        .subscribe(x => {
            console.log(x);
            this.UserDetails = x;
            console.log(this.UserDetails);
            if (x.isAuthenticated) {
                this.CenterTabs = this.dataSvc.getCenterMenu();
                this.RightTabs = [];
                this.router.navigateByUrl('/home');
            }
            else {
                this.CenterTabs = [];
                this.RightTabs = this.dataSvc.getRightMenu();
                this.router.navigateByUrl('/login');
            }
        });
    }
logout() {
      this.hotelDataSvc.logout();
}
}

