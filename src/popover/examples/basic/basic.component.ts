import { ThyPopover, ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody } from 'ngx-tethys/popover';
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThyPopoverBasicContentComponent } from './popover-content.component';
import { ThyButton } from 'ngx-tethys/button';
import { NgStyle } from '@angular/common';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-popover-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyButton, ThyPopoverDirective, ThyPopoverHeader, ThyPopoverBody, NgStyle, ThyIcon]
})
export class ThyPopoverBasicExampleComponent implements OnInit {
    private thyPopover = inject(ThyPopover);

    content = ThyPopoverBasicContentComponent;

    ngOnInit(): void {}

    close() {
        this.thyPopover.close();
    }
}
