import { Component, ElementRef, OnInit, Signal, ViewChild } from '@angular/core';
import { listOfOption } from '../mock-data';
import { injectLocale, ThySelectLocale } from 'ngx-tethys/i18n';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { ThyInputGroup } from 'ngx-tethys/input';
import { ThyIcon } from 'ngx-tethys/icon';
import { FormsModule } from '@angular/forms';

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
    ],
    imports: [ThySelect, ThyOption, ThyInputGroup, ThyIcon, FormsModule]
})
export class ThySelectBasicExampleComponent implements OnInit {
    listOfOption = listOfOption;
    locale: Signal<ThySelectLocale> = injectLocale('select');

    selectedValue = listOfOption[0].value;

    @ViewChild('origin', { read: ElementRef, static: true }) customizeOrigin: ElementRef;

    ngOnInit() {}

    valueChange(value: string) {
        console.log('value', value);
    }
}
