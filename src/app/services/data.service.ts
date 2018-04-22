import { Injectable } from '@angular/core';
@Injectable()
export class DataService {
    constructor() {

    }
    getCountryList() {
        var countryList = [];
        return countryList;
    }
    getRightMenu() {
        return [{ display: "Login", path: 'login', visible: true },
        { display: "Register", path: 'register', visible: true }]
    }
    getCenterMenu() {
        return [{ display: "Home", path: "home", icon: "fa fa-home" },
        { display: "Hotels", path: "hotels",icon:"fa fa-university" },
        { display: "Payment", path: 'payment',icon:"fas fa-dollar-sign " }]
    }
}