import { SchematicContext, Tree, chain, Rule, noop } from '@angular-devkit/schematics';
import { updateWorkspace } from '@schematics/angular/utility/workspace';
import { JsonArray } from '@angular-devkit/core';

function addStyleToWorkspace(projectName: string) {
    return (tree: Tree) => {
        return updateWorkspace(workspace => {
            projectName = projectName || (workspace.extensions.defaultProject as string);
            const config = workspace.projects.get(projectName);
            const stylesList = (config.targets.get('build').options.styles as any[]) || [];
            const filePath = `./node_modules/ngx-tethys/styles/main.bundle.scss`;
            if (!stylesList.includes(filePath)) {
                stylesList.push(filePath);
                config.targets.get('build').options.styles = stylesList;
            }
        });
    };
}
function addIconToWorkspace(projectName: string) {
    return updateWorkspace(workspace => {
        projectName = projectName || (workspace.extensions.defaultProject as string);
        const config = workspace.projects.get(projectName);
        const list: JsonArray = (config.targets.get('build').options.assets as any) || [];
        list.push({
            glob: '**/*',
            input: './node_modules/@tethys/icons',
            output: '/assets/icons/'
        });
        config.targets.get('build').options.assets = list;
    });
}
export function main(option: { project?: string; icon?: boolean } = {}) {
    return async (tree: Tree, ctx: SchematicContext) => {
        return chain([option.icon ? addIconToWorkspace(option.project) : noop(), addStyleToWorkspace(option.project)]);
    };
}
