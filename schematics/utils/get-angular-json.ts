import { Tree } from '@angular-devkit/schematics';

export function getAngularJson(tree: Tree) {
    const file = tree.get('angular.json');
    return JSON.parse(file?.content?.toString()!);
}
