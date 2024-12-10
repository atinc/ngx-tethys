import { HostBinding, Component, OnInit, TemplateRef, Signal } from '@angular/core';
import { ThyGuiderRef } from '../guider-ref';
import { helpers } from 'ngx-tethys/util';
import { defaultGuiderPositionConfig, ThyGuiderStep } from '../guider.class';
import { ThyGuiderStepRef } from '../guider-step-ref';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { injectLocale, ThyGuiderLocale } from 'ngx-tethys/i18n';

/**
 * @private
 */
@Component({
    selector: 'thy-guider-hint',
    templateUrl: 'guider-hint.component.html',
    imports: [NgTemplateOutlet, NgClass]
})
export class ThyGuiderHint implements OnInit {
    @HostBinding('class.thy-guider-tip-container') guiderHint = true;

    locale: Signal<ThyGuiderLocale> = injectLocale('guider');

    public guiderRef: ThyGuiderRef;

    public stepRef: ThyGuiderStepRef;

    public descriptionString: string;

    public descriptionTemplateRef: TemplateRef<any>;

    public currentStepIndex: number;

    constructor() {}

    ngOnInit() {
        this.setDescription(this.stepRef.step.data.description);
    }

    private setDescription(value: string | TemplateRef<any>) {
        if (helpers.isString(value)) {
            this.descriptionString = value as string;
        } else {
            this.descriptionTemplateRef = value as TemplateRef<any>;
        }
    }

    public jump() {
        this.guiderRef.end();
    }

    public prev() {
        this.guiderRef.previous();
    }

    public next() {
        this.guiderRef.next();
    }

    public end() {
        this.guiderRef.end();
    }

    public trackByFn(index: number, step: ThyGuiderStep) {
        return step.key || index;
    }
}

defaultGuiderPositionConfig.hintComponent = ThyGuiderHint;
