import { TethysTargetVersion, TethysVersionChanges } from '../core/target-version';

export interface MaterialCssSelectorData {
    /** The CSS selector to replace. */
    replace: string;
    /** The new CSS selector. */
    replaceWith: string;
    /**
     * Controls which file types in which this replacement is made. If omitted, it is made in all
     * files.
     */
    replaceIn?: {
        /** Replace this name in stylesheet files. */
        stylesheet?: boolean;
        /** Replace this name in HTML files. */
        html?: boolean;
        /** Replace this name in TypeScript strings. */
        tsStringLiterals?: boolean;
    };
}

export const cssSelectors: TethysVersionChanges<MaterialCssSelectorData> = {
    [TethysTargetVersion.V16]: [
        {
            pr: '',
            changes: [
                {
                    replace: '.thy-label',
                    replaceWith: '.thy-tag',
                    replaceIn: {
                        stylesheet: true,
                        html: false,
                        tsStringLiterals: true
                    }
                },
                {
                    replace: 'emboss',
                    replaceWith: 'weak-fill',
                    replaceIn: {
                        stylesheet: true,
                        html: false,
                        tsStringLiterals: true
                    }
                }
            ]
        }
    ]
};
