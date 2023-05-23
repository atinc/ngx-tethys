import { VersionChanges } from '@angular/cdk/schematics';
import { TethysTargetVersion } from '../core/target-version';

export interface OutputNameRemovalUpgradeData {
    /**
     * The @Output() name to remove.
     *
     * 要移除的 @Output() 名称。
     *
     */
    remove: string;
    /**
     * Controls which elements and attributes in which this removal is made.
     *
     * 控制要移除的元素和属性。
     *
     */
    limitedTo: {
        /**
         * Limit to elements with any of these element tags.
         *
         * 限制为任何具有这些元素标签的元素。
         *
         */
        elements?: string[];
        /**
         * Limit to elements with any of these attributes.
         *
         * 限制为任何带有这些属性的元素。
         *
         */
        attributes?: string[];
    };
}

export const outputNamesRemoval: VersionChanges<OutputNameRemovalUpgradeData> = {
    [TethysTargetVersion.V16]: [
        {
            pr: '',
            changes: [
                {
                    remove: 'thyOnRemove',
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                }
            ]
        }
    ]
};
