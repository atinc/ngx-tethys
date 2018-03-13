import { Component } from '@angular/core';

@Component({
    selector: 'thy-first',
    templateUrl: './first.component.html',
    exportAs: 'hello'
})
export class FirstComponent {
    title = 'app';
}
