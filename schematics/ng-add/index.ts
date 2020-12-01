import { SchematicContext, Tree, chain, Rule } from '@angular-devkit/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { updateWorkspace } from '@schematics/angular/utility/workspace';
import { JsonArray } from '@angular-devkit/core';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

function addStyleToWorkspace() {
    return (tree: Tree) => {
        return updateWorkspace(workspace => {
            const defaultProject = workspace.extensions.defaultProject as string;
            const config = workspace.projects.get(defaultProject);
            const stylesList = (config.targets.get('build').options.styles as any[]) || [];
            const filePath = `./node_modules/ngx-tethys/styles/index.scss`;
            if (!stylesList.includes(filePath)) {
                stylesList.push(filePath);
                config.targets.get('build').options.styles = stylesList;
            }
        });
    };
}
function addDependenciesToPackageJson() {
    return (tree: Tree) => {
        ([
            {
                type: NodeDependencyType.Default,
                name: 'bootstrap',
                version: '~4.5.0'
            },
            {
                type: NodeDependencyType.Default,
                name: 'date-fns',
                version: '^2.14.0'
            },
            {
                type: NodeDependencyType.Default,
                name: '@tethys/icons',
                version: '^1.1.54'
            },
            {
                type: NodeDependencyType.Default,
                name: '@angular/cdk',
                version: '^9.2.4'
            }
        ] as NodeDependency[]).forEach(item => addPackageJsonDependency(tree, item));

        return tree;
    };
}
function installPackage() {
    return (tree: Tree, ctx: SchematicContext) => {
        ctx.addTask(new NodePackageInstallTask());
    };
}
export function main() {
    return async (tree: Tree, ctx: SchematicContext) => {
        const rule = updateWorkspace(workspace => {
            const defaultProject = workspace.extensions.defaultProject as string;
            const config = workspace.projects.get(defaultProject);
            const list: JsonArray = (config.targets.get('build').options.assets as any) || [];
            list.push({
                glob: '**/*',
                input: './node_modules/@tethys/icons/defs',
                output: '/assets/icons/defs/'
            });
            config.targets.get('build').options.assets = list;
        });
        return chain([rule, addDependenciesToPackageJson(), addStyleToWorkspace(), installPackage()]);
    };
}
