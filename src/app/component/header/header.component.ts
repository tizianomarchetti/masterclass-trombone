import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangItem } from 'src/app/interface/common/lang-item';
import { MenuItem } from 'src/app/interface/common/menu-item';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [];
  languages: LangItem[];
  activePage: string;

  constructor(private appService: AppService, private translate: TranslateService,
    private router: Router) { }

  ngOnInit() {
    this.appService.getLang().subscribe((res: any) => {
      this.languages = res;
    });

    this.appService.getMenu().subscribe((res: any) => {
      this.menuItems = this.menuBeToPage(res);
    });

    /** per mantenere la classe css active sulla voce attiva di menu anche dopo refresh */
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.menuItems.forEach((el) => {
          el.active = el.url == e.url;
        });
      }
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
    document.getElementById('nav').classList[(menu.classList.contains('show') ? 'remove' : 'add')]('bg-transparent')
    document.getElementById('nav').classList[(menu.classList.contains('show') ? 'add' : 'remove')]('bg-black')
  }

  navigate(item: MenuItem) {
    console.log(item)
    this.menuItems.forEach((el) => {
      el.active = el.id == item.id;
    });
    document.getElementById(item.id).scrollIntoView();
    this.router.navigate([item.url]);
  }

  changeLanguage(codiceLingua: string) {
    sessionStorage.setItem("lang", codiceLingua);
    this.translate.use(codiceLingua);
  }

}
