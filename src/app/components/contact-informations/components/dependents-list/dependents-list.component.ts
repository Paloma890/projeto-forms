import { IDependent } from './../../../../interfaces/user/dependent-interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dependents-list',
  standalone: false,
  templateUrl: './dependents-list.component.html',
  styleUrl: './dependents-list.component.scss'
})
export class DependentsListComponent {
  @Input({ required: true }) dependentsList: IDependent[] | undefined = [];

}
