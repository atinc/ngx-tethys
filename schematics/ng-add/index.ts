import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { SchematicContext, Tree, chain, Rule, noop } from '@angular-devkit/schematics';
import { updateWorkspace } from '@schematics/angular/utility/workspace';
import { getWorkspace } from '@schematics/angular/utility/config';
import { JsonArray } from '@angular-devkit/core';
import { getProjectFromWorkspace } from '../utils';

interface NgAddSchema {
    project?: string;
    icon?: boolean;
}

function addStyleToWorkspace(projectName: string) {
    return (tree: Tree) => {
        return updateWorkspace(workspace => {
            const project = getProjectFromWorkspace(workspace, projectName);
            const stylesList = (project.targets.get('build').options.styles as any[]) || [];
            const filePath = `./node_modules/ngx-tethys/styles/main.bundle.scss`;
            if (!stylesList.includes(filePath)) {
                stylesList.push(filePath);
                project.targets.get('build').options.styles = stylesList;
            }
        });
    };
}

function addIconToWorkspace(projectName: string) {
    return updateWorkspace(workspace => {
        const project = getProjectFromWorkspace(workspace, projectName);
        const list: JsonArray = (project.targets.get('build').options.assets as any) || [];
        list.push({
            glob: '**/*',
            input: './node_modules/@tethys/icons',
            output: '/assets/icons/'
        });
        project.targets.get('build').options.assets = list;
    });
}

export function main(options: NgAddSchema = {}) {
    return async (host: Tree, ctx: SchematicContext) => {
        return chain([options.icon ? addIconToWorkspace(options.project) : noop(), addStyleToWorkspace(options.project)]);
    };
}
