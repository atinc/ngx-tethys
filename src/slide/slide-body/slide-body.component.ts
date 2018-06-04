import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-slide-body',
    template: `<div class="thy-slide-body-content"><ng-content></ng-content></div>`
})
export class ThySlideBodyComponent {

    @HostBinding('class.thy-slide-body') thySlideBodyClass = true;

}
