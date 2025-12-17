import { InjectionToken } from '@angular/core';

export const META_KEY = '__THY_META__';
export const ROOT_STATE_TOKEN = new InjectionToken<any>('ROOT_STATE_TOKEN');
export const FEATURE_STATE_TOKEN = new InjectionToken<any>('FEATURE_STATE_TOKEN');

export interface StoreMetaInfo {
    actions: any;
    path: string | null;
    children: any[];
    instance: any;
}

export interface ActionResult {}

// export type Newable<T> = { new (...args: any[]): T };
