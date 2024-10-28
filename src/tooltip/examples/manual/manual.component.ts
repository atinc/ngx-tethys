import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ThyTooltipService } from 'ngx-tethys/tooltip';
import { ThyTooltipRef } from 'ngx-tethys/tooltip';

@Component({
    selector: 'thy-tooltip-manual-example',
    templateUrl: './manual.component.html'
})
export class ThyTooltipManualExampleComponent implements OnInit, OnDestroy {
    private tooltipService = inject(ThyTooltipService);

    @ViewChild('tooltipHost', { read: ElementRef, static: true }) tooltipHostElementRef: ElementRef<HTMLElement>;

    private tooltipRef: ThyTooltipRef;

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

    ngOnDestroy(): void {
        // 销毁 tooltipRef
        this.tooltipRef.dispose();
    }
}
