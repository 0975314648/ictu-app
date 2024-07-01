import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { error } from 'console';

export interface Subject {
  id?: string;
  subjectName?: string;
}

export interface Question {
  id?: number;
  subjectName?: string;
  content?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  questions?: Question[];
  subjects?: Subject[];
  isStep2?: boolean = false;
  isStep3?: boolean = false;
  subjectSelected?: Subject;
  receivedText: string = '';

  totalItems?: number;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(private apiService: ApiService, private router: Router) { }

  receiveData(data: string) {
    this.receivedText = data;
  }

  handleDataOption(subject: Subject) {
    if(subject.id!=='0') {
      this.isStep2 = true;
    } else {
      this.isStep2 = false;
    }
    this.subjectSelected = subject;
  }

  ngOnInit() {
    this.handleGetSubject();
    this.totalItems = this.subjects?.length;
    this.updatePaginatedItems();
  }

  handleGetSubject() {
    const body = {
      "searchString": ""
    }
    this.apiService.postSubject(body).subscribe(res => {
      if (res && res.errorCode === 0 && res.data) {
        this.subjects = res.data;
        this.subjects?.unshift({ id: "0", subjectName: '---------   Chọn môn học  ---------' });
      }
    });
  }

  logout() {
    const body = {
      "": ""
    }
    this.apiService.postLogout(body).subscribe(res => {
      if (res && res.errorCode === 0) {
        localStorage?.setItem('token', '');
        this.router.navigate(['/login']);
      }
    }, error => {
      this.router.navigate(['/login']);
    });
  }

  handleSearchQuestion() {
    const body = {
      "searchString": "suất điện động",
      "subjectId": "726ddb86db7247e4abdacea18108dbee",
      "pageIndex": 1,
      "pageSize": 10
    };

    this.apiService.postQuestion(body).subscribe(res => {
      if (res && res.errorCode === 0 && res.data) {
        this.questions = res.data.questions;
        this.isStep3 = true;
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.subjects = this.subjects?.slice(startIndex, endIndex);
  }
}
