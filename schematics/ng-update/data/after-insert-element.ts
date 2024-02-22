import { TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export interface AfterInsertElementUpgradeData {
    /**
     * The @Input() name to insert. When this attribute is encountered, an element will be inserted before the last child node in the current element, and the attribute will be removed from the current element and placed on the inserted element.
     *
     * 要替换的 @Input() 名称，遇到这个属性，会在当前元素内，最后一个子节点后插入元素，并把该属性从当前元素移除，放入到插入的元素上。
     *
     */
    replace: string;

    /**
     * The new element to insert.
     *
     * 要插入的元素。
     *
     */
    insert: string;

    /**
     * Controls which elements and attributes in which this insert is made.
     *
     * 控制要替换的元素和属性。
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

export const afterInsertElement: VersionChanges<AfterInsertElementUpgradeData> = {
    [TargetVersion.V17]: [
        {
            pr: '',
            changes: [
                {
                    replace: 'thyAfterIcon',
                    insert: '<thy-icon thyIconName=thyAfterIcon class="ml-1"></thy-icon>',
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: '[thyAfterIcon]',
                    insert: '<thy-icon [thyIconName]=[thyAfterIcon] class="ml-1"></thy-icon>',
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                }
            ]
        }
    ]
};
