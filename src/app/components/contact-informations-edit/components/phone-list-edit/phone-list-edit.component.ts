import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-list-edit',
  standalone: false,
  templateUrl: './phone-list-edit.component.html',
  styleUrl: './phone-list-edit.component.scss'
})
export class PhoneListEditComponent {
@Input({ required: true }) userForm!: FormGroup;

get phoneList(): FormArray {
  return this.userForm.get('contactInformations.phoneList') as FormArray;
}
}
