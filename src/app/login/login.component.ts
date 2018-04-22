import { Component, OnInit } from '@angular/core';
import { HotelDataService } from '../services/hoteldata.servcie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: any;

  constructor(private hotelSvc: HotelDataService) {
    this.loginUser = {userName: '', password: ''};
  }

  showValidations = false;

  ngOnInit() {
  }

  login(form) {
    console.log(form);
    if (form.invalid) {
      this.showValidations = true;
      return true;
    } else {
      this.hotelSvc.login(this.loginUser)
        .subscribe(x => {
            const result = x.json();
            console.log(result);

            // if the user does not exist.
            if (result.status == 200) {
              console.log('Success');
            } else if (result.status == 400) {
              console.log('Internal Server Error. Please try again later');
            } else if (result.status == 401) {
              console.log('User does not exist');
            } else if (result.status == 402) {
              console.log('Password mismatch');
            }

          },
          err => {
            console.log(err);
          });
    }

  }
}
