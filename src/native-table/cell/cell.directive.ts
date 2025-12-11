import { Directive, inject } from '@angular/core';

import { ThyNativeTableStyleService } from '../services/table-style.service';

@Directive({
    selector: 'th, td',
    standalone: true,
    host: {
        '[class.thy-native-table-cell]': 'isInsideTable'
    }
})
export class ThyNativeTableCellDirective {
    isInsideTable = !!inject(ThyNativeTableStyleService, { optional: true });
}
