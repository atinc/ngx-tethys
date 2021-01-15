import { Component, OnInit } from '@angular/core';
import { ThyMultiSelectEvent, ThyGridRowEvent, ThyGridSize, ThyGridTheme } from 'ngx-tethys';

@Component({
    selector: 'thy-guider-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyGuiderBasicExampleComponent implements OnInit {
    public data = {
        title: 'basic example',
        description: 'description for hint component'
    };
    ngOnInit() {}
}
