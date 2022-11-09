import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ThyTimelineService {
    check$ = new Subject<void>();
    markForCheck(): void {
        this.check$.next();
    }
}
