import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-forms',
  standalone: true,
  imports: [CommonModule,FormsModule,MatInputModule,MatButtonModule,MatCardModule,MatCheckboxModule,MatRadioModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './google-forms.component.html',
  styleUrl: './google-forms.component.scss'
})
export class GoogleFormsComponent {
  fields: Array<{ type: string; label: string }> = [];

  addTextField() {
    this.fields.push({ type: 'text', label: 'Text Field' });
  }

  addCheckbox() {
    this.fields.push({ type: 'checkbox', label: 'Checkbox Field' });
  }

  addRadioButton() {
    this.fields.push({ type: 'radio', label: 'Radio Button' });
  }
}
