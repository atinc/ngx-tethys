import { SafeAny } from 'ngx-tethys/types';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'TableRowIsDraggable'
})
export class TableRowIsDraggablePipe implements PipeTransform {
    transform(item: SafeAny, dragDisabledPredicate: (item: SafeAny) => boolean): boolean {
        return dragDisabledPredicate(item);
    }
}
