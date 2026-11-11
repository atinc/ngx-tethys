import { Component, ElementRef, OnDestroy, OnInit, inject, viewChild } from '@angular/core';
import { ThyTooltipService, ThyTooltipRef } from 'ngx-tethys/tooltip';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-tooltip-manual-example',
    templateUrl: './manual.component.html',
    imports: [ThyButton]
})
export class ThyTooltipManualExampleComponent implements OnInit, OnDestroy {
    private tooltipService = inject(ThyTooltipService);

    tooltipHostElementRef = viewChild<ElementRef<HTMLElement>>('tooltipHost');

    private tooltipRef!: ThyTooltipRef;

    ngOnInit(): void {
        this.tooltipRef = this.tooltipService.create(this.tooltipHostElementRef()!, {
            placement: 'top'
        });
    }

    showTooltip() {
        this.tooltipRef.show('Hello, welcome to PingCode', 200);
    }

    hideTooltip() {
        this.tooltipRef.hide(200);
    }

    ngOnDestroy(): void {
        this.tooltipRef.dispose();
    }
}
