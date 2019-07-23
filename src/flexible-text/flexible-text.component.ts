import {
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ElementRef,
    OnInit,
    AfterContentChecked,
    AfterContentInit,
    ViewContainerRef,
    OnDestroy
} from '@angular/core';
import { ThyTooltipPlacement } from '../tooltip';
import { isString } from '../util/helpers';
import { helpers } from '../util';
import { timer } from 'rxjs';
import { FlexibleTextBase } from './flexible-text.base';
import { TooltipService } from '../tooltip/tooltip.service';
import { UpdateHostClassService } from '../shared/update-host-class.service';

@Component({
    selector: 'thy-flexible-text,thyFlexibleText',
    templateUrl: './flexible-text.component.html',
    providers: [TooltipService, UpdateHostClassService]
})
export class ThyFlexibleTextComponent extends FlexibleTextBase implements OnInit, OnDestroy {
    constructor(
        private elementRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        public tooltipService: TooltipService,
        private updateHostClassService: UpdateHostClassService
    ) {
        super(tooltipService);
    }

    ngOnInit() {
        this.init(this.elementRef, this.viewContainerRef);
        this.updateHostClassService.initializeElement(this.elementRef);
        this.updateHostClassService.addClass('flexible-text-container');
    }

    ngOnDestroy() {
        this.tooltipService.detach();
    }
}
