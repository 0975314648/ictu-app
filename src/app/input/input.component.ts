import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() placeHodler?: String;
  inputText: string = '';
  @Output() textEmitted: EventEmitter<string> = new EventEmitter<string>();

  emitData() {
    this.textEmitted.emit(this.inputText);
  }
}
