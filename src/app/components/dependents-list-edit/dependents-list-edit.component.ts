import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents-list-edit',
  standalone: false,
  templateUrl: './dependents-list-edit.component.html',
  styleUrl: './dependents-list-edit.component.scss'
})
export class DependentsListEditComponent {

  @Input({ required: true })  userform!: FormGroup;

  @Output('onAddeDependent') onAddDependentEmitt = new EventEmitter<void>();
  @Output('onRemoveDependent') onRemoveDependentEmitt = new EventEmitter<number>();

  get dependentsList(): FormArray {
  return this.userform.get('dependentsList') as FormArray;
  }

  addDependent() {
    this.onAddDependentEmitt.emit();
  }

  removeDependent(dependentIndex: number) {
    this.onRemoveDependentEmitt.emit(dependentIndex);
  }


}
