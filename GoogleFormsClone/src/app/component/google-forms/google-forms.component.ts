import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule, FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-google-forms',
  standalone: true,
  imports: [CommonModule,MatDividerModule,MatGridListModule,FormsModule,MatInputModule,MatButtonModule,MatCardModule,MatCheckboxModule,MatRadioModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './google-forms.component.html',
  styleUrl: './google-forms.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-10px)' }),
            stagger(100, [
              animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class GoogleFormsComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,private localStorageService:LocalStorageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      fields: this.fb.array([]),
    });

    const savedForm = this.localStorageService.getForms();
    if (savedForm.length > 0) {
      const lastSavedForm = savedForm[savedForm.length - 1]; // Get the latest saved form
      this.loadForm(lastSavedForm);
    } else {
      this.initializeEmptyForm(); // Create a new empty form
    }
    
  }


  initializeEmptyForm(){
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      fields: this.fb.array([]),
    });
  }
  loadForm(savedForm: any) {
    this.form = this.fb.group({
      title: [savedForm.title || '', Validators.required],
      description: [savedForm.description || ''],
      fields: this.fb.array(
        savedForm.fields.map((field: any) =>
          this.fb.group({
            label: [field.label, Validators.required],
            type: [field.type, Validators.required],
            value: field.type === 'radio' ? this.fb.control(field.value) : [field.value],
            options: field.type === 'radio' ? this.fb.array(field.options || []) : null,
          })
        )
      ),
    });
  }

  get fields(): FormArray<FormGroup> {
    return this.form.get('fields') as FormArray<FormGroup>;
  }
  addTextField() {
    const fieldGroup = this.fb.group({
      label: ['', Validators.required],
      type: ['text', Validators.required],
      value: [''], // Value for text field
    });

    this.fields.push(fieldGroup);
  }

  addCheckbox() {
    const fieldGroup = this.fb.group({
      label: ['', Validators.required],
      type: ['checkbox', Validators.required],
      value: [false], // Single checkbox value
    });

    this.fields.push(fieldGroup);
  }

  addRadioButton() {
    const fieldGroup = this.fb.group({
      label: ['', Validators.required],
      type: ['radio', Validators.required],
      options: this.fb.array(['Option 1', 'Option 2']), // Default radio options
      value: new FormControl('Option 1'), // Ensure value is always a FormControl
    });
  
    this.fields.push(fieldGroup);
  }

  deleteField(index: number) {
    this.fields.removeAt(index);
  }


  deleteForm() {
    let forms = this.localStorageService.getForms();
    let index = forms.findIndex(f => f.title === this.form.get('title')?.value);
    
    if (index !== -1) {
      this.localStorageService.deleteForm(index);
      this.snackBar.open('Form deleted successfully!', 'Close', { duration: 3000 });
      this.clearForm();
    }
  }


  getFormControl(field: FormGroup, controlName: string): FormControl {
    return field.get(controlName) as FormControl;
  }
  
  


  clearForm() {
    this.form.reset();
    this.form.setControl('fields', this.fb.array([])); // Reset fields properly
  }
  
  submitForm() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
  
      let responses = this.localStorageService.getForms(); // Fetch stored forms
      responses.push(this.form.value);
      this.localStorageService.saveForms(responses); // Save new response
  
      this.snackBar.open('Form submitted successfully!', 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['success-snackbar']
      });
  
      this.clearForm();
    } else {
      console.log('Form is not valid:', this.form);
    }
  }
  
}
