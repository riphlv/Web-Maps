// Common Service is used for sending and retrieving data from backend

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) { }

  addMapData(a,b,c,d){ // Its as simple as 'a b c d'
    const mapData = {
      name : a,
      info : b,
      lat  : c,
      lng  : d
    }
    console.log("Sending: ",mapData);
    this.http.post('http://localhost:4000/crud/add',mapData).subscribe(res=>{
      console.log("add done");
    });
  }

  getMapData(){
    console.log("Getting data..");
    return this.http.get('http://localhost:4000/crud/get');
  }

  editMapData(id){
    console.log('Editing: ',id);
    return this.http.get('http://localhost:4000/crud/edit/'+id);
  }
  
  updateMapData(a,b,c,d,id){
    const mapData = {
      name : a,
      info : b,
      lat  : c,
      lng  : d
    }
    console.log("Updating: ",mapData);
    this.http.post('http://localhost:4000/crud/update/'+id,mapData)
    .subscribe(res => {
      console.log('Updated!');
    });

  }

  deleteMapData(id){
    return this.http.get('http://localhost:4000/crud/delete/'+id);
  }

}
