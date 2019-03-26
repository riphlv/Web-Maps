import { Injectable } from '@angular/core';
import { MapData } from '../components/map/mapData'; //datu modelis
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getData():Observable<MapData[]>{
    return this.http.get<MapData[]>('http://localhost:4000/crud/get');
  }

}
