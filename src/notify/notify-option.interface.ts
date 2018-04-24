import { ElementRef } from '@angular/core';

export interface ThyNotifyOption {

    id?: number;

    type?: 'blank' | 'success' | 'error' | 'warning' | 'info';

    title?: string;

    content?: string;

    detail?: string;

    html?: ElementRef;

    pauseOnHover?: boolean;

    duration?: number;

}
