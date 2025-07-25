import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-conteiner',
  standalone: false,
  templateUrl: './buttons-conteiner.component.html',
  styleUrl: './buttons-conteiner.component.scss'
})
export class ButtonsConteinerComponent {
  @Input({ required: true }) isInEditMode: boolean = false;
  @Input({ required: true }) enableSaveButton: boolean = false;

  @Output('onEditButton') onEditButtonEmitt = new EventEmitter<void>();
  @Output('onSaveButton') onSaveButtonEmitt = new EventEmitter<void>();
  @Output('onCancelButton') onCancelButtonEmitt = new EventEmitter<void>();

  onCancelButton() {
    this.onCancelButtonEmitt.emit();
  }

  onSaveButton() {
    this.onSaveButtonEmitt.emit();
  }

  onEditButton() {
    this.onEditButtonEmitt.emit();
  }

}
