import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IStack } from '../calculator/model/stack.model';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack.component.html'
})
export class StackComponent{

   @Input() public stack: IStack;

}
