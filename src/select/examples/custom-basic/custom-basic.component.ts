import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-custom-basic-example',
    templateUrl: './custom-basic.component.html',
    styles: [
        `
            .custom-basic-container {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;
            }
            thy-custom-select {
                flex: 0 0 auto;
                width: 120px;
                margin-right: 20px;
            }
        `
    ]
})
export class ThySelectCustomBasicExampleComponent implements OnInit {
    listOfOption = listOfOption;

    @ViewChild('origin', { read: ElementRef, static: true }) customizeOrigin: ElementRef;

    ngOnInit() {}
}
