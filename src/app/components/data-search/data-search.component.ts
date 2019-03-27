import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MapData } from '../map/mapData';
import { MapService } from '../../services/map.service';
import { GetMapDataComponent } from '../get-map-data/get-map-data.component';
@Component({
  selector: 'app-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss'],
  providers:[GetMapDataComponent]
})
export class DataSearchComponent implements OnInit {
  @Output() selectedData = new EventEmitter<MapData>();
  selectedHere:MapData;
  mapData$: Observable<MapData[]>;
  private searchTerms = new Subject<string>();

  constructor(private mapService: MapService,
    private getMapData:GetMapDataComponent) { }
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.mapData$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.mapService.searchFunction(term)),
    );
  }
  onSelect(data: MapData): void {
    this.selectedHere = data;
    this.selectedData.emit(this.selectedHere);
    
  }

}
