import { Component, OnInit } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-footer-example',
    templateUrl: './footer.component.html',
    standalone: false
})
export class ThySelectFooterExampleComponent implements OnInit {
    listOfOption = listOfOption;

    ngOnInit() {}
}
