import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IPhone } from '../../../../interfaces/user/phone-interface';
import { PhoneTypeEnum } from '../../../../enums/phone-type.enum';
import { IPhoneToDisplay } from '../../../../interfaces/phone-to-display.interface';
import { phoneTypeDescritonMap } from '../../../../utils/phone-type-description-map';
import { preparePhoneList } from '../../../../utils/prepare-phone-list';


@Component({
  selector: 'app-phone-list',
  standalone: false,
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.scss'
})
export class PhoneListComponent implements OnChanges{
  @Input({ required: true}) userPhoneList: IPhone[] | undefined = [];

  phoneListToDisplay: IPhoneToDisplay[] = [];

  ngOnChanges(changes: SimpleChanges) {
    const PHONE_LIST_LOADED = Array.isArray(changes['userPhoneList'].currentValue);

    if(PHONE_LIST_LOADED) {
      this.preparePhoneListToDisplay();
    }
  }

  preparePhoneListToDisplay() {
    this.phoneListToDisplay = [];

    const originalUserPhoneList = this.userPhoneList && this.userPhoneList.length > 0 ? this.userPhoneList : [];

    preparePhoneList(originalUserPhoneList, true ,(phone) => {
        this.phoneListToDisplay.push(phone);
    });

    // Object.keys(phoneTypeDescritonMap).map(Number).forEach((phoneType: number) => {
    //   const phoneFound = this.userPhoneList?.find((userPhone: IPhone) => userPhone.type === phoneType)

    //   this.phoneListToDisplay.push({
    //     type: phoneTypeDescritonMap[phoneType as PhoneTypeEnum],
    //     phoneNumber: phoneFound ? this.formatPhoneNumber(phoneFound) : '-',
    //   });
    // });
  }

  formatPhoneNumber(phone: IPhone) {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`
  }

}
