import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { HttpService } from '../app/shared/services/http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'job-portal';
  showLoader: any = true;
  constructor(private httpService: HttpService,
              private cdRef: ChangeDetectorRef) { }
  ngOnInit() {
    this.httpService.loaderEventValue.subscribe(data => {
      if (data !== this.showLoader) {
        this.showLoader = data;
      }
    });
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
}
