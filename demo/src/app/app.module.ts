import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxTethysModule } from '../../../src/index';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { COMPONENTS, ENTRY_COMPONENTS } from './components';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ],
  imports: [
    BrowserModule,
    NgxTethysModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
