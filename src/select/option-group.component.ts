import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'thy-option-group',
    templateUrl: './option-group.component.html'
})
export class ThySelectOptionGroupComponent implements OnInit {
    @Input()
    @HostBinding(`class.disabled`)
    thyDisabled: boolean;

    visibility = true;

    @Input() thyGroupLabel: string;

    ngOnInit() {}
}
