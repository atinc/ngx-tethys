import { Component, OnInit, OnChanges, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { ThyButton } from 'ngx-tethys/button';
import { ThyTag } from 'ngx-tethys/tag';
import { ThyViewOutletDirective } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-shared-view-outlet-example',
    templateUrl: './view-outlet.component.html',
    styleUrls: ['./view-outlet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyTag, ThyButton, ThyViewOutletDirective]
})
export class ThySharedViewOutletExampleComponent implements OnInit {
    counterComponent = ThyViewOutletCounterComponent;

    count = 1;

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-shared-view-outlet-counter',
    template: `
        <p>
            Count: <thy-tag thyColor="warning">{{ count }}</thy-tag
            ><span class="ml-4">From: {{ from }}</span>
        </p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyTag]
})
export class ThyViewOutletCounterComponent implements OnInit, OnChanges {
    @Input() count: number;

    @Input() from: string;

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        console.log(`ngOnChanges`, changes);
    }
}
