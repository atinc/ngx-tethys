import { TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export interface InputValueUpgradeData {
    /**
     * The @Input() name and value to replace.
     *
     * 要替换的 @Input() 名称和值。
     *
     */
    replace: Record<string, string>;

    /**
     * The new name and value for the @Input().
     *
     * @Input() 的新名称和值。
     *
     */
    replaceWith: Record<string, string>;

    /**
     * Controls which elements and attributes in which this replacement is made.
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

export const inputValues: VersionChanges<InputValueUpgradeData> = {
    [TargetVersion.V15]: [
        {
            pr: '',
            changes: [
                {
                    replace: { thySize: 'default' },
                    replaceWith: { thySize: 'md' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thySize: 'xlg' },
                    replaceWith: { thySize: 'lg' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thySize: '' },
                    replaceWith: { thySize: 'md' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'default' },
                    replaceWith: { thyColor: 'default', thyTag: '' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'primary' },
                    replaceWith: { thyColor: 'primary', thyTag: '' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'success' },
                    replaceWith: { thyColor: 'success', thyTag: '' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'info' },
                    replaceWith: { thyColor: 'info', thyTag: '' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'warning' },
                    replaceWith: { thyColor: 'warning', thyTag: '' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'danger' },
                    replaceWith: { thyColor: 'danger', thyTag: '' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'emboss-default' },
                    replaceWith: { thyColor: 'default', thyTag: '', thyTheme: 'weak-fill' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'emboss-primary' },
                    replaceWith: { thyColor: 'primary', thyTag: '', thyTheme: 'weak-fill' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'emboss-warning' },
                    replaceWith: { thyColor: 'warning', thyTag: '', thyTheme: 'weak-fill' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'emboss-danger' },
                    replaceWith: { thyColor: 'danger', thyTag: '', thyTheme: 'weak-fill' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabel: 'outline' },
                    replaceWith: { thyTag: '', thyTheme: 'outline' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabelType: 'state' },
                    replaceWith: { thyShape: 'rectangle' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                },
                {
                    replace: { thyLabelType: 'pill' },
                    replaceWith: { thyShape: 'pill' },
                    limitedTo: {
                        attributes: ['thyLabel', '[thyLabel]']
                    }
                }
            ]
        }
    ]
};
