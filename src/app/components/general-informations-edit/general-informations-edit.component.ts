import { Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICountry } from '../../interfaces/contries-response/country.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IState } from '../../interfaces/states-response/state.interface';
import { maritalStatusArray } from '../../utils/marital-status-description-map';

@Component({
  selector: 'app-general-informations-edit',
  standalone: false,
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {
countriesListFiltered: ICountry[] = [];
statesListFiltered: IState[] = [];

@Input({ required: true }) userForm!: FormGroup;
@Input({ required: true }) countriesList: ICountry[] = [];
@Input({ required: true }) statesList: IState[] = [];

@Output('onCountrySelected') onCountrySelectedEmitt = new EventEmitter<string>();

ngOnInit(){

  this.watchCountryFormChangesAndFilter();

  this.watchStateFormChangesAndFilter();
}


ngOnChanges(changes: SimpleChanges) {
  console.log(changes)
  this.countriesListFiltered = this.countriesList;
  this.statesListFiltered = this.statesList;
}

get maritalStatusArray() {
  return maritalStatusArray;
}

get emailControl(): FormControl {
  return this.userForm.get('generalInformations.email') as FormControl;
}

get countryControl(): FormControl {
  return this.userForm.get('generalInformations.country') as FormControl;
}

get stateControl(): FormControl {
  return this.userForm.get('generalInformations.state') as FormControl;
}

onCountrySelected(event: MatAutocompleteSelectedEvent) {
  this.onCountrySelectedEmitt.emit(event.option.value);
}

private watchCountryFormChangesAndFilter() {
  this.countryControl.valueChanges.subscribe(this.filterCountriesList.bind(this));
}

private filterCountriesList(searchTerm: string) {
  this.countriesListFiltered = this.countriesList.filter(
    (country) => country.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase().trim()));
}

private watchStateFormChangesAndFilter() {
  this.stateControl.valueChanges.subscribe(this.filterStatesList.bind(this));
}

private filterStatesList(searchTerm: string) {
  this.statesListFiltered = this.statesList.filter(
    (state) => state.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase().trim()));
}

}
