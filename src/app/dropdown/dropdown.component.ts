import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Subject {
  id?: string;
  subjectName?: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() label?: String;
  @Input() data?: Subject[];
  @Output() selectedItem = new EventEmitter<Subject>();
  selected?: Subject;

  selectedSubject?: Subject;

  constructor() { 
    
  }
  
  ngOnInit() {
    this.addDefaultOption();
    console.log("data:", this.data);
  }

  onSelect(event: any) {
    const selectedValue = event.target.value;
    this.selectedSubject = this.data?.find(data => data.id === selectedValue);
    this.selectedItem.emit(this.selectedSubject);
  }

  addDefaultOption() {
    this.data?.unshift({ id: "0", subjectName: 'Chọn môn học' });
  }
}
