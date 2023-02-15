import { Pipe, PipeTransform } from '@angular/core';
import { ThyTransferItem } from './transfer.interface';

@Pipe({ name: 'thyCanUncheckRightItemFn' })
export class ThyCanHandleRightItemFnPipe implements PipeTransform {
    transform(item: ThyTransferItem, fn: Function, selectData: ThyTransferItem[]): string {
        console.log(fn(item, selectData), item);
        return fn(item, selectData);
    }
}
