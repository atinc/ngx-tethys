import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ThyNativeTableStyleService } from '../services/table-style.service';

@Component({
    selector: 'tbody',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: ` <ng-content></ng-content> `,
    host: {
        '[class.thy-native-table-tbody]': 'isInsideNativeTable'
    }
})
export class ThyNativeTableBodyComponent {
    private styleService = inject(ThyNativeTableStyleService, { optional: true });

    isInsideNativeTable = !!this.styleService;

    constructor() {}
}
