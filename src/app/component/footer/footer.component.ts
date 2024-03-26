import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  socials = [
      {
          url: "https://www.facebook.com/filarmonicagverdimontebuono",
          icon: "fab fa-facebook-f"
      },
      {
          url: "https://www.instagram.com/filarmonica_verdi/",
          icon: "fa-brands fa-instagram"
      }
  ];

  contatti = [
      {
          url: "https://www.google.com/maps/place/42%C2%B021'58.9%22N+12%C2%B035'47.5%22E/@42.3665553,12.5974076,18z/data=!4m5!3m4!1s0x0:0x6fc826f43f946ca1!8m2!3d42.3663611!4d12.5965278",
          label: "Via delle scuole, snc - 02040 Montebuono (RI)",
          icon: "fas fa-home"
      },
      {
          url: "mailto:banda.giuseppeverdi@libero.it",
          label: "banda.giuseppeverdi@libero.it",
          icon: "fas fa-envelope"
      },
      // {
      //     url: "tel:+393779796207",
      //     label: "+39 377 979 6207",
      //     icon: "fa-solid fa-mobile-screen fa-lg"
      // }
  ]

  thisYear: number;
  
  constructor() { }

  ngOnInit() {
    this.thisYear = new Date().getFullYear();
  }

}
