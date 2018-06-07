import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: '[option-item]',
    templateUrl: './option-item.component.html',
})
export class OptionItemComponent {
    @Input() option: any;
}
