import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() name?: String;
  @Input() questionId?: String;
  @Input() questionName?: String;
  @Input() subjectId?: String;
  isVisible: boolean = false;
  title?: String;
  answers?: String[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.handleSearchAnswer();
    console.log("test:", this.answers);
  }

  openPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }

  handleIndex(index: number): string {
    if (index === 0) return "A";
    if (index === 1) return "B";
    if (index === 2) return "C";
    if (index === 3) return "D";
    else return "NAN"
  }

  handleSearchAnswer() {
    const body = {
      "questionId": this.questionId,
      "subjectId": this.subjectId
    };

    this.apiService.postAnswer(body).subscribe(res => {
      if (res && res.errorCode === 0 && res.data) {
        this.answers = res.data;
      }
    });
  }

  checkAnswer(answer: any): boolean {
    return answer.includes('ĐÁP ÁN');
  }
}