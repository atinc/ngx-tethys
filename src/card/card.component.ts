import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-card',
    template: `
    <ng-content></ng-content>
  `
})
export class ThyCardComponent {

    @HostBinding('class.thy-card') thyCardClass = true;

}
