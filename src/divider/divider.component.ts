import {
    Component,
    HostBinding,
    Input,
    TemplateRef,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ThyDividerService } from './divider.service';

export type ThyDividerStyle = 'solid' | 'dashed';

export type ThyDividerTextDirection = 'left' | 'right' | 'center';

@Component({
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ThyDividerService],
    selector: 'thy-divider',
    template: `
        <div *ngIf="templateContent" class="thy-divider-inner-template">
            <ng-template [ngClass]="{ 'thy-divider-inner-template': true }" *ngTemplateOutlet="templateContent"></ng-template>
        </div>

        <span *ngIf="textContent" class="thy-divider-inner-text">{{ textContent }}</span>
    `,
    host: {
        '[class.thy-divider-horizontal]': `!thyVertical`,
        '[class.thy-divider-vertical]': `thyVertical`,
        '[class.thy-divider-with-content]': `textContent || templateContent`,
        '[class.thy-divider-with-text]': `textContent`,
        '[class.thy-divider-with-template]': `templateContent`,
        '[class.thy-divider-heavy]': `thyHeavy`,
        '[class.thy-divider-with-content-left]': `(textContent || templateContent) && thyTextDirection === 'left'`,
        '[class.thy-divider-with-content-right]': `(textContent || templateContent) && thyTextDirection === 'right'`,
        '[class.thy-divider-with-content-center]': `(textContent || templateContent) && thyTextDirection === 'center'`,
        '[class.thy-divider-solid]': `thyStyle === 'solid'`,
        '[class.thy-divider-dashed]': `thyStyle === 'dashed'`
    }
})
export class ThyDividerComponent implements OnInit, OnChanges, OnDestroy {
    templateContent: TemplateRef<HTMLElement>;

    textContent: string;

    private destroy$ = new Subject<void>();

    @HostBinding(`class.thy-divider`) thyDivider = true;

    @Input() set thyText(value: string | TemplateRef<HTMLElement>) {
        if (value instanceof TemplateRef) {
            this.templateContent = value;
        } else {
            this.textContent = value;
        }
    }

    @Input() thyVertical: boolean;

    @Input() thyStyle: ThyDividerStyle = 'solid';

    @Input() thyTextDirection: ThyDividerTextDirection = 'center';

    @Input() thyHeavy = false;

    constructor(private cdr: ChangeDetectorRef, private thyDividerService: ThyDividerService) {}

    ngOnInit() {
        this.thyDividerService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cdr.markForCheck();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.thyDividerService.markForCheck();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
