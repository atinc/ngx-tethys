import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: '[option-item]',
    templateUrl: './option-item.component.html',
})
export class OptionItemComponent implements OnInit {

    @Input() option: any;

    ngOnInit() {
        console.log(this.option);
    }
}
