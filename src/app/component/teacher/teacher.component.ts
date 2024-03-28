import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map } from "rxjs/operators";

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

  cv = {
    diego: {
      quote: [],
      intro: [],
      body: []
    },
    hilary: {
      intro: [],
      body: []
    },
    duo: {
      intro: [],
      body: []
    }
  }

  constructor(private translate: TranslateService) {
    translate.stream('text.teacher.diego.quote').subscribe(res => this.cv.diego.quote = res);
    translate.stream('text.teacher.diego.intro').subscribe(res => this.cv.diego.intro = res);
    translate.stream('text.teacher.diego.body').subscribe(res => this.cv.diego.body = res);
    translate.stream('text.teacher.hilary.intro').subscribe(res => this.cv.hilary.intro = res);
    translate.stream('text.teacher.hilary.body').subscribe(res => this.cv.hilary.body = res);
    translate.stream('text.teacher.duo.intro').subscribe(res => this.cv.duo.intro = res);
    translate.stream('text.teacher.duo.body').subscribe(res => this.cv.duo.body = res);
  }

  ngOnInit() {
  }

}
