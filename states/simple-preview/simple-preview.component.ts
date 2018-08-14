import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DmsService, DmsParams } from 'eo-client/src/app/eo-framework-core/dms/dms.service';
import { DmsObject } from 'eo-client/src/app/eo-framework-core/model/dms-object.model';

@Component({
  selector: 'eo-simple-preview',
  templateUrl: './simple-preview.component.html',
  styleUrls: ['./simple-preview.component.scss']
})
export class SimplePreviewComponent implements OnInit {

  static id = 'eo.custom.state.simple-preview';
  static path =  'custom/simple-preview';
  static matchType: RegExp = /sidebar-navigation/;

  item: DmsObject;

  constructor(private dmsService: DmsService, private route: ActivatedRoute) { }


  loadDmsObject(params: DmsParams) {
    this.dmsService
      .getDmsObjectByParams(params)
      .subscribe(val => this.item = val)
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe((params: any) => {
        if (params.id) {
          this.loadDmsObject(params);
        }
      });
  }

}
