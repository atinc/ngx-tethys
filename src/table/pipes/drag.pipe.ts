import { SafeAny } from 'ngx-tethys/types';

import { Pipe, PipeTransform } from '@angular/core';

/**
 * @private
 */
@Pipe({
    name: 'tableRowDragDisabled'
})
export class TableRowDragDisabledPipe implements PipeTransform {
    transform(item: SafeAny, dragDisabledPredicate: (item: SafeAny) => boolean): boolean {
        return dragDisabledPredicate(item);
    }
}
