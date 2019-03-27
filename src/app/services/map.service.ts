import { Injectable, Output, EventEmitter } from '@angular/core';
import { MapData } from '../components/map/mapData'; //datu modelis
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as L from 'leaflet';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MapService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getData():Observable<MapData[]>{
    return this.http.get<MapData[]>('http://localhost:4000/crud/get');
  }

  searchFunction(term:string):Observable<MapData[]>{
    if(!term.trim()){
      return of([]);
    }
    console.log(term);
    return this.http.get<MapData[]>('http://localhost:4000/crud/get/'+term).pipe(
      catchError(this.handleError<MapData[]>('searchFunction', []))
    )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
