import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edit-map-data',
  templateUrl: './edit-map-data.component.html',
  styleUrls: ['./edit-map-data.component.scss']
})
export class EditMapDataComponent implements OnInit {
  mapData: any = {};
  angForm: FormGroup;
  constructor(private commonService:CommonService,
    private router:Router,
    private route:ActivatedRoute,
    private fb:FormBuilder) {
      this.createForm();
      console.log("asd",this.mapData);
  }
  
  createForm() {
    this.angForm = this.fb.group({
      data_name: [this.mapData.name, Validators.required ],
      data_info: [this.mapData.info, Validators.required ],
      data_lat: [this.mapData.lat, Validators.required ],
      data_lng: [this.mapData.lng, Validators.required ]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.commonService.editMapData(params['id']).subscribe(res => {
        this.mapData = res;
        console.log(this.mapData);
        this.createForm();
      });
    });
  }
  
  updateMapData(name,info,lat,lng){
    this.route.params.subscribe(params=>{
      console.log('Updating: ', params['id']);
      this.commonService.updateMapData(name,info,lat,lng,params['id']);
      /* this.router.navigate(['/']); */
    })
  }

}
