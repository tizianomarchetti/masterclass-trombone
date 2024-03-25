import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangItem } from 'src/app/interface/common/lang-item';
import { MenuItem } from 'src/app/interface/common/menu-item';
import { AppService } from 'src/app/services/app.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [];
  languages: LangItem[];
  activePage: string;

  constructor(private appService: AppService, private translate: TranslateService) { }

  ngOnInit() {
    this.appService.getLang().subscribe((res: any) => {
      this.languages = res;
    });

    this.appService.getMenu().subscribe((res: any) => {
      this.menuItems = this.menuBeToPage(res);
    });

    this.menuItems.forEach((el) => {
      el.active = el.id == sessionStorage.getItem('activeMenuItem');
    });
  }

  menuBeToPage(items: any[]): MenuItem[] {
    return items.map(item => {
      return {
        id: item.id,
        codice: item.codice,
        label: item.label,
        url: item.url,
        redirectUrl: item.redirectUrl,
        icon: item.icon,
        active: false,
      }
    })
  }

  manageMenu(menu: HTMLElement, action: string) {
    /** action: toggle or remove */
    menu.classList[action]('show');
    if (window.scrollY <= 10) {
      document.getElementById('nav').classList[(menu.classList.contains('show') ? 'remove' : 'add')]('bg-transparent')
      document.getElementById('nav').classList[(menu.classList.contains('show') ? 'add' : 'remove')]('bg-black')
    }
  }

  navigate(item: MenuItem) {
    if (item) {
      this.menuItems.forEach((el) => {
        el.active = el.id == item.id;
      });
    }
    sessionStorage.setItem('activeMenuItem', item ? item.id : null);
    // document.getElementById(item.id).scrollIntoView();
  }

  changeLanguage(codiceLingua: string) {
    console.log(codiceLingua)
    sessionStorage.setItem("lang", codiceLingua);
    this.translate.use(codiceLingua);
  }

}
