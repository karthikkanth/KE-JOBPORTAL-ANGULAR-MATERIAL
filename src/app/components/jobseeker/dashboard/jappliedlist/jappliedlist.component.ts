import { Component, OnInit } from '@angular/core';
import {RestService } from '../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jappliedlist',
  templateUrl: './jappliedlist.component.html',
  styleUrls: ['./jappliedlist.component.css']
})
export class JappliedlistComponent implements OnInit {
  jobs: any [] = [];
  displayedColumns: string[] = ['companyname', 'position', 'experience', 'technologies', 'location', 'apply'];
  dataSource: any[] = [];
  appliedList: any[] = [];
  jobsList: any[] = [];
  filteredJobsList: any[] = [];
  constructor(private restService: RestService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.getJobList();
  }
  getJobList(): any {
    this.restService.getJobList().subscribe(response => {
      this.jobsList = response;
      this.jobsList.forEach( (value, index)  => {
        this.jobsList[index].apply = 'Applied';
      });
      if (this.jobsList) {
        this.getAppliedListForUser();
      }
    });
  }
  getAppliedListForUser() {
    this.restService.getAppliedList(this.getUserID()).subscribe(response => {
      this.appliedList = response.appliedList;
      this.jobsList.forEach( (value, index) => {
        if (this.appliedList.indexOf(value._id) != -1) {
          this.filteredJobsList.push(value);
        }
      });
      this.dataSource = this.filteredJobsList;
    });
  }
  getUserID() {
    const user = JSON.parse(sessionStorage.getItem('js-user'));
    return user.user.id;
  }

}
