import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-select-footer-example',
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySelect, ThyOption]
})
export class ThySelectFooterExampleComponent implements OnInit {
    listOfOption = listOfOption;

    ngOnInit() {}
}
