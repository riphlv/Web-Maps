import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../services/map.service';
import { MapData } from './mapData';
import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: []
})
export class MapComponent implements OnInit {
  map: L.Map;
  mapData: MapData[];
  coords: String;
  savedCoords: L.LatLng = L.latLng(0, 0);
  aplis = null;
  pozicija: L.LatLng = L.latLng(0, 0);
  poly = [];
  isVisible: boolean;

  geoJson;


  constructor(private changeDetector: ChangeDetectorRef,
    private mapService: MapService,
    private commonService: CommonService,
    private http: HttpClient) {

  }

  ngOnInit() {
    this.getMapData();
  }
  getMapData(): void {
    this.mapService.getData().subscribe(data => {
      this.mapData = data;
      this.update();
    });
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

      }
      //
      //this.map.flyTo({lat:1,lng:1});
      this.http.get('assets/map.geojson').subscribe((json: any) => {
        console.log(json);
        this.geoJson = json;
        L.geoJSON(this.geoJson).addTo(this.map);
      });
    });
    // Add here
  }

  mouseOver(e) {

  }
  dist: number = 0;
  linija;
  punkts;
  mouseClick(e: any) {
    //Save coords for later use
    this.savedCoords = e.latlng;
    //
    if (this.poly.length == 0) {
      this.poly.push(e.latlng);
      this.punkts = L.marker(this.poly[0]);
      this.map.addLayer(this.punkts);
    } else if (this.poly.length == 1) {
      this.poly.push(e.latlng);
      this.linija = L.polygon(this.poly);
      this.map.addLayer(this.linija);
      this.dist = e.latlng.distanceTo(this.poly[0]);
      this.map.removeLayer(this.punkts);
    } else {
      this.poly = [];
      this.map.removeLayer(this.linija);
    }
  }
  test(e) {

  }
  mouseMove(e) {
    this.coords = e.latlng.lat.toFixed(4) + ", " + e.latlng.lng.toFixed(4);
  }
  input_data = {
    name: "",
    info: ""
  }
  addMapData() {
    this.commonService.addMapData(this.input_data.name, this.input_data.info, this.savedCoords.lat, this.savedCoords.lng);
    
    console.log("Data added");
  }
  goToLocation($event){
    this.map.flyTo(L.latLng($event.lat,$event.lng),9);
  }

}
