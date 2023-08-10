import { EMPTY, Observable, throwError } from 'rxjs';


export function handlError(): Observable<never> {
   const errorMessage = 'Error while fetshing/pushing data from/to server';
   alert(errorMessage);
   return EMPTY;
}