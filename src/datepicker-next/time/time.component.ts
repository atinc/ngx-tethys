import { Component, OnInit, HostBinding, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import {
    ComponentType,
    Overlay,
    OverlayRef,
    OverlayConfig,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { ThyDatepickerNextTimeSimplyComponent } from './time-simply.component';
import { ThyDatepickerNextStore } from '../datepicker-next.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getFullTimeText } from '../util';



@Component({
    selector: 'thy-datepicker-next-time',
    templateUrl: 'time.component.html'
})

export class ThyDatepickerNextTimeComponent implements OnInit, OnDestroy {

    @HostBinding('class') stylesClass = 'time-container';
    @ViewChild('timeInput') timeInput: any;
    overlayRef: OverlayRef;
    isEdit = false;

    timeText: string;
    private ngUnsubscribe$ = new Subject();

    constructor(
        private overlay: Overlay,
        private elementRef: ElementRef,
        private store: ThyDatepickerNextStore,
    ) { }

    ngOnInit() {
        const strategy = this.overlay
            .position()
            .connectedTo(this.elementRef, { originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' });
        this.overlayRef = this.overlay.create({
            positionStrategy: strategy
        });

        this.store.select(ThyDatepickerNextStore.timeSelected)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(n => {
                this._combinationTimeText();
            });
    }

    private _combinationTimeText() {
        const time = this.store.snapshot.timeSelected;
        if (time) {
            this.timeText = `${getFullTimeText(time.hour)}:${getFullTimeText(time.minute)}`;
        }
    }

    behaviorEdit() {
        this.isEdit = true;
    }

    behaviorPopTimeSelect() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        } else {
            this.overlayRef.attach(new ComponentPortal(ThyDatepickerNextTimeSimplyComponent));
        }
    }

    behaviorOnDone() {

    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
