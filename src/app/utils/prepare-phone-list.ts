import { PhoneTypeEnum } from "../enums/phone-type.enum";
import { IPhoneToDisplay } from "../interfaces/phone-to-display.interface";
import { IPhone } from "../interfaces/user/phone-interface";
import { phoneTypeDescritonMap } from "./phone-type-description-map";

export const preparePhoneList = (originalUserPhoneList: IPhone[], isDisplayPhone: boolean, callback: (phone: IPhoneToDisplay) => void) => {
  Object.keys(phoneTypeDescritonMap).map(Number).forEach((phoneType: number) => {
    const phoneFound = originalUserPhoneList.find((userPhone: IPhone) => userPhone.type === phoneType);

      let phoneNumber = '';

      if(isDisplayPhone) {
        phoneNumber = phoneFound ? formatPhoneNumberToDisplay(phoneFound) : '-'
      } else {
        phoneNumber = phoneFound ? formatPhoneNumberToEdit(phoneFound) : '';
      }

    callback({
      type: phoneType,
      typeDescription: phoneTypeDescritonMap[phoneType as PhoneTypeEnum],
      phoneNumber,
    });

  });
}

const formatPhoneNumberToEdit = (phone: IPhone) => {
  return `${phone.internationalCode}${phone.areaCode}${phone.number}`.replace(/[+/-]/g, '');
}

const formatPhoneNumberToDisplay = (phone: IPhone) => {
  return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
}
