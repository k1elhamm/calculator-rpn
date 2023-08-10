import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OperatorService } from './operator.service';
import { IOperators, OperatorEnum } from '../model/operator.model';
import { IStack } from '../model/stack.model';

describe('OperatorService', () => {
  let service: OperatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OperatorService]
    });
    service = TestBed.inject(OperatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get operators', () => {
    const mockOperators: IOperators = 
    { operators : [OperatorEnum.ADD, OperatorEnum.DEL, OperatorEnum.DIV]
    };

    service.getOperators().subscribe(operators => {
      expect(operators).toEqual(mockOperators);
    });

    const req = httpMock.expectOne('http://localhost:3000/op');
    expect(req.request.method).toBe('GET');
    req.flush(mockOperators);
  });

  it('should apply addition operator to a stack', () => {
    const operator = OperatorEnum.ADD;
    const stackId = '1';
    const mockStack: IStack = { id: stackId, operands: [5, 10] };

    service.applyOperator(operator, stackId).subscribe(stack => {
      expect(stack).toEqual(mockStack);
    });

    const url = `http://localhost:3000/op/${operator}/stack/${stackId}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(mockStack);
  });

  it('should handle errors when getting operators', () => {
    const errorMessage = 'Error fetching operators';

    service.getOperators().subscribe(
      () => fail('expected an error, but got a result'),
      error => {
        expect(error).toContain(errorMessage);
      }
    );

    const req = httpMock.expectOne('http://localhost:3000/op');
    req.error(new ErrorEvent('Network error', { message: errorMessage }));
  });

});