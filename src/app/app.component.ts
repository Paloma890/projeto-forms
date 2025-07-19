import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UserService } from './services/users.service';
import { IUser } from './interfaces/user/user-interface';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IDialogConfirmationData } from './interfaces/dialog-confirmation-data.interface';
import { UpdateUserService } from './services/update-user.service';
import { UserFormRawValueService } from './services/user-form-raw-value.service';
import { convertUserFormToUser } from './utils/convert-user-form-to-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  isInEditMode: boolean = false;
  enableSaveButton: boolean = false;
  userFormUpdated: boolean = false;

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;

  usersList: IUser[] = [];


  constructor(
    private readonly _contriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UserService,
    private readonly _updateUserService: UpdateUserService,
    private readonly _matDialog: MatDialog,
    private readonly _userFormRawValueService: UserFormRawValueService,
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
    if(this.userFormUpdated) {
      this.openConfirmationDialog({
        title: 'O Formulário foi alterado',
        message: 'Deseja realmente cancelar as alterações feitas no formulário?'
      },
        (value: boolean) => {
          if(!value) return;

          this.isInEditMode = false;
          this.userFormUpdated = false;
        });
    } else {
      this.isInEditMode = false;
    }
  }

  onSaveButton() {
    this.openConfirmationDialog({
      title: 'Confirmar alteração de dados',
      message: 'Deseja realmente salvar os valores alterados?'
     },
    (value: boolean) => {
      if(!value) return;

      this.saveUserInfos();

      this.isInEditMode = false;
      this.userFormUpdated = false;
    }
   )
 };

  onEditButton() {
    this.userSelected = structuredClone(this.userSelected);

    this.isInEditMode = true;
  }

  onFormStatusChange(formStatus: boolean) {
    setTimeout(() => this.enableSaveButton = formStatus, 0);
  }

  onUserFormFirstChange() {
    this.userFormUpdated = true
  }

  private openConfirmationDialog(data: IDialogConfirmationData, callback: (value: boolean) => void) {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(callback);
  }

  private saveUserInfos() {
    const newUser: IUser = convertUserFormToUser(this._userFormRawValueService.UserFormRwaValue);

    this._updateUserService.updateUser(newUser).subscribe((newUserResponse: IUser) => {
      if(this.userSelectedIndex === undefined) return;

      this.usersList[this.userSelectedIndex] = newUserResponse;
      this.userSelected = structuredClone(newUserResponse);
    });
  }

}
