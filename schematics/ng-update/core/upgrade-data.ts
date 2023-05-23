import { Migration, UpgradeData, getChangesForTarget } from '@angular/cdk/schematics';
import { TethysVersionChanges } from '../core/target-version';
import { AfterInsertElementUpgradeData, InputNameRemovalUpgradeData, InputValueUpgradeData } from '../data';
import { BeforeInsertElementUpgradeData } from '../data/before-insert-element';
import { EntryPointUpgradeData } from '../data/entry-points';
import { OutputNameRemovalUpgradeData } from '../data/output-names-removal';

export interface TethysUpgradeData extends UpgradeData {
    inputNamesRemoval: TethysVersionChanges<InputNameRemovalUpgradeData>;
    outputNamesRemoval: TethysVersionChanges<OutputNameRemovalUpgradeData>;
    inputValues: TethysVersionChanges<InputValueUpgradeData>;
    beforeInsertElement: TethysVersionChanges<BeforeInsertElementUpgradeData>;
    afterInsertElement: TethysVersionChanges<AfterInsertElementUpgradeData>;
    entryPoints: TethysVersionChanges<EntryPointUpgradeData>;
}

export function getTethysVersionUpgradeData<T extends keyof TethysUpgradeData, U = TethysVersionChanges<TethysUpgradeData[T]>>(
    migration: Migration<TethysUpgradeData>,
    dataName: T
): U[] {
    if (migration.targetVersion === null) {
        return [];
    }
    // Note that below we need to cast to `unknown` first TS doesn't infer the type of T correctly.
    return getChangesForTarget<U>(migration.targetVersion, migration.upgradeData[dataName] as unknown as TethysVersionChanges<U>);
}
