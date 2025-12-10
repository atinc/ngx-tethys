import { ChangeDetectionStrategy, Component, input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';

import { ThyNativeTableLayout } from '../table.interface';
import { ThyNativeTableContentComponent } from './table-content.component';
import { SafeAny } from 'ngx-tethys/types';

@Component({
    selector: 'thy-native-table-inner-default',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="thy-native-table-content">
            <table
                thy-native-table-content
                [tableLayout]="tableLayout()"
                [listOfColWidth]="listOfColWidth()"
                [theadTemplate]="theadTemplate()"
                [contentTemplate]="contentTemplate()"
                [tfootTemplate]="tfootTemplate()"></table>
        </div>
    `,
    host: { class: 'thy-native-table-container' },
    imports: [ThyNativeTableContentComponent]
})
export class ThyNativeTableInnerDefaultComponent implements OnInit {
    readonly tableLayout = input<ThyNativeTableLayout>('auto');
    readonly listOfColWidth = input<ReadonlyArray<string | null>>([]);
    readonly theadTemplate = input<TemplateRef<SafeAny> | null>(null);
    readonly contentTemplate = input<TemplateRef<SafeAny> | null>(null);
    readonly tfootTemplate = input<TemplateRef<SafeAny> | null>(null);

    ngOnInit(): void {}
}
