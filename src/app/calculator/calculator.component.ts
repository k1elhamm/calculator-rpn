import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { StackService } from './service/stack.service';
import { OperatorService } from './service/operator.service';
import { IStack } from './model/stack.model';
import { Observable, Subscription, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StackComponent } from '../stack/stack.component';
import { FormsModule } from '@angular/forms';
import { OperatorsComponent } from '../operators/operators.component';
import { IOperators, OperatorEnum } from './model/operator.model';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, StackComponent, FormsModule, OperatorsComponent],
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent implements OnInit, OnDestroy {
  //service injection
  private readonly stackService = inject(StackService);
  private readonly operatorService = inject(OperatorService);

  public stacks: IStack[];
  public inputValue: number | null;
  public currentStack: IStack | null;
  public subscription = new Subscription();
  public operators$: Observable<IOperators>;

  ngOnInit(): void {
    this.loadStacks();
    this.loadOperators();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadStacks(): void {
    this.subscription.add(this.stackService.getStacks().subscribe(value=> {
      this.stacks = value;
    }));
  }

  private loadOperators(): void {
    this.operators$ = this.operatorService.getOperators();
  }

  public getStackId(index: number, stack: IStack): string {
    return stack.id!;
  }

  public onAddClick(): void {
    this.currentStack = null;
  }

  public onDisplayClick(id: string): void {
    this.subscription.add(this.stackService.getStack(id).subscribe(stack => this.currentStack = stack));
}

  public onDeleteClick(id: string): void {
    this.subscription.add(this.stackService.deleteStack(id).subscribe(() => {
      this.deleteStackFromList(id);
    }
    ));
  }

  public onAddOperand(): void {
    if(this.currentStack){
    //it should refresh the list of operand if the api call success
    this.subscription.add(this.stackService.addToStack(this.currentStack.id!, this.inputValue!).subscribe(value => {
      this.currentStack = value;
    }));
    } else {
      this.subscription.add(this.stackService.createStack({operands : [this.inputValue!]}).subscribe(value => {
        this.currentStack = value;
        this.stacks.push(value);
      }));
    }

    this.inputValue = null;
  }

  onOperatorClick(operator: OperatorEnum):void {
    this.subscription.add(this.operatorService.applyOperator(operator, this.currentStack?.id!).subscribe(
      value => this.currentStack = value
    ));
  }

  private deleteStackFromList(id: string): void {
    this.stacks.forEach((value,index)=>{
      if(value.id==id) this.stacks.splice(index,1);
  });    
}
}