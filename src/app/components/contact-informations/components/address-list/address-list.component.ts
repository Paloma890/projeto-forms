import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IAddress } from '../../../../interfaces/user/address-interface';
import { AddressTypeEnum } from '../../../../enums/adress.type.enum';
import { addressTypeDescriptionMap } from '../../../../utils/address-type-descritption-map';
import { IAddressToDisplay } from '../../../../interfaces/address-to-display.interface';


@Component({
  selector: 'app-address-list',
  standalone: false,
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnChanges{
  addressListToDisplay: IAddressToDisplay[] = [];

  @Input({ required: true }) userAddressList: IAddress[] | undefined = [];

  ngOnChanges(changes: SimpleChanges){
    const ADDRESS_LIST_LOADED = Array.isArray(changes['userAddressList'].currentValue);

    if(ADDRESS_LIST_LOADED) {
      this.prepareAddressListToDisplay();
    }
  }

  prepareAddressListToDisplay() {
    this.addressListToDisplay = [];

    Object.keys(addressTypeDescriptionMap).map(Number).forEach((addressType: number) => {
      const addressFound = this. userAddressList?.find((userAddress) => userAddress.type === addressType);

      this.addressListToDisplay.push(this.returnAddressToDisplay(addressFound, addressType));
    });
  }

  returnAddressToDisplay(address: IAddress | undefined, addressType: number): IAddressToDisplay {
    if(!address) {
      return {
        typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
        type: addressType,
        street: '-',
        complement: '-',
        country: '-',
        state: '-',
        city: '-',
      };
    }

    return {
      typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
      ...address,
    }
  }
}
