import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems?: number;
  @Input() itemsPerPage?: number;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  totalPages?: number;
  pages: number[] = [];

  ngOnInit() {
    this.calculateTotalPages();
    this.generatePageNumbers();
  }

  ngOnChanges() {
    this.calculateTotalPages();
    this.generatePageNumbers();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems! / this.itemsPerPage!);
  }

  generatePageNumbers() {
    this.pages = Array.from({ length: this.totalPages! }, (_, i) => i + 1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages!) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages!) {
      this.setPage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }
}
