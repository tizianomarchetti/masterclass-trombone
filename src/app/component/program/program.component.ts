import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  programCards = {
    rows: [
      {
        margin: 'mt-3',
        cols: [
          {
            class: 'fa-regular fa-clock',
            innerHtml: 'text.program.lessons'
          },
          {
            class: 'fa-solid fa-users',
            innerHtml: 'text.program.ensemble'
          }
        ]
      },
      {
        margin: 'mb-3',
        cols: [
          {
            class: 'fa-solid fa-music',
            innerHtml: 'text.program.duo'
          },
          {
            class: 'fa-solid fa-volume-high',
            innerHtml: 'text.program.concert'
          }
        ]
      }
    ]
  };

  priceCards = [
    {
      title: 'text.program.master_only',
      price: '€380',
      listItems: [
        'text.program.details.subscription',
        'text.program.details.accomodation',
        'text.program.details.breakfast'
      ]
    },
    {
      title: 'text.program.full_pack',
      price: '€450',
      listItems: [
        'text.program.details.subscription',
        'text.program.details.accomodation',
        'text.program.details.breakfast',
        'text.program.details.lunch',
        'text.program.details.dinner'
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
