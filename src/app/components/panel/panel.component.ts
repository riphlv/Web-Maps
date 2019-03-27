import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapData } from '../map/mapData';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @Input() data: MapData;
  @Output() gotoLocation = new EventEmitter<MapData>();
  constructor(){ }
  
  ngOnInit() {

  }
  
  goToLocation(data:MapData){
    this.gotoLocation.emit(data);
  }
  


  /* selectedData: MapData;
  onSelect(data: MapData): void {
    this.selectedData = data;
  } */
}
