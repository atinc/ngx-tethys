import {
    Component, forwardRef, HostBinding,
    Input, ElementRef, OnInit, AfterViewInit, Output, EventEmitter,
    ViewChildren, TemplateRef, ViewChild, ContentChildren, QueryList
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThySelectCustomComponent } from './select-custom.component';
import { ThyInputSearchComponent } from '../input/input-search.component';

@Component({
    selector: 'thy-option,thy-option-group',
    templateUrl: './option.component.html'
})
export class ThyOptionComponent implements OnInit, AfterViewInit {

    @Input() thyGroupLabel: string;

    @Input() thyValue: any;

    // 原始值，用于自定义模板展示内容时回传的对象
    @Input() thyRawValue: any;

    @Input() thyLabelText: string;

    @Input() thyDisabled: boolean;

    @Input() thyShowOptionCustom: boolean;

    @Input() thySearchKey: string;

    @ViewChild(TemplateRef) template: TemplateRef<any>;

    @ContentChildren(ThyOptionComponent) listOfOptionComponent: QueryList<ThyOptionComponent>;

    showOptionComponents: ThyOptionComponent[];

    selected = false;

    constructor(
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.showOptionComponents = this.listOfOptionComponent.toArray();
    }

    filterOptionComponents(iterate: (option: ThyOptionComponent) => boolean): ThyOptionComponent[] {
        const matchComponents: ThyOptionComponent[] = [];
        this.listOfOptionComponent.forEach((item) => {
            if (!item.thyGroupLabel && iterate(item)) {
                matchComponents.push(item);
            }
        });
        this.showOptionComponents = matchComponents;
        return matchComponents;
    }

    resetFilterComponents() {
        this.showOptionComponents = this.listOfOptionComponent ? this.listOfOptionComponent.toArray() : [];
    }
}

