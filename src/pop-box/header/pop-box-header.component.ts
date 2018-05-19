import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-pop-box-header',
    template: '<ng-content></ng-content>'
})
export class ThyPopBoxHeader {

    @HostBinding('class.pop-box-header') isPopBoxHeader = true;

}
