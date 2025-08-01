import { Component, ElementRef, OnInit, Signal, ViewChild } from '@angular/core';
import { injectLocale, ThySelectLocale } from 'ngx-tethys/i18n';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-basic-example',
    templateUrl: './basic.component.html',
    styles: [
        `
            :host {
                display: flex;
                align-items: center;
            }
            .basic-container {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;
            }
            thy-select,
            thy-custom-select {
                flex: 0 0 auto;
                width: 90px;
                margin-right: 20px;
            }
        `
    ],
    imports: [ThySelect, ThyOption]
})
export class ThySelectBasicExampleComponent implements OnInit {
    listOfOption = listOfOption;

    locale: Signal<ThySelectLocale> = injectLocale('select');

    @ViewChild('origin', { read: ElementRef, static: true }) customizeOrigin: ElementRef;

    ngOnInit() {}
}
