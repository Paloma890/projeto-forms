import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UserService } from './services/users.service';
import { IUser } from './interfaces/user/user-interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  isInEditMode: boolean = false;

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;

  usersList: IUser[] = [];


  constructor(
    private readonly _contriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UserService,
  ) {}


  ngOnInit(){
    this._contriesService.getCountries().subscribe((countriesResponse) => {
    });

    this._statesService.getStates('Brazil').subscribe((statesResponse) => {});

    this._citiesService.getCities('Brazil', 'Paraná').subscribe((citiesResponse) => {});

    this._usersService.getUsers().pipe(take(1)).subscribe((usersListResponse) =>
      this.usersList = usersListResponse);
  }

  onUserSelected(userIndex: number) {
      const userFound = this.usersList[userIndex];

      if(userFound) {
        this.userSelectedIndex = userIndex;
        this.userSelected = structuredClone(userFound);
      }
  }

  onCancelButton() {
    this.isInEditMode = false;
  }

  onEditButton() {
    this.isInEditMode = true;
  }
}
