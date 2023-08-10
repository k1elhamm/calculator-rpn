import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IStack } from '../model/stack.model';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs'
import { handlError } from '../functions/functions';

@Injectable({
  providedIn: 'root'
})
export class StackService {

  protected http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/';

  public getStacks(): Observable<IStack[]> {
    return this.http.get<IStack[]>(this.baseUrl + 'stack')
    .pipe(catchError(handlError));
  }

  public createStack(data: IStack): Observable<IStack> {
    return this.http.post<IStack>(this.baseUrl + 'stack', data)
    .pipe(catchError(handlError));
  }

  public deleteStack(id: string): Observable<any>{
    return this.http.delete<IStack>(this.baseUrl + 'stack/' + id)
    .pipe(catchError(handlError));
  }

  public addToStack(id: string, operand: number): Observable<IStack> {
    return this.http.post<IStack>(this.baseUrl + 'stack/' + id, {operand})
    .pipe(catchError(handlError));
  }

  public getStack(id: string): Observable<IStack> {
    return this.http.get<IStack>(this.baseUrl + 'stack/' + id)
    .pipe(catchError(handlError));
  }

}
