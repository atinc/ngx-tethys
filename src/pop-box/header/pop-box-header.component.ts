import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'thy-pop-box-header',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyPopBoxHeader {

    @HostBinding('class.pop-box-header') isPopBoxHeader = true;

}
