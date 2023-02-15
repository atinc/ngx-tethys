import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThyTooltipService } from 'ngx-tethys/tooltip';
import { ThyTooltipRef } from 'ngx-tethys/tooltip';

@Component({
    selector: 'thy-tooltip-manual-example',
    templateUrl: './manual.component.html'
})
export class ThyTooltipManualExampleComponent implements OnInit {
    @ViewChild('tooltipHost', { static: true , read: ElementRef<HTMLElement>}) tooltipHostElementRef: ElementRef<HTMLElement>;

    private tooltipRef: ThyTooltipRef;

    constructor(private tooltipService: ThyTooltipService) {}

    ngOnInit(): void {
        this.tooltipRef = this.tooltipService.create(this.tooltipHostElementRef, {
            placement: 'top'
        });
    }

    showTooltip() {
        this.tooltipRef.show('Hello, welcome to PingCode', 200);
    }

    hideTooltip() {
        this.tooltipRef.hide(200);
    }
}
