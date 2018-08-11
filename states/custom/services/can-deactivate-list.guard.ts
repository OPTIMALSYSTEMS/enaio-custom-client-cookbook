import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { SimpleListComponent } from '../../simple-list/simple-list.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateListGuard implements CanDeactivate<SimpleListComponent> {
  constructor() {}
 
  canDeactivate(){
    return false;
  }
}