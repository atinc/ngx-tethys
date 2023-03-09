import { chain, SchematicContext, Tree } from '@angular-devkit/schematics';

import { migrationSchematicsRule } from '../../class';

export default function main() {
    return (tree: Tree, ctx: SchematicContext) => {
        return chain([migrationSchematicsRule([])]);
    };
}
