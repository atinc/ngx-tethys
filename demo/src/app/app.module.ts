import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxTethysModule } from '../../../src/index';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { COMPONENTS, ENTRY_COMPONENTS } from './components';
import { DOCS_COMPONENTS } from './docs/index';
import { appRoutes } from './app.routes';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...DOCS_COMPONENTS
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ],
  imports: [
    BrowserModule,
    NgxTethysModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
