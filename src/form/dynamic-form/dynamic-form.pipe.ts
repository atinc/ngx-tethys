import { Pipe, PipeTransform } from '@angular/core';

/**
 * 将 12 列 `col` 映射为 24 列栅格。未传时按整行 12 处理。
 * @private
 */
@Pipe({ name: 'thyDynamicFormSpan' })
export class ThyDynamicFormSpanPipe implements PipeTransform {
    transform(col: number | null | undefined): number {
        return (col ?? 12) * 2;
    }
}
