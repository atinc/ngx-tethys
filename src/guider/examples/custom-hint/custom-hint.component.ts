import { Component, HostBinding, OnDestroy, OnInit, TemplateRef, inject, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ThyButton } from 'ngx-tethys/button';
import { ThyGuiderStepRef, ThyGuiderConfig, ThyGuiderRef, ThyGuiderStep, ThyGuider, ThyGuiderModule } from 'ngx-tethys/guider';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-guider-custom-hint-example',
    templateUrl: 'custom-hint.component.html',
    imports: [ThyButton, ThyIcon, ThyGuiderModule]
})
export class ThyGuiderCustomHintExampleComponent implements OnInit, OnDestroy {
    private thyGuider = inject(ThyGuider);

    private option: ThyGuiderConfig;

    private guiderRef: ThyGuiderRef;

    readonly descTemplate = viewChild<TemplateRef<any>>('descTemplate');

    ngOnInit() {
        this.option = this.setDefaultGuiderOption();
        this.guiderRef = this.thyGuider.create(this.option);
    }

    ngOnDestroy() {
        this.guiderRef.end();
    }

    private setDefaultGuiderOption(): ThyGuiderConfig {
        return {
            hintComponent: CustomTipExampleComponent,
            steps: [
                {
                    key: 'custom-tip-target',
                    target: '.custom-tip-target',
                    data: {
                        descTemplate: this.descTemplate(),
                        descString: 'Hello World'
                    },
                    hintPlacement: 'bottom',
                    hintOffset: 40
                }
            ] as ThyGuiderStep[]
        };
    }

    public startTour() {
        this.guiderRef.start();
    }

    public endTour() {
        this.guiderRef.end();
    }
}

@Component({
    selector: 'thy-custom-tip',
    template: `
        <p class="m-0 px-2 text-white bg-primary rounded text-center">
            <span class="d-block">{{ stepRef.step.data.descString }}</span>
            <ng-template [ngTemplateOutlet]="stepRef.step.data.descTemplate"></ng-template>
        </p>
    `,
    styles: ['p {font-size: 24px}'],
    imports: [NgTemplateOutlet]
})
export class CustomTipExampleComponent implements OnInit {
    @HostBinding('class.tip-blue') className = true;

    public guiderRef: ThyGuiderRef;

    public stepRef: ThyGuiderStepRef;

    public descTemplate: TemplateRef<any>;

    public descString: string;

    constructor() {}

    ngOnInit() {}
}
