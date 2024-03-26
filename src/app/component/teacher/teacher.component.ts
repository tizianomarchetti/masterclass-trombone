import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  readMore = {
    diego: false,
    hilary: false,
    duo: false
  }

  constructor() { }

  ngOnInit() {
  }

}
