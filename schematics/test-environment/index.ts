import { strings } from '@angular-devkit/core';
import { Rule, apply, applyTemplates, filter, mergeWith, noop, url } from '@angular-devkit/schematics';

export default function(options: any): Rule {
    return mergeWith(
        apply(url('./files'), [
            applyTemplates({
                utils: strings,
                ...options
            })
        ])
    );
}
