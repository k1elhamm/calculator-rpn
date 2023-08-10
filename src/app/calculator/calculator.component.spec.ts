import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { StackService } from './service/stack.service';
import { OperatorService } from './service/operator.service';
import { IStack } from './model/stack.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StackComponent } from '../stack/stack.component';
import { FormsModule } from '@angular/forms';
import { IOperators, OperatorEnum } from './model/operator.model';

// Mock StackService
class MockStackService {
  getStacks(): Observable<IStack[]> {
    return of([]);
  }

  getStack(id: string): Observable<IStack> {
    return of({ id, operands: [] });
  }

  deleteStack(id: string) {
    return of([]);
  }

  addToStack(id: string, operand: number): Observable<IStack> {
    return of({ id, operands: [operand] });
  }

  createStack(stack: IStack): Observable<IStack> {
    return of(stack);
  }
}

class MockOperatorService {
  getOperators(): Observable<IOperators> {
    return of({ operators :  [OperatorEnum.ADD, OperatorEnum.SUB, OperatorEnum.MUL, OperatorEnum.DIV]});
  }

  applyOperator(operator: OperatorEnum, stackId: string): Observable<IStack> {
    return of({ id: stackId, operands: [5, 10] });
  }
}


describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let stackService: MockStackService;
  let operatorService: MockOperatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, CalculatorComponent],
      providers: [
        { provide: StackService, useClass: MockStackService },
        { provide: OperatorService, useClass: MockOperatorService } 
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    stackService = TestBed.inject(StackService);
    operatorService = TestBed.inject(OperatorService);
    fixture.detectChanges();
  });

  it('should load operators on initialization', () => {
    component.ngOnInit();
    component.operators$.subscribe(operators => {
      expect(operators).toEqual({ operators :  [OperatorEnum.ADD, OperatorEnum.SUB, OperatorEnum.MUL, OperatorEnum.DIV]});
    });
  });

  it('should handle operator click', () => {
    const stackId = '1';
    const mockStack: IStack = { id: stackId, operands: [5, 10] };
    spyOn(operatorService, 'applyOperator').and.returnValue(of(mockStack));

    component.currentStack = { id: stackId, operands: [5, 10] };
    component.onOperatorClick(OperatorEnum.ADD);

    expect(operatorService.applyOperator).toHaveBeenCalledWith(OperatorEnum.ADD, stackId);
    expect(component.currentStack).toEqual(mockStack);
  });

  it('should load stacks on initialization', () => {
    const mockStacks: IStack[] = [{ id: '1', operands: [1, 2, 3] }];
    spyOn(stackService, 'getStacks').and.returnValue(of(mockStacks));

    component.ngOnInit();

    expect(component.stacks).toEqual(mockStacks);
  });

  it('should add operand to the current stack', () => {
    const mockStack: IStack = { id: '1', operands: [1, 2] };
    spyOn(stackService, 'addToStack').and.returnValue(of(mockStack));

    component.currentStack = mockStack;
    component.inputValue = 3;
    component.onAddOperand();

    expect(component.currentStack).toEqual(mockStack);
    expect(component.inputValue).toBeNull();
  });



  it('should create a new stack and add operand', () => {
    const mockStack: IStack = { id: '2', operands: [5] };
    spyOn(stackService, 'createStack').and.returnValue(of(mockStack));

    component.inputValue = 5;
    component.onAddOperand();

    expect(component.currentStack).toEqual(mockStack);
    expect(component.stacks).toContain(mockStack);
    expect(component.inputValue).toBeNull();
  });

  afterEach(() => {
    component.subscription.unsubscribe();
  });
});
