import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNavComponent, ThyNavLinkDirective } from './nav.component';

@NgModule({
    declarations: [
        ThyNavComponent,
        ThyNavLinkDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyNavComponent,
        ThyNavLinkDirective
    ]
})
export class ThyNavModule {

}
