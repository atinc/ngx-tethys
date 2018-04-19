import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'thy-card-content',
    preserveWhitespaces: false,
    template: `
    <ng-content></ng-content>
    `
})
export class ThyCardContentComponent implements OnInit {

    @Input('thyAlignment') thyAlignment: string;

    @HostBinding('class.thy-card-content') thyCardContentClass = true;

    @HostBinding('class.thy-card-content--alignment-title') alignmentClass = false;

    ngOnInit() {
        this.alignmentClass = this.thyAlignment === 'title';
    }
}
