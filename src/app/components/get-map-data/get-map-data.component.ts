import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MapData } from '../map/mapData';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-get-map-data',
  templateUrl: './get-map-data.component.html',
  styleUrls: ['./get-map-data.component.scss'],
  providers:[ MapComponent ]
})
export class GetMapDataComponent implements OnInit {
  @Output() gotoLocation = new EventEmitter<MapData>();
  mapData : MapData[];
  selectedData: MapData;
  goToData:MapData;

  
  constructor(private commonService:CommonService,
    private mapComponent: MapComponent) { }

  ngOnInit() {
    this.commonService.getMapData().subscribe((data:MapData[])=>{
      this.mapData = data;
    });
  }
  deleteMapData(id){
    this.commonService.deleteMapData(id).subscribe(res=>{
      console.log('Deleting: ',id);
    });
  }

  onSearchSelect($event){
    this.selectedData = $event;
    this.onSelect(this.selectedData);
  }
  onSelect(data: MapData): void {
    this.selectedData = data;
  }
  goToLocation($event){
    this.goToData = $event;
    this.gotoLocation.emit($event);
  }

}
