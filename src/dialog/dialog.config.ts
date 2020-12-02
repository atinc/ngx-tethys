import { InjectionToken } from '@angular/core';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { ThyUpperOverlayConfig, ThyUpperOverlayPosition } from 'ngx-tethys/core';

/** Valid ARIA roles for a dialog element. */
export type ThyDialogRole = 'dialog' | 'alertdialog';

export enum ThyDialogSizes {
    lg = 'lg',
    supperLg = 'supper-lg',
    maxLg = 'max-lg',
    md = 'md',
    sm = 'sm',
    full = 'full'
}

/**
 * Configuration for opening a modal dialog with the ThyDialog service.
 */
export class ThyDialogConfig<TData = any> extends ThyUpperOverlayConfig<TData> {
    /** The ARIA role of the dialog element. */
    role?: ThyDialogRole = 'dialog';

    /** Position overrides. */
    position?: ThyUpperOverlayPosition;

    /** Dialog size md, lg, sm*/
    size?: ThyDialogSizes;

    /** Scroll strategy to be used for the dialog. */
    scrollStrategy?: ScrollStrategy;
}

/** Injection token that can be used to specify default dialog options. */
export const THY_DIALOG_DEFAULT_OPTIONS = new InjectionToken<ThyDialogConfig>('thy-dialog-default-options');

export const THY_DIALOG_DEFAULT_OPTIONS_PROVIDER = {
    provide: THY_DIALOG_DEFAULT_OPTIONS,
    useValue: {
        role: 'dialog',
        hasBackdrop: true,
        backdropClass: '',
        panelClass: '',
        backdropClosable: true,
        closeOnNavigation: true,
        autoFocus: true,
        restoreFocus: true
    }
};

export type ThyDialogFooterAlign = 'left' | 'right' | 'center';

export class ThyDialogLayoutConfig {
    footerAlign?: ThyDialogFooterAlign;
    footerDivided?: boolean;
}

export const THY_DIALOG_LAYOUT_CONFIG = new InjectionToken<ThyDialogLayoutConfig>('thy-dialog-layout-config');

export const THY_DIALOG_LAYOUT_CONFIG_PROVIDER = {
    provide: THY_DIALOG_LAYOUT_CONFIG,
    useValue: {
        footerAlign: 'left',
        footerDivided: false
    }
};
