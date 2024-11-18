import { ThyAffixModule } from 'ngx-tethys/affix';
import { ThyAlertModule } from 'ngx-tethys/alert';
import { ThyAnchorModule } from 'ngx-tethys/anchor';
import { ThyArrowSwitcherModule } from 'ngx-tethys/arrow-switcher';
import { ThyAutocompleteModule } from 'ngx-tethys/autocomplete';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyBackTopModule } from 'ngx-tethys/back-top';
import { ThyBadgeModule } from 'ngx-tethys/badge';
import { ThyBreadcrumbModule } from 'ngx-tethys/breadcrumb';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCalendarModule } from 'ngx-tethys/calendar';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyCascaderModule } from 'ngx-tethys/cascader';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyCopyModule } from 'ngx-tethys/copy';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyDateRangeModule } from 'ngx-tethys/date-range';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThyDragDropModule } from 'ngx-tethys/drag-drop';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyFullscreenModule } from 'ngx-tethys/fullscreen';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThyGuiderModule } from 'ngx-tethys/guider';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThyLayoutModule } from 'ngx-tethys/layout';
// import { ThyKeySelectModule } from 'ngx-tethys/key-select';
import { ThyDotModule } from 'ngx-tethys/dot';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyMentionModule } from 'ngx-tethys/mention';
import { ThyMenuModule } from 'ngx-tethys/menu';
import { ThyMessageModule } from 'ngx-tethys/message';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyNotifyModule } from 'ngx-tethys/notify';
import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyProgressModule } from 'ngx-tethys/progress';
import { ThyPropertyOperationModule } from 'ngx-tethys/property-operation';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThyRateModule } from 'ngx-tethys/rate';
import { ThyResizableModule } from 'ngx-tethys/resizable';
import { ThyResultModule } from 'ngx-tethys/result';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThySelectCommonModule, ThySharedModule } from 'ngx-tethys/shared';
import { ThySkeletonModule } from 'ngx-tethys/skeleton';
import { ThySlideModule } from 'ngx-tethys/slide';
import { ThySliderModule } from 'ngx-tethys/slider';
import { ThyStatisticModule } from 'ngx-tethys/statistic';
import { ThyStepperModule } from 'ngx-tethys/stepper';
import { ThyStrengthModule } from 'ngx-tethys/strength';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyTableModule } from 'ngx-tethys/table';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { ThyTimelineModule } from 'ngx-tethys/timeline';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyTransferModule } from 'ngx-tethys/transfer';
import { ThyTreeModule } from 'ngx-tethys/tree';
import { ThyTreeSelectModule } from 'ngx-tethys/tree-select';
import { ThyUploadModule } from 'ngx-tethys/upload';
import { ThyVoteModule } from 'ngx-tethys/vote';
import { ThyWatermarkModule } from 'ngx-tethys/watermark';
import { ThyI18nService } from 'ngx-tethys/i18n';

import { Overlay } from '@angular/cdk/overlay';
import { DestroyRef, NgModule, inject } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { DocgeniTemplateModule, RootComponent } from '@docgeni/template';

import { ThyIconRegistry } from '../../../src/icon/icon-registry';
import { EXAMPLE_MODULES } from './content/example-modules';
import { DOCGENI_SITE_PROVIDERS } from './content/index';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThyTheme, ThyThemeStore } from 'ngx-tethys/core';
import { Observable, Subject } from 'rxjs';
import { MutationObserverFactory } from '@angular/cdk/observers';

function thyPopoverDefaultConfigFactory(overlay: Overlay) {
    return {
        scrollStrategy: overlay.scrollStrategies.close()
    };
}

const TETHYS_MODULES = [
    ThyLayoutModule,
    ThyButtonModule,
    ThyBackTopModule,
    ThyIconModule,
    ThyPopoverModule,
    ThyBadgeModule,
    ThyTableModule,
    ThyGridModule,
    ThyAvatarModule,
    ThyNavModule,
    ThyMenuModule,
    ThyPaginationModule,
    ThyNotifyModule,
    ThyMessageModule,
    ThyCardModule,
    ThyLoadingModule,
    ThyAlertModule,
    ThyTreeModule,
    ThyEmptyModule,
    ThySwitchModule,
    ThyTransferModule,
    ThyStrengthModule,
    ThyFormModule,
    ThyInputModule,
    ThyInputNumberModule,
    ThyDropdownModule,
    ThyCopyModule,
    ThyCheckboxModule,
    ThySelectModule,
    ThySlideModule,
    ThyRadioModule,
    ThySelectModule,
    ThyPropertyOperationModule,
    ThyUploadModule,
    ThyDateRangeModule,
    ThySharedModule,
    ThyListModule,
    ThyTreeSelectModule,
    ThyStepperModule,
    ThyCascaderModule,
    ThyDialogModule,
    ThyTooltipModule,
    ThyProgressModule,
    ThyBreadcrumbModule,
    ThyArrowSwitcherModule,
    ThyFlexibleTextModule,
    ThyDragDropModule,
    ThySelectCommonModule,
    ThySkeletonModule,
    ThyVoteModule,
    ThyResultModule,
    ThyMentionModule,
    ThyDatePickerModule,
    ThyTimelineModule,
    ThyDividerModule,
    ThyTimePickerModule,
    ThyStatisticModule,
    ThyAutocompleteModule,
    ThyAnchorModule,
    ThyAffixModule,
    ThySliderModule,
    ThyCalendarModule,
    ThyFullscreenModule,
    ThyGuiderModule,
    ThyResizableModule,
    ThyCollapseModule,
    ThyRateModule,
    ThyDotModule,
    ThyWatermarkModule
];

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DocgeniTemplateModule,
        RouterModule.forRoot([]),
        ...TETHYS_MODULES,
        ...EXAMPLE_MODULES
    ],
    providers: [...DOCGENI_SITE_PROVIDERS],
    bootstrap: [RootComponent]
})
export class AppModule {
    private themeObserver: MutationObserver;
    private readonly destroyRef = inject(DestroyRef);
    private thyThemeStore = inject(ThyThemeStore);

    constructor() {
        const iconRegistry = inject(ThyIconRegistry);
        const sanitizer = inject(DomSanitizer);
        const router = inject(Router);
        const destroyRef = inject(DestroyRef);
        const i18n = inject(ThyI18nService);

        const iconSvgUrl = `assets/icons/defs/svg/sprite.defs.svg`;
        iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl(iconSvgUrl));

        this.observeTheme()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {});

        router.events.pipe(takeUntilDestroyed(destroyRef)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                let localeId = router.url.split('/')[1];
                i18n.setLocale(localeId);
            }
        });
    }

    private observeTheme() {
        this.themeObserver?.disconnect();
        return new Observable(observe => {
            const stream = new Subject<MutationRecord[]>();
            this.themeObserver = new MutationObserverFactory().create(mutations => stream.next(mutations));
            if (this.themeObserver) {
                this.themeObserver.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['theme']
                });
            }
            stream.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(mutations => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'theme') {
                        const theme = (document.documentElement.getAttribute('theme') as ThyTheme) || ThyTheme.light;
                        this.thyThemeStore.setTheme(theme);
                    }
                }
            });
            observe.next(stream);
            return () => {
                this.themeObserver?.disconnect();
            };
        });
    }
}
