import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyAutocomplete, ThyAutocompleteTriggerDirective } from 'ngx-tethys/autocomplete';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-autocomplete-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyInputDirective, FormsModule, ThyAutocompleteTriggerDirective, ThyAutocomplete, ThyOption]
})
export class ThyAutocompleteBasicExampleComponent implements OnInit, AfterViewInit {
    value = '';

    optionCount = 20000;

    listOfOption = Array.from({ length: this.optionCount }, (_, index) => ({
        value: `${index + 1}option`,
        text: `${index + 1} 选项`
    }));

    private perfTracker = perfTracker();

    constructor() {
        console.log('数据量 optionCount:', `${this.optionCount}`);
        this.perfTracker.add('constructor');
    }

    ngOnInit() {
        this.perfTracker.add('ngOnInit');
    }

    ngAfterViewInit() {
        this.perfTracker.add('ngAfterViewInit');
    }
}

function perfTracker() {
    let lastDate = new Date().getTime();
    return {
        add(name: string) {
            const current = new Date().getTime();
            console.log(`[${name}] ${current}, duration: ${current - lastDate}`);
            lastDate = current;
        }
    };
}
