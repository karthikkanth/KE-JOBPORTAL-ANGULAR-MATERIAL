import { Component, OnInit } from '@angular/core';
import {RestService } from '../../../../services/rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rjobslist',
  templateUrl: './rjobslist.component.html',
  styleUrls: ['./rjobslist.component.css']
})

export class RjobslistComponent implements OnInit {

  jobs: any [] = [];
  displayedColumns: string[] = ['Companyname', 'position', 'experience', 'technologies', 'location' ];
  dataSource: any[] = [];
  appliedList: any[] = [];
  jobsList: any[] = [];
  filteredJobsList: any[] = [];
  constructor(private restService: RestService,
              private toastrService: ToastrService) { }


              ngOnInit() {
                this.getrecruiterList();
              }
              getrecruiterList() {
                this.jobsList = [];
                this.restService.getrecruiterJobList().subscribe( (response) => {
                  this.jobsList = response;
                  this.dataSource = this.jobsList;
                }, (error) => {
                  this.jobsList = [];
                });
              }

  getUserID() {
    const user =JSON.parse(sessionStorage.getItem('rc-user'));
   return user.user.id;

  }


}
