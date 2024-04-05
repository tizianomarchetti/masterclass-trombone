import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

// const root = "https://web-cv-back-end.onrender.com/";
const root = "https://tizianoesofia.altervista.org/api/v1/";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  jsonUrl: string = '/assets/utils/{item}.json';

  langUrl: string = 'lang';
  menuUrl: string = 'menu';

  constructor(private http: HttpClient) { }

  getLang() {
    return of([
      {
        "id": "it",
        "alt": "Italiano",
        "src": "assets/img/it.png"
      },
      {
        "id": "en",
        "alt": "Inglese",
        "src": "assets/img/en.png"
      },
      {
        "id": "fr",
        "alt": "Francese",
        "src": "assets/img/fr.png"
    }
  ])
    return this.http.get(root + this.langUrl);
  }

  getMenu() {
    return of([
      {
        "id": "program",
        "label": "menu.label.program",
        "url": "/programma",
        "active": false
      },
      {
        "id": "teacher",
        "label": "menu.label.teacher",
        "url": "/docente",
        "active": false
      },
      {
        "id": "contact",
        "label": "menu.label.contact",
        "url": "/contatti",
        "active": false
      },
      {
        "id": "subscription",
        "label": "menu.label.subscription",
        "url": "/iscrizione",
        "active": false
      }
  ])
    return this.http.get(root + this.menuUrl);
  }

  sendSubscription(form: any) {
    return this.http.post(root + 'sendSubscription', form, {responseType: 'text'});
  }

}
