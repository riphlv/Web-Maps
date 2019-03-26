import { Component, OnInit, Input } from '@angular/core';
import { MapData } from '../map/mapData';
import { GetMapDataComponent } from '../get-map-data/get-map-data.component';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @Input() data: MapData;
  
  constructor(){ }
  
  ngOnInit() {

  }
  

  


  /* selectedData: MapData;
  onSelect(data: MapData): void {
    this.selectedData = data;
  } */
}
