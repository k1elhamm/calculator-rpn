import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StackService } from './stack.service';
import { IStack } from '../model/stack.model';
import { Subscription } from 'rxjs';

describe('StackService', () => {
  let service: StackService;
  let httpMock: HttpTestingController;
  let url = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StackService]
    });
    service = TestBed.inject(StackService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get stacks', () => {
    const mockStacks: IStack[] = [{ id: '1', operands: [1, 2, 3] }];

    service.getStacks().subscribe(stacks => {
      expect(stacks).toEqual(mockStacks);
    });

    const req = httpMock.expectOne(url + '/stack');
    expect(req.request.method).toBe('GET');
    req.flush(mockStacks);
  });

  it('should create a stack', () => {
    const mockStack: IStack = { id: '2', operands: [5] };

    service.createStack(mockStack).subscribe(stack => {
      expect(stack).toEqual(mockStack);
    });

    const req = httpMock.expectOne(url + '/stack');
    expect(req.request.method).toBe('POST');
    req.flush(mockStack);
  });

  it('should delete a stack', () => {
    const stackId = '1';

    service.deleteStack(stackId).subscribe();

    const req = httpMock.expectOne(`${url}/stack/${stackId}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should add operand to a stack', () => {
    const stackId = '2';
    const operand = 10;
    const mockStack: IStack = { id: stackId, operands: [5, operand] };

    service.addToStack(stackId, operand).subscribe(stack => {
      expect(stack).toEqual(mockStack);
    });

    const req = httpMock.expectOne(`${url}/stack/${stackId}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockStack);
  });

  it('should get a stack by id', () => {
    const stackId = '3';
    const mockStack: IStack = { id: stackId, operands: [8, 9] };

    service.getStack(stackId).subscribe(stack => {
      expect(stack).toEqual(mockStack);
    });

    const req = httpMock.expectOne(`${url}/stack/${stackId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStack);
  });

  it('should handle errors', () => {
    const errorMessage = 'Error fetching data';

    service.getStacks().subscribe(
      () => fail(' result'),
      error => {
        expect(error).toContain(errorMessage);
      }
    );

    const req = httpMock.expectOne(url + '/stack');
    req.error(new ErrorEvent('Network error', { message: errorMessage }));
  });
});