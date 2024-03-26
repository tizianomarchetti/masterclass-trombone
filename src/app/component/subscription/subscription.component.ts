import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  form = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    fullPack: false,
    brani: [],
    intolleranze: ''
  }

  validForm = {
    name: true,
    surname: true,
    phone: true,
    email: true,
    fullPack: true,
    brani: []
  }

  valid: boolean = true;

  constructor() { }

  ngOnInit() {
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

  download() {
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

    console.log(this.validForm)

    if (!this.valid) {
      document.getElementById('errorMessage').scrollIntoView();
    }

    return this.valid;
  }

}
