import {
    Component,
    ViewChildren,
    ContentChildren,
    QueryList,
    HostBinding,
    Input,
    Output,
    EventEmitter,
    numberAttribute
} from '@angular/core';
import { ThyStep, IThyStepperComponent, THY_STEPPER_COMPONENT } from './step.component';
import { ThyStepHeader } from './step-header.component';
import { NgIf, NgFor, NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 步骤条组件
 * @name thy-stepper
 * @order 10
 */
@Component({
    selector: 'thy-stepper',
    templateUrl: 'stepper.component.html',
    providers: [
        {
            provide: THY_STEPPER_COMPONENT,
            useExisting: ThyStepper
        }
    ],
    standalone: true,
    imports: [NgIf, NgFor, ThyStepHeader, NgTemplateOutlet]
})
export class ThyStepper implements IThyStepperComponent {
    /**
     * 当前处于激活状态的步骤index
     * @default 0
     */
    @Input({ transform: numberAttribute })
    set thySelectedIndex(value: number) {
        this.selectedIndex = value;
    }

    @Input()
    set thySelected(value: ThyStep) {
        this.selected = value;
    }

    /**
     * 步骤条导航是否展示，默认展示
     */
    @Input({ transform: coerceBooleanProperty }) thyShowStepHeader = true;

    private _selectedIndex = 0;

    public set selected(step: ThyStep) {
        this.selectedIndex = this.steps ? this.steps.toArray().indexOf(step) : -1;
    }

    public get selected() {
        return this.steps ? this.steps.toArray()[this.selectedIndex] : null;
    }

    set selectedIndex(index: number) {
        if (this.steps) {
            this._updateSelectedItemIndex(index);
        } else {
            this._selectedIndex = index;
        }
    }

    get selectedIndex() {
        return this._selectedIndex;
    }

    @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();

    @ViewChildren(ThyStepHeader) stepHeaders: QueryList<ThyStepHeader>;

    @ContentChildren(ThyStep) steps: QueryList<ThyStep>;

    @HostBinding('class.thy-stepper') thyStepper = true;

    private _updateSelectedItemIndex(newIndex: number): void {
        const stepsArray = this.steps.toArray();
        this.selectionChange.emit({
            selectedIndex: newIndex,
            previouslySelectedIndex: this._selectedIndex,
            selectedStep: stepsArray[newIndex],
            previouslySelectedStep: stepsArray[this._selectedIndex]
        });
        this._selectedIndex = newIndex;
    }

    to(index: number): void {
        this.selectedIndex = Math.min(index, this.steps.length - 1);
    }

    next(): void {
        this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
    }

    /** Selects and focuses the previous step in list. */
    previous(): void {
        this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
    }
}
