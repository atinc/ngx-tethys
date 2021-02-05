import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class ThyDividerService {
    check$ = new ReplaySubject(1);
    markForCheck(): void {
        this.check$.next();
    }
}
