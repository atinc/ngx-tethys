import { Component, OnInit, Input, ContentChild, TemplateRef, QueryList, } from '@angular/core';
import { ThyOptionComponent } from './option.component';
import { ThyOptionGroupComponent } from './option-group.component';

@Component({
    selector: 'select-container',
    templateUrl: './select-container.component.html'
})
export class SelectContainerComponent implements OnInit {

    @Input() listOfOptionComponent: QueryList<ThyOptionComponent>;
    @Input() listOfOptionGroupComponent: QueryList<ThyOptionGroupComponent>;

    constructor(
    ) {

    }

    ngOnInit() {

    }
}

