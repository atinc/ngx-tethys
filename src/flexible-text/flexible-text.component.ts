import {
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ElementRef,
    OnInit,
    AfterContentChecked,
    AfterContentInit
} from '@angular/core';
import { ThyTooltipPlacement } from '../tooltip';
import { isString } from '../util/helpers';
import { helpers } from '../util';
import { timer } from 'rxjs';

@Component({
    selector: 'thy-flexible-text,thyFlexibleText',
    templateUrl: './flexible-text.component.html'
})
export class ThyFlexibleTextComponent implements OnInit {
    tooltipContent: string | TemplateRef<HTMLElement>;

    placement: ThyTooltipPlacement = 'top';

    isTemplateRef = false;

    isOverflow = false;

    @Input()
    set thyContent(value: string | TemplateRef<HTMLElement>) {
        this.tooltipContent = value;
        this.isTemplateRef = value instanceof TemplateRef;
        this.applyOverflow();
    }

    @Input()
    set thyPlacement(value: ThyTooltipPlacement) {
        this.placement = value;
    }

    @ViewChild('textContainer')
    textContainer: ElementRef<any>;

    constructor() {}

    ngOnInit() {
        this.applyOverflow();
    }

    applyOverflow() {
        timer().subscribe(() => {
            if (this.isTemplateRef) {
                this.isOverflow = true;
            } else {
                const nativeElement = this.textContainer.nativeElement;
                if (nativeElement.clientWidth < nativeElement.scrollWidth) {
                    this.isOverflow = true;
                } else {
                    this.isOverflow = false;
                }
            }
        });
    }
}
