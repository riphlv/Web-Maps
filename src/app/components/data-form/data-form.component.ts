import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {
  angForm:FormGroup;
  constructor(private fb:FormBuilder, private commonService:CommonService) {
    this.createForm() 
  }
  createForm() {
    this.angForm = this.fb.group({
      data_name: ['', Validators.required ],
      data_info: ['', Validators.required ],
      data_lat: ['', Validators.required ],
      data_lng: ['', Validators.required ]
    });
  }
  addMapData(name,info,lat,lng){
    this.commonService.addMapData(name,info,lat,lng);
    console.log("Data added");
  }

  ngOnInit() {
  }

}
