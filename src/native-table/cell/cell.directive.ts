import { Directive, inject } from '@angular/core';

import { ThyNativeTableStyleService } from '../services/table-style.service';

/* eslint-disable @angular-eslint/directive-selector */
@Directive({
    selector: 'th, td',
    host: {
        '[class.thy-native-table-cell]': 'isInsideTable'
    }
})
export class ThyNativeTableCellDirective {
    isInsideTable = !!inject(ThyNativeTableStyleService, { optional: true });
}
