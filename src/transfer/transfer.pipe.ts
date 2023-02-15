import { Pipe, PipeTransform } from '@angular/core';
import { ThyTransferItem } from './transfer.interface';

@Pipe({ name: 'canHandleRightItemFn' })
export class ThyCanHandleRightItemFnPipe implements PipeTransform {
    transform(item: ThyTransferItem, fn: Function, selectData: ThyTransferItem[]): string {
        return fn(item, selectData);
    }
}
