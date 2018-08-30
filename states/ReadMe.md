Integrate the Guard like this in custom-states.module.ts :

```
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {EoFrameworkModule} from 'eo-client/src/app/eo-framework/eo-framework.module';
import {AuthGuard} from 'eo-client/src/app/eo-framework-core/auth/auth-guard.service';
import {SampleComponent} from './sample/sample.component';
import {EoLinkPlugin} from 'eo-client/src/app/eo-framework/plugins/plugin.service';
import { SimpleListComponent } from './simple-list/simple-list.component';
import { SimplePreviewComponent } from './simple-preview/simple-preview.component';
import { CanDeactivateListGuard } from './custom/services/can-deactivate-list.guard.ts';


export const routes: Route[] = [
  {path: SimplePreviewComponent.path, component: SimplePreviewComponent, canActivate: [AuthGuard]},
  {path: SimpleListComponent.path, component: SimpleListComponent, canActivate: [AuthGuard], 
    canDeactivate: [CanDeactivateListGuard]},
  {path: SampleComponent.path, component: SampleComponent, canActivate: [AuthGuard]}
];

export const links: EoLinkPlugin[] = [
  SimplePreviewComponent,
  SimpleListComponent,
  // SampleComponent,
  // {path: '/dashboard', id: 'eo.custom.state.sample', matchType: /sidebar-navigation/, queryParams: {debug: true}},
  // {path: 'https://google.com/', id: 'eo.custom.state.sample', matchType: /sidebar-profile/}
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SampleComponent, SimpleListComponent, SimplePreviewComponent],
  providers: [CanDeactivateListGuard]
})
export class CustomStatesModule {
}
```
