import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-basic-example',
    templateUrl: './basic.component.html',
    styles: [
        `
            .basic-container {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;
            }
            thy-select,
            thy-custom-select {
                flex: 0 0 auto;
                width: 120px;
                margin-right: 20px;
            }
        `
    ]
})
export class ThySelectBasicExampleComponent implements OnInit {
    listOfOption = listOfOption;

    @ViewChild('origin', { read: ElementRef, static: true }) customizeOrigin: ElementRef;

    ngOnInit() {}
}
