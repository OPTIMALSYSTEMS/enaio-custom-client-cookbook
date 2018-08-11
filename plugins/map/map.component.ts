import {Component, OnInit} from '@angular/core';
 
@Component({
  selector: 'eo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
 
  static id = 'eo.custom.plugin.map';
  static matchType: RegExp = /object-details-tab.*/;
 
  currentPosition;
 
  constructor() {
  }
 
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => (this.currentPosition = position));
  }
 
 
}