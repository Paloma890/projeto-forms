import { IUserFormAddress, IUSerFormDependent } from './../interfaces/user-form.interface';
import { IUserForm, IUserFormGeneralInformations, IUserFormPhone } from "../interfaces/user-form.interface";
import { IPhone } from "../interfaces/user/phone-interface";
import { IUser } from "../interfaces/user/user-interface";
import { convertDateObjToPtBrDate } from "./convert-date-obj-to-pt-br-date";
import { IAddress } from '../interfaces/user/address-interface';
import { IDependent } from '../interfaces/user/dependent-interface';
import { formatNumber } from './format-number';

export const convertUserFormToUser = (userForm: IUserForm): IUser => {
  let newUser: Partial<IUser> = {} as IUser;

  newUser = { ...convertGeneralInformations(userForm.generalInformations) };
  newUser.phoneList = [... convertPhoneList(userForm.contactInformations.phoneList)];
  newUser.addressList = [... convertAddressList(userForm.contactInformations.addressList)];
  newUser.dependentsList = [... convertDependentsList(userForm.dependentsList)];

  return newUser as IUser;
};

const convertGeneralInformations =
(generalInformations: IUserFormGeneralInformations): Partial<IUser> => {
  return {
    name: generalInformations.name,
    email: generalInformations.email,
    country: generalInformations.country,
    state: generalInformations.state,
    maritalStatus: generalInformations.maritalStatus,
    monthlyIncome: generalInformations.monthlyIncome,
    birthDate: convertDateObjToPtBrDate(generalInformations.birthDate),
  }
};

const convertPhoneList = (phoneList: IUserFormPhone[]): IPhone[] => {
  const newIUserPhoneList: IPhone[] = phoneList.map((phone) => ({
    type: phone.type,
    internationalCode: '+' + phone.number.substring(0, 2),
    areaCode: phone.number.substring(2, 4),
    number: formatNumber(phone.number.substring(4)),
  }))
  .filter((phone) => phone.areaCode !== '');

  return newIUserPhoneList;
};

const convertAddressList = (addressList: IUserFormAddress[]): IAddress[] => {
  const newUserAddressList: IAddress[] = addressList.map((address) => ({
    type: address.type,
    street: address.street,
    complement: address.complement,
    country: address.country,
    state: address.state,
    city: address.city,
  })).filter((address) =>  address.street !== '');

  return newUserAddressList;
};

const convertDependentsList = (dependentsList: IUSerFormDependent[]): IDependent[] => {
  const newUserDependentsList: IDependent[] = dependentsList.map((dependent) => ({
    name: dependent.name,
    age: Number(dependent.age),
    document: Number(dependent.document),
  }));

  return newUserDependentsList;
}
