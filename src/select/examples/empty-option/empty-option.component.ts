import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-select-empty-option-example',
    templateUrl: './empty-option.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySelect, ThyOption]
})
export class ThySelectEmptyOptionExampleComponent implements OnInit {
    listOfOption = listOfOption;

    ngOnInit() {}
}
