import { ElementDef } from "@angular/core/src/view";

export interface ThyNotifyOption {

    id?: number;

    type?: 'blank' | 'success' | 'error' | 'warning' | 'info';

    title?: string;

    content?: string;

    html?: ElementDef;

    pauseOnHover?: boolean;

    duration?: number;

}
