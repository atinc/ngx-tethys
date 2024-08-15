import { isDevMode } from '@angular/core';

const record: Record<string, boolean> = {};

export const PREFIX = '[TETHYS-CDK]:';

function notRecorded(...args: any[]): boolean {
    const asRecord = args.reduce((acc, c) => acc + c.toString(), '');

    if (record[asRecord]) {
        return false;
    } else {
        record[asRecord] = true;
        return true;
    }
}

function consoleCommonBehavior(consoleFunc: (...args: any) => void, ...args: any[]): void {
    if (isDevMode() && notRecorded(...args)) {
        consoleFunc(...args);
    }
}

// Warning should only be printed in dev mode and only once.
export const warn = (...args: any[]) => consoleCommonBehavior((...arg: any[]) => console.warn(PREFIX, ...arg), ...args);

export function createWarnDeprecation(prefix: string): (...args: any[]) => void {
    return (...args: any[]) => {
        const stack = new Error().stack;
        return consoleCommonBehavior(
            (...arg: any[]) => {
                console.warn(prefix, 'deprecated:', ...arg, stack);
            },
            ...args
        );
    };
}

export const warnDeprecation = createWarnDeprecation(PREFIX);

// Log should only be printed in dev mode.
export const log = (...args: any[]) => {
    if (isDevMode()) {
        console.log(PREFIX, ...args);
    }
};
