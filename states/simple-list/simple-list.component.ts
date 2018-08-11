import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, CanDeactivate } from '@angular/router';
import { SearchQuery, SearchResult } from 'eo-client/src/app/eo-framework-core/search/search-query.model';
import { SearchService } from 'eo-client/src/app/eo-framework-core/search/search.service';
import { SimplePreviewComponent } from '../simple-preview/simple-preview.component';

@Component({
  selector: 'eo-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.scss']
})
export class SimpleListComponent implements OnInit {

  static id = 'eo.custom.state.simple-list';
  static path = 'custom/simple-list';
  static matchType: RegExp = /sidebar-navigation/;

  query: SearchQuery;
  searchResult: SearchResult = new SearchResult();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService) { }


  getParams() {
    this.route
      .queryParams
      .subscribe((params: any) => {
        if (params.query) {
          this.query = JSON.parse(decodeURIComponent(params.query));
          const defaultQuery = this.searchService.buildQuery(this.query);

          this.searchService
            .getChunkedResult(defaultQuery, 0, 10000)
            .subscribe(result => {
              this.searchResult = result;
            });
        }
      });
  }

  onDoubleClick(event) {
    const {id, version, typeName} = event.data;
    const queryParams: NavigationExtras = {queryParams: {id, version, 'type': typeName}};
    const url = this.router.createUrlTree([SimplePreviewComponent.path], queryParams).toString();
    window.open(url);

  }

  ngOnInit() {
    this.getParams();
  }

}