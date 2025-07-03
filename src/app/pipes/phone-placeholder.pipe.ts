import { Pipe, PipeTransform } from '@angular/core';
import { PhoneTypeEnum } from '../enums/phone-type.enum';

@Pipe({
  name: 'phonePlaceholder',
  standalone: false
})
export class PhonePlaceholderPipe implements PipeTransform {
  transform(phoneType: number): string {
    const phoneMaskMap: { [key in PhoneTypeEnum]: string } = {
      [PhoneTypeEnum.RESIDENTIAL]: '+55 45 1234-1234',
      [PhoneTypeEnum.MOBILE]: '+55 45 91234-1234',
      [PhoneTypeEnum.EMERGENCY]: '+55 45 1234-1234 ou +55 45 91234-1234',
    };

    return phoneMaskMap[phoneType as PhoneTypeEnum];
  }

}
