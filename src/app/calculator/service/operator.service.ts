import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IOperators, OperatorEnum } from '../model/operator.model';
import { Observable, catchError } from 'rxjs';
import { IStack } from '../model/stack.model';
import { handlError } from '../functions/functions';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  protected http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/';

  public getOperators(): Observable<IOperators> {
    return this.http.get<IOperators>(this.baseUrl + 'op')
    .pipe(catchError(handlError));
  }

  public applyOperator(operator: OperatorEnum, stackId: string):Observable<IStack> {
    const url = this.baseUrl + 'op/' + operator + '/stack/' + stackId;
    return this.http.post<IStack>(url, null).pipe(
      catchError(handlError));
  }

}
