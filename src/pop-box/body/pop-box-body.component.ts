import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'thy-pop-box-body',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None
})
export class ThyPopBoxBody {

    @HostBinding('class.pop-box-body') isPopBoxBody = true;

}
