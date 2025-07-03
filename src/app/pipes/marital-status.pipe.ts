import { Pipe, PipeTransform } from '@angular/core';
import { MaritalStatusEnum } from '../enums/marital-status.enum';
import { maritalStatusDescriptionMap } from '../utils/marital-status-description-map';


@Pipe({
  name: 'maritalStatus',
  standalone: false
})
export class MaritalStatusPipe implements PipeTransform {
  transform(maritalStatus: number | undefined): string {


    return maritalStatus ? maritalStatusDescriptionMap[maritalStatus] : '';
  }

}
