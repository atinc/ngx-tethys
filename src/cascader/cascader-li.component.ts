
import { Component, OnInit, Input, HostBinding, ElementRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CascaderOption } from './cascader.component';
import { UpdateHostClassService } from '../shared/update-host-class.service';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: '[thy-cascader-option]',
    templateUrl: './cascader-li.component.html',
    providers: [UpdateHostClassService]
})
export class ThyCascaderOptionComponent implements OnInit {

    @Input() option: CascaderOption;

    @Input()
    thyLabelProperty: string;

    constructor() {

    }

    public getOptionLabel() {
        return this.option ? this.option[this.thyLabelProperty || 'label']: '';
    }

    ngOnInit() {
    }

}
