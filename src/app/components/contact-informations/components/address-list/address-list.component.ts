import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IAddress } from '../../../../interfaces/user/address-interface';
import { IAddressToDisplay } from '../../../../interfaces/address-to-display.interface';
import { prepareAddressList } from '../../../../utils/prepare-address-list';


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

    const originalAddressList = this.userAddressList && this.userAddressList.length > 0 ? this.userAddressList : [];

    prepareAddressList(originalAddressList, true, (address) => {
        this.addressListToDisplay.push(address)
    })
  }
}
