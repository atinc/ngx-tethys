import { TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export interface EntryPointUpgradeData {
    /**
     * The Class name to replace.
     *
     * 要替换的入口名。
     *
     */
    replace: string;
    /**
     * The new name for the Class.
     *
     * 入口的新名称。
     *
     */
    replaceWith: string;
}

export const entryPoints: VersionChanges<EntryPointUpgradeData> = {
    [TargetVersion.V16]: [
        {
            pr: '',
            changes: [
                {
                    replace: 'ngx-tethys/label',
                    replaceWith: 'ngx-tethys/tag'
                },
                {
                    replace: 'ngx-tethys/action-menu',
                    replaceWith: 'ngx-tethys/dropdown'
                }
            ]
        }
    ]
};
