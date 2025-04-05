import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-select-footer-example',
    templateUrl: './footer.component.html',
    imports: [ThySelect, ThyOption]
})
export class ThySelectFooterExampleComponent implements OnInit {
    listOfOption = listOfOption;

    ngOnInit() {}
}
