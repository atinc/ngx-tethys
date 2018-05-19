import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-pop-box-body',
    template: '<ng-content></ng-content>'
})
export class ThyPopBoxBody {

    @HostBinding('class.pop-box-body') isPopBoxBody = true;

}