import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, inject } from '@angular/core';

import { ThyNativeTableStyleService } from '../services/table-style.service';
import { ThyEmpty } from 'ngx-tethys/empty';

@Component({
    selector: 'tbody',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-content></ng-content>
        @if (showEmpty()) {
            <tr class="thy-table-empty">
                <td colspan="100%">
                    <thy-empty
                        [thyMessage]="emptyOptions()?.message"
                        [thyIconName]="emptyOptions()?.iconName"
                        [thySize]="emptyOptions()?.size"
                        [thyMarginTop]="emptyOptions()?.marginTop"
                        [thyTopAuto]="emptyOptions()?.topAuto"></thy-empty>
                </td>
            </tr>
        }
    `,
    host: {
        '[class.thy-native-table-tbody]': 'isInsideNativeTable'
    },
    imports: [ThyEmpty]
})
export class ThyNativeTableBodyComponent {
    private styleService = inject(ThyNativeTableStyleService, { optional: true });
    public isInsideNativeTable = !!this.styleService;

    public showEmpty = computed(() => this.styleService?.showEmpty() ?? false);
    public emptyOptions = computed(() => this.styleService?.emptyOptions() ?? null);

    constructor() {}
}
