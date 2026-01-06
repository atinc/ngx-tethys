import { AfterViewInit, Component, DestroyRef, ElementRef, inject, input, output, QueryList, ViewChildren } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, combineLatest, of } from 'rxjs';
import { debounceTime, filter, map, startWith, switchMap } from 'rxjs/operators';

/* eslint-disable @angular-eslint/directive-selector */

@Component({
    selector: 'tr[thy-native-table-measure-row]',
    template: `
        @for (th of listOfMeasureColumnsKey(); track $index) {
            <td #tdElement class="thy-native-table-disable-td" style="padding: 0; border: 0; height: 0;"></td>
        }
    `,
    host: {
        class: 'thy-native-table-measure-now',
        '[style.height]': '0',
        '[style.border]': '0'
    }
})
export class ThyNativeTableTrMeasureComponent implements AfterViewInit {
    private destroyRef = inject(DestroyRef);

    readonly listOfMeasureColumnsKey = input<readonly string[]>([]);

    readonly listOfMeasureWidthChange = output<number[]>();

    @ViewChildren('tdElement') listOfTdElement!: QueryList<ElementRef>;

    ngAfterViewInit(): void {
        this.listOfTdElement.changes
            .pipe(startWith(this.listOfTdElement))
            .pipe(
                switchMap(
                    list =>
                        combineLatest(
                            list.toArray().map((item: ElementRef) =>
                                this.resizeObserver(item.nativeElement).pipe(
                                    filter((entries): entries is ResizeObserverEntry[] => entries !== null && entries.length > 0),
                                    map(entries => {
                                        const entry = entries[0];
                                        const { width } = entry.target.getBoundingClientRect();
                                        return Math.floor(width);
                                    })
                                )
                            )
                        ) as Observable<number[]>
                ),
                debounceTime(20),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(data => {
                this.listOfMeasureWidthChange.emit(data);
            });
    }

    private resizeObserver(element: HTMLElement): Observable<ResizeObserverEntry[] | null> {
        return typeof ResizeObserver === 'undefined' || !ResizeObserver
            ? of(null)
            : new Observable(observer => {
                  const resize = new ResizeObserver((entries: ResizeObserverEntry[]) => {
                      observer.next(entries);
                  });
                  resize.observe(element);
                  return () => {
                      resize.disconnect();
                  };
              });
    }
}
