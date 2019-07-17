import { Component, Input, TemplateRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ThyTooltipPlacement } from '../tooltip';

@Component({
    selector: 'thy-flexible-text',
    templateUrl: './flexible-text.component.html'
})
export class ThyFlexibleTextComponent implements OnInit {
    tooltipContent: string | TemplateRef<HTMLElement>;

    placement: ThyTooltipPlacement = 'top';

    apply$: Subject<boolean> = new Subject<boolean>();

    @Input()
    set thyContent(value: string | TemplateRef<HTMLElement>) {
        this.tooltipContent = value;
        this.apply$.next();
    }

    @Input()
    set thyPlacement(value: ThyTooltipPlacement) {
        this.placement = value;
    }

    isOverflow = false;

    @ViewChild('textContainer')
    textContainer: ElementRef<any>;

    ngOnInit() {
        this.apply$.pipe(debounceTime(1000)).subscribe(() => {
            this.applyOverflow();
        });
        this.apply$.next();
    }

    applyOverflow() {
        const nativeElement = this.textContainer.nativeElement;
        if (nativeElement.clientWidth < nativeElement.scrollWidth) {
            this.isOverflow = true;
        }
    }
}
