import { Component, OnInit } from '@angular/core';
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
  mapData : MapData[];
  selectedData: MapData;

  
  constructor(private commonService:CommonService,
    private mapComponent: MapComponent) { }

  ngOnInit() {
    this.commonService.getMapData().subscribe((data:MapData[])=>{
      this.mapData = data;
      /* console.log(data); */
    });
  }
  deleteMapData(id){
    this.commonService.deleteMapData(id).subscribe(res=>{
      console.log('Deleting: ',id);
    });
  }

  onSelect(data: MapData): void {
    this.mapComponent.moveToMapPos(data.lat,data.lng);
    this.selectedData = data;
  }

}
