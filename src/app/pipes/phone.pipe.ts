/*Step 1 import the pipe and pipe transform from angular/core.*/
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'phoneformat'
})

export class PhoneFormatPipe implements PipeTransform {
  transform(phoneNumber: any, country: String, addPrefix: String ) {
    let output: any;
    output = phoneNumber;
    if (country) {
      output = `${phoneNumber.substring(0,3)}-${phoneNumber.substring(3,6)}-${phoneNumber.substring(6,10)}`;

      if (addPrefix) {
        output = addPrefix + '-' + output;
      }
    }


    return output;
  }

}

// +91 99599-99999 -- crtieria country adding prefix country
// +1 999-999-9090
