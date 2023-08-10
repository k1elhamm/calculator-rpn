import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IOperators, OperatorEnum } from '../calculator/model/operator.model';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operators.component.html'
})
export class OperatorsComponent {
  @Input() public operators : IOperators;
  @Output() public operatorClick = new EventEmitter<OperatorEnum>();

  public onOperatorClick(operator: OperatorEnum): void {
    this.operatorClick.emit(operator);
  }
}
