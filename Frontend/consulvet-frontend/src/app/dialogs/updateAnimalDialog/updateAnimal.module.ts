import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateAnimalComponent } from './updateAnimal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [UpdateAnimalComponent]
})
export class UpdateAnimalModule { }
