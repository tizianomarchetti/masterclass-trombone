import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  fileType: any;
  formatError: boolean = false;
  validFormat: string[] = [
    // 'image/png', 'image/jpg', 'image/jpeg', //img
    // 'vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', //xls
    // 'msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //doc
    'application/pdf' //pdf
    // 'text/plain' //txt
  ];

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

  esito = {
    message: '',
    ok: false
  }

  constructor(private appService: AppService, private spinner: SpinnerVisibilityService) { }

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

  // uploadFile(event) {
  //   this.form.file = event.target.files[0];

  //   if (!this.valid)
  //     this.validateForm();
  // }

  uploadFile(event: any) {
    if (!event) { //per gestire il rimuovi file
      this.form.file = null;
      if ((document.getElementById('formFile') as HTMLInputElement))
        (document.getElementById('formFile') as HTMLInputElement).value = null;
      return;
    } 

    const file = event.target.files[0];
    
    if(event.target.files.length > 0) {
      this.fileType = file.type;
      this.form.file = file;
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // this.spinner.show();
      // reader.onload = () => {
      //   this.form.file = reader.result;
      //   if (!this.valid)
      //     this.validateForm();
      //   this.spinner.hide();
      // }
    }
    else this.form.file = null;

    if (!this.valid)
      this.validateForm();
  }

  download() {
    console.log(this.form)
    if (this.validateForm(true)) {
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('surname', this.form.surname);
      formData.append('phone', this.form.phone);
      formData.append('email', this.form.email);
      formData.append('fullPack', this.form.fullPack ? '1' : '0');
      formData.append('brani', JSON.stringify(this.form.brani));
      // this.form.brani.forEach(brano => {
      //   formData.append('brani[title]', brano.title);
      //   formData.append('brani[author]', brano.author);
      // })
      formData.append('intolleranze', this.form.intolleranze);
      formData.append('file', this.form.file);
      
      this.appService.sendSubscription(formData).subscribe(res => {
        this.form = {
          name: '',
          surname: '',
          phone: '',
          email: '',
          fullPack: false,
          brani: [],
          intolleranze: '',
          file: null
        }
        if ((document.getElementById('formFile') as HTMLInputElement))
          (document.getElementById('formFile') as HTMLInputElement).value = null;

        this.launchModal(true, res);
      }, (err) => {
        console.log(err.error)
        this.launchModal(false, err.error)
      })
    }
  }

  launchModal(ok: boolean, message: string) {
    this.esito.message = message;
    this.esito.ok = ok;
    const btnModale = document.createElement("button");
    btnModale.setAttribute('data-bs-toggle', 'modal');
    btnModale.setAttribute('data-bs-target', '#esito');
    document.body.appendChild(btnModale);
    btnModale.click();
    document.body.removeChild(btnModale);
  }

  validateForm(fromSend: boolean = false) {
    this.valid = true;

    this.validForm.name = (this.form.name !== null && this.form.name !== '');
    this.validForm.surname = (this.form.surname !== null && this.form.surname !== '');
    this.validForm.phone = (this.form.phone !== null && this.form.phone !== '');
    this.validForm.email = (this.form.email !== null && this.form.email !== '');
    this.validForm.fullPack = this.form.fullPack != null;
    this.validForm.file = this.form.file !== null && this.validFormat.includes(this.fileType);

    this.formatError = this.form.file !== null ? (!this.validFormat.includes(this.fileType)) : false;

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

    if (!this.valid && fromSend) {
      document.getElementById('errorMessage').scrollIntoView();
    }

    return this.valid;
  }

}
