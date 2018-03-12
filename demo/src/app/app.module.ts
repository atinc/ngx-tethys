import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxTethysModule } from '../../../src/index';


import { AppComponent } from './app.component';
import { COMPONENTS, ENTRY_COMPONENTS } from './components';


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
    NgxTethysModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
