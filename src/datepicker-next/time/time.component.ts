import {
    Component,
    OnInit,
    HostBinding,
    ElementRef,
    ViewChild,
    OnDestroy,
    HostListener,
    InjectionToken,
    Injector
} from '@angular/core';
import {
    ComponentType,
    Overlay,
    OverlayRef,
    OverlayConfig,
    ScrollStrategy
} from '@angular/cdk/overlay';
import {
    TemplatePortal,
    ComponentPortal,
    PortalInjector
} from '@angular/cdk/portal';
import { ThyDatepickerNextTimeSimplyComponent } from './time-simply.component';
import {
    ThyDatepickerNextStore,
    datepickerNextActions
} from '../datepicker-next.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getFullTimeText } from '../util';
import { ThyDatepickerNextTimeAccurateComponent } from './time-accurate.component';
import { DatepickerNextTimeModeType } from '../datepicker-next.interface';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

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

    private _timeOverlayComponent: any = ThyDatepickerNextTimeSimplyComponent;

    private ngUnsubscribe$ = new Subject();

    constructor(
        private injector: Injector,
        private overlay: Overlay,
        public store: ThyDatepickerNextStore
    ) {}

    ngOnInit() {
        if (
            this.store.snapshot.viewFeatureConfig.timeComponentType ===
            DatepickerNextTimeModeType.accurate
        ) {
            this._timeOverlayComponent = ThyDatepickerNextTimeAccurateComponent;
        }

        this.store
            .select(ThyDatepickerNextStore.timeSelected)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(n => {
                this._combinationTimeText();
                this._detachTimePop();
                if (this.store.snapshot.timeSelected) {
                    this.behaviorEdit();
                }
            });
    }

    private _combinationTimeText() {
        const time = this.store.snapshot.timeSelected;
        if (time) {
            this.timeText = `${getFullTimeText(time.hour)}:${getFullTimeText(
                time.minute
            )}`;
        }
    }

    behaviorEdit() {
        this.isEdit = true;
    }

    behaviorPopTimeSelect() {
        this._combinationOverlayRef();
        if (!this._detachTimePop()) {
            this.overlayRef.attach(
                new ComponentPortal(
                    this._timeOverlayComponent,
                    null,
                    this.createInjector({
                        store: this.store
                    })
                )
            );
        }
    }

    createInjector(dataToPass: any): PortalInjector {
        const injectorTokens = new WeakMap();
        injectorTokens.set(CONTAINER_DATA, dataToPass);
        return new PortalInjector(this.injector, injectorTokens);
    }

    private _combinationOverlayRef() {
        if (this.overlayRef) {
            return;
        }
        const strategy = this.overlay
            .position()
            .connectedTo(
                this.timeInput,
                { originX: 'start', originY: 'bottom' },
                { overlayX: 'start', overlayY: 'top' }
            );
        this.overlayRef = this.overlay.create({
            positionStrategy: strategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
    }

    private _detachTimePop(): boolean {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
            return true;
        }
    }

    onTimeChange() {
        const time = this.timeText.trim();
        const reg = /^[0-9]{2}:[0-9]{2}$/;
        if (reg.test(time)) {
            const timeArray: any = time.split(':');
            this.store.dispatch(datepickerNextActions.changeTimeSelected, {
                hour: timeArray[0] * 1,
                minute: timeArray[1] * 1
            });
        } else if (time === '') {
            this.store.dispatch(datepickerNextActions.changeTimeSelected);
        }
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
