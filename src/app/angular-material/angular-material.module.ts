import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';


@NgModule({
    imports: [
      MatCardModule,
      MatTabsModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      MatRadioModule,
      MatDatepickerModule,
    ],
    exports: [
      MatCardModule,
      MatTabsModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      MatRadioModule,
      MatDatepickerModule,
    ],

    providers: [
      provideNativeDateAdapter(),
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
    ],
})
export class AngularMaterialModule {}
