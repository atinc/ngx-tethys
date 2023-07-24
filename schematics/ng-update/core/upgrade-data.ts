import { Migration, UpgradeData, ValueOfChanges, VersionChanges, getChangesForTarget } from '@angular/cdk/schematics';
import { AfterInsertElementUpgradeData, InputNameRemovalUpgradeData, InputValueUpgradeData } from '../data';
import { BeforeInsertElementUpgradeData } from '../data/before-insert-element';
import { EntryPointUpgradeData } from '../data/entry-points';
import { OutputNameRemovalUpgradeData } from '../data/output-names-removal';

export interface TethysUpgradeData extends UpgradeData {
    inputNamesRemoval: VersionChanges<InputNameRemovalUpgradeData>;
    outputNamesRemoval: VersionChanges<OutputNameRemovalUpgradeData>;
    inputValues: VersionChanges<InputValueUpgradeData>;
    beforeInsertElement: VersionChanges<BeforeInsertElementUpgradeData>;
    afterInsertElement: VersionChanges<AfterInsertElementUpgradeData>;
    entryPoints: VersionChanges<EntryPointUpgradeData>;
}

export function getTethysVersionUpgradeData<T extends keyof TethysUpgradeData, U = ValueOfChanges<TethysUpgradeData[T]>>(
    migration: Migration<TethysUpgradeData>,
    dataName: T
): U[] {
    if (migration.targetVersion === null) {
        return [];
    }
    // Note that below we need to cast to `unknown` first TS doesn't infer the type of T correctly.
    return getChangesForTarget<U>(migration.targetVersion, migration.upgradeData[dataName] as unknown as VersionChanges<U>);
}
