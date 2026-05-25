import { MutationObserverFactory } from '@angular/cdk/observers';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { ThyI18nService } from 'ngx-tethys/i18n';
import { ThyIconRegistry } from 'ngx-tethys/icon';
import { ThyTheme, ThyThemeStore } from 'ngx-tethys/core';
import { TinyDate } from 'ngx-tethys/util';
import { Observable, Subject } from 'rxjs';

export function initializeApp() {
    const iconRegistry = inject(ThyIconRegistry);
    const sanitizer = inject(DomSanitizer);
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);
    const i18n = inject(ThyI18nService);
    const thyThemeStore = inject(ThyThemeStore);

    const iconSvgUrl = `assets/icons/defs/svg/sprite.defs.svg`;
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl(iconSvgUrl));

    observeTheme(thyThemeStore, destroyRef).pipe(takeUntilDestroyed(destroyRef)).subscribe(() => {});

    router.events.pipe(takeUntilDestroyed(destroyRef)).subscribe(event => {
        if (event instanceof NavigationEnd) {
            const localeId = router.url.split('/')[1];
            i18n.setLocale(localeId);
            TinyDate.setDefaultLocale(localeId);
        }
    });
}

function observeTheme(thyThemeStore: ThyThemeStore, destroyRef: DestroyRef) {
    let themeObserver: MutationObserver | undefined;
    themeObserver?.disconnect();

    return new Observable(observe => {
        const stream = new Subject<MutationRecord[]>();
        themeObserver = new MutationObserverFactory().create(mutations => stream.next(mutations));
        if (themeObserver) {
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['theme']
            });
        }
        stream.pipe(takeUntilDestroyed(destroyRef)).subscribe(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'theme') {
                    const theme = (document.documentElement.getAttribute('theme') as ThyTheme) || ThyTheme.light;
                    thyThemeStore.setTheme(theme);
                }
            }
        });
        observe.next(stream);
        return () => {
            themeObserver?.disconnect();
        };
    });
}
