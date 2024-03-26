import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  copied = {
    intestazione: false,
    iban: false,
    causale: false
  }

  form = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    fullPack: false,
    brani: [],
    intolleranze: '',
    file: null
  }

  validForm = {
    name: true,
    surname: true,
    phone: true,
    email: true,
    fullPack: true,
    brani: [],
    file: true
  }

  valid: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  copy(evt: any, part: string) {
    navigator.clipboard.writeText(evt.target.innerText).then(() => {
      this.copied[part] = true;
      setTimeout(() => {
        this.copied[part] = false;
      }, 3000);
    }).catch(e => console.error(e));
  }

  addBrano() {
    this.form.brani.push({
      title: '', 
      author: ''
    });
    this.validForm.brani.push({
      title: true, 
      author: true
    })
  }

  removeBrano(index) {
    this.form.brani.splice(index, 1);
    this.validForm.brani.splice(index, 1);

    if (!this.valid)
      this.validateForm();
  }

  uploadFile(event) {
    this.form.file = event.target.files[0];

    if (!this.valid)
      this.validateForm();
  }

  download() {
    console.log(this.form)
    if (this.validateForm()) {
      
    }
  }

  validateForm() {
    this.valid = true;

    this.validForm.name = (this.form.name !== null && this.form.name !== '');
    this.validForm.surname = (this.form.surname !== null && this.form.surname !== '');
    this.validForm.phone = (this.form.phone !== null && this.form.phone !== '');
    this.validForm.email = (this.form.email !== null && this.form.email !== '');
    this.validForm.fullPack = this.form.fullPack != null;
    this.validForm.file = this.form.file !== null;

    this.form.brani.forEach(brano => {
      this.validForm.brani[this.form.brani.indexOf(brano)] = {
        title: (brano.title !== null && brano.title !== ''),
        author: (brano.author !== null && brano.author !== '')
      }
    })

    Object.keys(this.validForm).forEach(k => {
      if (!this.validForm[k]) this.valid = false;
    })

    this.validForm.brani.forEach(brano => {
      if (!brano.title || !brano.author) this.valid = false;
    })

    if (!this.valid) {
      document.getElementById('errorMessage').scrollIntoView();
    }

    return this.valid;
  }

}
