import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

// const root = "https://web-cv-back-end.onrender.com/";
const root = "http://localhost:8080/";

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
      }
  ])
    return this.http.get(root + this.langUrl);
  }

  getMenu() {
    return of([
      {
          "id": "home",
          "label": "menu.label.home",
          "url": "/home",
          "redirectUrl": "/",
          "icon": "fa-solid fa-user",
          "active": false
      },
      {
          "id": "education",
          "label": "menu.label.education",
          "url": "/education",
          "icon": "fa-solid fa-graduation-cap",
          "active": false
      },
      {
          "id": "experience",
          "label": "menu.label.experience",
          "url": "/experience",
          "icon": "fa-solid fa-briefcase",
          "active": false
      },
      {
          "id": "skills",
          "label": "menu.label.skills",
          "url": "/skills",
          "icon": "fa-solid fa-code",
          "active": false
      },
      {
          "id": "contact",
          "label": "menu.label.contact",
          "url": "/contact",
          "icon": "fa-solid fa-envelope",
          "active": false
      }
  ])
    return this.http.get(root + this.menuUrl);
  }

}
