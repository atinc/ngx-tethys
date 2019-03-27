import {
    Component,
    ViewChildren,
    ContentChildren,
    QueryList,
    AfterViewInit,
    HostBinding,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { ThyStepComponent, IThyStepperComponent, THY_STEPPER_COMPONENT } from './step.component';
import { ThyStepHeaderComponent } from './step-header.component';

@Component({
    selector: 'thy-stepper',
    templateUrl: 'stepper.component.html',
    providers: [
        {
            provide: THY_STEPPER_COMPONENT,
            useExisting: ThyStepperComponent
        }
    ]
})
export class ThyStepperComponent implements IThyStepperComponent {
    @Input()
    set thySelectedIndex(value: number) {
        this.selectedIndex = value;
    }

    @Input()
    set thySelected(value: ThyStepComponent) {
        this.selected = value;
    }

    @Input() thyShowStepHeader = true;

    private _selectedIndex = 0;

    public set selected(step: ThyStepComponent) {
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

    @ViewChildren(ThyStepHeaderComponent) stepHeaders: QueryList<ThyStepHeaderComponent>;

    @ContentChildren(ThyStepComponent) steps: QueryList<ThyStepComponent>;

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
