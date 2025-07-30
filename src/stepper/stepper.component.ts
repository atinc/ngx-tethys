import {
    Component,
    numberAttribute,
    viewChildren,
    output,
    contentChildren,
    input,
    computed,
    effect,
    ChangeDetectionStrategy,
    signal,
    untracked
} from '@angular/core';
import { ThyStep, IThyStepperComponent, THY_STEPPER_COMPONENT } from './step.component';
import { ThyStepHeader } from './step-header.component';
import { NgTemplateOutlet } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 步骤条组件
 * @name thy-stepper
 * @order 10
 */
@Component({
    selector: 'thy-stepper',
    templateUrl: 'stepper.component.html',
    providers: [{ provide: THY_STEPPER_COMPONENT, useExisting: ThyStepper }],
    imports: [ThyStepHeader, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'thy-stepper' }
})
export class ThyStepper implements IThyStepperComponent {
    /**
     * 当前处于激活状态的步骤 index
     */
    readonly thySelectedIndex = input<number, unknown>(0, { transform: numberAttribute });

    /**
     * 当前处于激活状态的步骤实例
     */
    readonly thySelected = input<ThyStep>();

    /**
     * 步骤条导航是否展示，默认展示
     */
    readonly thyShowStepHeader = input(true, { transform: coerceBooleanProperty });

    readonly selectionChange = output<any>();

    readonly steps = contentChildren(ThyStep);

    readonly selectedIndex = signal(0);

    protected readonly selected = computed(() => this.steps()?.[this.selectedIndex()]);

    constructor() {
        effect(() => {
            const newIndex = this.thySelectedIndex();
            if (newIndex) {
                untracked(() => {
                    this.updateSelectedIndex(newIndex);
                });
            }
        });

        effect(() => {
            const selected = this.thySelected();
            if (selected) {
                untracked(() => {
                    const index = this.steps()?.indexOf(selected);
                    if (index > -1) {
                        this.updateSelectedIndex(index);
                    }
                });
            }
        });
    }

    private updateSelectedIndex(newIndex: number): void {
        if (!this.steps()?.[newIndex]) {
            return;
        }
        const previouslySelectedIndex = this.selectedIndex();
        const previouslySelectedStep = this.steps() ? this.steps()[previouslySelectedIndex] : null;
        this.selectedIndex.set(newIndex);
        this.selectionChange.emit({
            selectedIndex: newIndex,
            previouslySelectedIndex: previouslySelectedIndex,
            selectedStep: this.selected(),
            previouslySelectedStep: previouslySelectedStep
        });
    }

    updateSelected(step: ThyStep): void {
        const index = this.steps().indexOf(step);
        this.updateSelectedIndex(index);
    }

    to(index: number): void {
        this.updateSelectedIndex(Math.min(index, this.steps().length - 1));
    }

    next(): void {
        this.updateSelectedIndex(Math.min(this.selectedIndex() + 1, this.steps().length - 1));
    }

    /** Selects and focuses the previous step in list. */
    previous(): void {
        this.updateSelectedIndex(Math.max(this.selectedIndex() - 1, 0));
    }
}
