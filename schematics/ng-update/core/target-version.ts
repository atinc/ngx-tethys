/**
 * Possible versions that can be automatically migrated by `ng update`.
 *
 * `ng update` 自动迁移的可能版本。
 *
 */
// Used in an `Object.keys` call below so it can't be `const enum`.

import { ReadableChange } from '@angular/cdk/schematics';

// tslint:disable-next-line:prefer-const-enum
export enum TethysTargetVersion {
    V16 = 'version 16'
}

/**
 * Returns all versions that are supported by "ng update". The versions are determined
 * based on the "TethysTargetVersion" enum.
 *
 * 返回 “ng update” 支持的所有版本。根据 “TethysTargetVersion” 枚举确定版本。
 *
 */
export function getAllVersionNames(): string[] {
    return Object.keys(TethysTargetVersion).filter(enumValue => {
        return typeof (TethysTargetVersion as Record<string, string | undefined>)[enumValue] === 'string';
    });
}

export type TethysVersionChanges<T> = {
    [target in TethysTargetVersion]?: ReadableChange<T>[];
};

export function getTethysChangesForTarget<T>(target: TethysTargetVersion, data: TethysVersionChanges<T>): T[] {
    if (!data) {
        const version = (TethysTargetVersion as Record<string, string>)[target];
        throw new Error(`No data could be found for target version: ${version}`);
    }

    return (data[target] || []).reduce((result, prData) => result.concat(prData.changes), [] as T[]);
}
