import { Component, OnInit, Input, ContentChild, TemplateRef, ContentChildren, QueryList, } from '@angular/core';
import { ThyOptionComponent } from './option.component';

@Component({
    selector: 'thy-option-group',
    templateUrl: './option.component.html'
})
export class ThyOptionGroupComponent implements OnInit {

    @Input() thyGroupLabel: string;

    @ContentChildren(ThyOptionComponent) listOfOptionComponent: QueryList<ThyOptionComponent>;

    constructor(
    ) {

    }

    ngOnInit() {

    }
}

