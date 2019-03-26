import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../services/map.service';
import { MapData } from './mapData';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map = L.Map.prototype;
  mapData: MapData[];
  selectedData: MapData;
  coords: String;
  savedCoords: L.LatLng = L.latLng(0,0);
  aplis = L.circle([56.9689, 24.0765], { radius: 5000 });

  constructor(private zone: NgZone,
    private mapService: MapService,
    private commonService: CommonService) {

  }

  ngOnInit() {
    this.getMapData();
  }
  getMapData(): void {
    this.mapService.getData().subscribe(data => {
      this.mapData = data;
      this.update();
    });
    //this.update();
  }
  circle = L.circle([1, 1], { radius: 5000 });
  options = {
    layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    })]
  };
  zoom = 7;
  center = L.latLng([56.96, 24.06])
  featureGroup = new L.FeatureGroup();
  drawOptions = {
    position: 'topleft',
    featureGroup: this.featureGroup
  };

  update() {
    console.log(">", this.mapData);
  }

  //map = L.Map;
  onMapReady(map: L.Map) {
    // Fetch data from database and display it
    this.map = map;
    this.mapService.getData().subscribe(data => {
      this.mapData = data;
      for (var i = 0; i < this.mapData.length; i++) {
        L.marker([this.mapData[i].lat, this.mapData[i].lng], {
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
          })
        }).bindPopup(this.mapData[i].info).addTo(map);
        //L.circle([ this.mapData[i].lat, this.mapData[i].lng ], { radius: 50000 }).addTo(map);

      }
    });
    this.circle.addTo(map);
  }

  mouseOver(e) {
    /* L.popup()
    .setLatLng(e.latlng) 
    .setContent('Popup')
    .openOn(this.map); */
  }

  mouseClick(e: any) {
    this.circle.setLatLng(e.latlng);
    this.savedCoords = e.latlng;
  
    /* console.log(this.savedCoords); */
  }
  mouseMove(e) {
    this.coords = e.latlng.lat.toFixed(4) + ", " + e.latlng.lng.toFixed(4);
  }
  input_data = {
    name:"",
    info:""
  }
  addMapData(){
    this.commonService.addMapData(this.input_data.name,this.input_data.info,this.savedCoords.lat,this.savedCoords.lng);
    console.log("Data added");
  }

 /*  test; */
 test(e,lat,lng){
 /*  this.map.setView(L.latLng(lat,lng), 8); */

 }
  moveToMapPos(lat:any,lng:any){
    console.log(lat,lng);
    /* this.test = new L.LatLng(lat, lng); */
    /* this.test(event,lat,lng) */
    this.map.setView(L.latLng(lat,lng), 8);
  }



}
