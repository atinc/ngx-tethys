import { SimpleChanges } from '@angular/core';

export function hasLaterChange(changes: SimpleChanges): boolean {
    const hasChange = Object.keys(changes).find(key => {
        return changes[key] && !changes[key].isFirstChange();
    });
    return !!hasChange;
}
