import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
@Input()
dropdown: any;

@Output()
dropdownChangeEvent: EventEmitter<any>;

  constructor() {
    this.dropdown = {
      label: 'dropdown',
      data: [{text: 'Select value', value: ''}],
      selectedValue: ''
    };
    this.dropdownChangeEvent = new EventEmitter<any>();
  }
  dropdownChange() {
    this.dropdownChangeEvent.emit(this.dropdown.selectedValue);
  }

  ngOnInit() {
  }

}
