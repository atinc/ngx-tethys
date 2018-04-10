import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNavComponent } from './nav.component';
import { ThyNavLinkDirective } from './nav-link.directive';

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
