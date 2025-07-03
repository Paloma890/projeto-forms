import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user-interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { take } from 'rxjs';
import { ICountry } from '../../interfaces/contries-response/country.interface';
import { StatesService } from '../../services/states.service';
import { IState } from '../../interfaces/states-response/state.interface';

@Component({
  selector: 'app-user-informations-container',
  standalone: false,
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnInit, OnChanges{

  currentTabIndex: number = 0;


  countriesList: ICountry[] = [];
  statesList: IState[] = [];

  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);

  @Input({ required: true}) userSelected: IUser = {} as IUser;
  @Input({ required: true}) isInEditMode: boolean = false;


  ngOnInit() {
    this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges){
    this.currentTabIndex = 0;

    const HAS_USER_SELECTED = changes['userSelected'] && Object.keys(changes['userSelected'].currentValue). length > 0;

    if(HAS_USER_SELECTED) {
      this.fulfillUserForm(this.userSelected);

      this.getStatesList(this.userSelected.country);
    }
  }

  onCountrySelected(countryName: string) {
    this.getStatesList(countryName);
  }

  private getStatesList(country: string) {
    this._statesService.getStates(country).pipe(take(1)).subscribe((statesList: IState[]) => {
      this.statesList = statesList;
    })
  }

  private getCountriesList() {
    this._countriesService.getCountries().pipe(take(1)).subscribe((countriesList) => {
      this.countriesList = countriesList;
    });
  }

  mostrarUserForm() {
    console.log(this.userForm)
}
}
