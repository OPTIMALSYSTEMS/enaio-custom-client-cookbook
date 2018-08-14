import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { SelectionService } from 'eo-client/src/app/eo-framework-core/selection/selection.service';
import { DmsService } from 'eo-client/src/app/eo-framework-core/dms/dms.service';
import { DmsObject } from 'eo-client/src/app/eo-framework-core/model/dms-object.model';
import { EnaioEvent } from 'eo-client/src/app/eo-framework-core/events/events';
import { EventService } from 'eo-client/src/app/eo-framework-core/events/event.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'eo-map-frame',
  templateUrl: './map-frame.component.html',
  styleUrls: ['./map-frame.component.scss']
})
export class MapFrameComponent implements OnInit, AfterViewInit {
  static id = 'eo.custom.plugin.map-frame';
  static matchType: RegExp = /object-details-tab.*/;

  context;
  routeId;
  @ViewChild('mapFrame')
  mapFrame: ElementRef;

  constructor(
    private selectionService: SelectionService,
    private dmsService: DmsService,
    private renderer: Renderer2,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(routeParams => {
      this.routeId = routeParams.id;
    });
  }

  setup(data) {
    this.context = data;
    this.renderer.setAttribute(
      this.mapFrame.nativeElement,
      'src',
      `https://www.google.com/maps/embed/v1/place?key=AIzaSyDX8znfh-d4u3spGhC1GvCjq6EA1pjPovQ&q=${data.data.address}+${data.data.city}+${data.data.country}`
    );
  }

  ngAfterViewInit() {
    if (this.routeId) {
      this.dmsService
        .getDmsObject(this.routeId)
        .subscribe((data: DmsObject) => {
          this.setup(data);
        });
    }

    this.selectionService.focus$
      .filter(d => d.id)
      .flatMap(d => this.dmsService.getDmsObjectByParams(d))
      .subscribe((data: DmsObject) => {
        this.setup(data);
      });

    this.eventService.on(EnaioEvent.DMS_OBJECT_UPDATED).subscribe(event => {
      if (this.context && this.context.id === event.data.id) {
        this.setup(event.data);
      }
    });
  }

  ngOnInit() {}
}

