import { debounceTime, MonoTypeOperatorFunction, SchedulerLike } from 'rxjs';

/**
 * for issue: https://github.com/angular/angular/issues/44351
 * only for test mock debounceTime
 */
export class DebounceTimeWrapper {
    public static debounceTime<T>(dueTime: number, scheduler?: SchedulerLike): MonoTypeOperatorFunction<T> {
        return debounceTime(dueTime, scheduler);
    }
}
