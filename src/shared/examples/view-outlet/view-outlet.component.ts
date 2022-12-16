import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'thy-shared-view-outlet-example',
    templateUrl: './view-outlet.component.html',
    styleUrls: ['./view-outlet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
            Count: <thy-tag thyColor="warning">{{ count }}</thy-tag><span class="ml-4">From: {{ from }}</span>
        </p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyViewOutletCounterComponent {
    @Input() count: number;

    @Input() from: string;
}
