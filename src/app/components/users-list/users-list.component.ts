import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/user/user-interface';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  userSelectedIndex: number | undefined;

  @Input({ required: true }) usersList: IUser[] = [];
  @Input({ required: true }) isInEditMode: boolean = false;


  @Output('onUserSelected') onUserSelectedEmitt = new EventEmitter<number>();

  onUserSelected(userIndex: number) {
    if(this.isInEditMode) return;

    this.userSelectedIndex = userIndex;
    this.onUserSelectedEmitt.emit(userIndex);
  }
}
