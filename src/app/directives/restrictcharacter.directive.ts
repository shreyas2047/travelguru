import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[restrictinput]'
})
export class RestrictCharacterDirective {
  constructor(private ele: ElementRef) {
    console.log(ele.nativeElement);
  }
  @Input()
  RestrictExpression: any;
  @HostListener('keypress', ['$event'])
  onKeyPress(evt) {
    console.log('Hi I am active');
    let regexForNumbers = new RegExp(this.RestrictExpression);
    if (regexForNumbers.test(evt.key)) {
      this.ele.nativeElement.style = 'background: #fff';
    }
    else {
      this.ele.nativeElement.style = 'background: red';
      evt.preventDefault();
    }
  }
}
