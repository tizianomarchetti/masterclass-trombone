import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public spinkit = Spinkit;
  title = 'masterclass';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang("it");
    translate.use(sessionStorage.getItem("lang") || "it");
  }
}
