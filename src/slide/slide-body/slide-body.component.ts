import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-slide-body',
    template: `<ng-content></ng-content>`
})
export class ThySlideBodyComponent {

    @HostBinding('class.thy-slide-body') thySlideBodyClass = true;

}
