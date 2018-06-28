import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'thy-option-item',
    templateUrl: './option-item.component.html',
})
export class OptionItemComponent implements OnInit {

    @Input() option: any;

    @Input()
    @HostBinding(`class.disabled`)
    thyDisabled: boolean;

    @HostBinding('class.thy-option-item') _isOptionItem = true;

    ngOnInit() {
        //  console.log(this.option);
    }
}
