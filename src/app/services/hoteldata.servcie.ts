import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class HotelDataService {
    authenticateHandler: Subject <any>;
    constructor(private httpSvc: Http) {
        // initialise the subject i.e. authenticateHandler.
        this.authenticateHandler = new Subject<any>();
    }
    getRoomsList() {
        return this.httpSvc.get('assets/data.json')
            .map(x => {
                // let data = x.json();
                return x;
            });
    }
    getCountryList() {
        return this.httpSvc.get('assets/countries.json')
            .map(x => {
                // let data = x.json();
                return x;
            });
    }
    registerUserWithApi(payLoad) {
        let url = 'http://localhost:4000/travelguru/api/register';
        return this.httpSvc.post(url, payLoad)
        .map(x => {
            // let data = x.json();
            let data = x.json();
            if (data.token) {
                console.log('user is authenticated');
                console.log(data);
                localStorage.setItem('travelguru_token', data.token);
            }
            return x;
        });
    }
    login(payLoad) {
        let url = 'http://localhost:4000/travelguru/api/login';
        return this.httpSvc.post(url, payLoad)
        .map(x => {
            // let data = x.json();
            let data = x.json();
            if (data.token) {
                console.log('user is authenticated');
                console.log(data);
                localStorage.setItem('travelguru_token', data.token);
                this.authenticateHandler.next({isAuthenticated: true, firstName: data.data.firstName, lastName: data.data.lastName});
            }
            return x;
        });
    }
    logout() {
      localStorage.clear();
      this.authenticateHandler.next({isAuthenticated: false, firstName: '', lastName: ''});
    }
    handleLoginAndLogout(): Observable <any> {
        return this.authenticateHandler.asObservable();
    }

}
