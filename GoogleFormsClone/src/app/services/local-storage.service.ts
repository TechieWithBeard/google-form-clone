import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private formsKey = 'forms';

  saveForms(forms: any[]): void {
    localStorage.setItem(this.formsKey, JSON.stringify(forms));
  }

  getForms(): any[] {
    const data = localStorage.getItem(this.formsKey);
    return data ? JSON.parse(data) : [];
  }

  updateForm(index: number, updatedForm: any): void {
    let forms = this.getForms();
    forms[index] = updatedForm;
    this.saveForms(forms);
  }

  deleteForm(index: number): void {
    let forms = this.getForms();
    forms.splice(index, 1);
    this.saveForms(forms);
  }
  
  
}
