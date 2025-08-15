import { JsonArray } from '@angular-devkit/core';
import { chain, noop, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { updateWorkspace } from '@schematics/angular/utility/workspace';

import { DEPENDENCIES } from '../dependencies';
import { addPackageToPackageJson, getPackageVersionFromPackageJson, getProjectFromWorkspace } from '../utils';
import { VERSION } from '../version';

const TETHYS_PKG_NAME = 'ngx-tethys';

interface NgAddSchema {
    project?: string;
    icon?: boolean;
    animations?: boolean;
}

function addStyleToWorkspace(projectName: string) {
    return (tree: Tree) => {
        return updateWorkspace(workspace => {
            const project = getProjectFromWorkspace(workspace as any, projectName);
            const stylesList = (project.targets.get('build')?.options?.styles as any[]) || [];
            const filePath = `./node_modules/ngx-tethys/styles/index.scss`;
            if (!stylesList.includes(filePath)) {
                stylesList.push(filePath);
                project.targets.get('build')!.options!.styles = stylesList;
            }
        });
    };
}

function addIconToWorkspace(projectName: string) {
    return updateWorkspace(workspace => {
        const project = getProjectFromWorkspace(workspace as any, projectName);
        const list: JsonArray = (project.targets.get('build')?.options?.assets as any) || [];
        list.push({
            glob: '**/*',
            input: './node_modules/@tethys/icons',
            output: '/assets/icons/'
        });
        project.targets.get('build')!.options!.assets = list;
    });
}

export function main(options: NgAddSchema = {}) {
    return async (host: Tree, context: SchematicContext) => {
        for (const pkg of Object.keys(DEPENDENCIES)) {
            addPackageToPackageJson(host, pkg, DEPENDENCIES[pkg]);
        }

        const tethysVersionRange = getPackageVersionFromPackageJson(host, TETHYS_PKG_NAME);
        // The CLI inserts `ngx-tethys` into the `package.json` before this schematic runs.
        // This means that we do not need to insert ngx-tethys into `package.json` files again.
        // In some cases though, it could happen that this schematic runs outside of the CLI `ng add`
        // command, or ngx-tethys is only listed a dev dependency. If that is the case, we insert a
        // version based on the current build version (substituted version placeholder).
        if (tethysVersionRange === null) {
            addPackageToPackageJson(host, TETHYS_PKG_NAME, VERSION);
        }

        context.addTask(new NodePackageInstallTask());
        const rules = [];
        if (options.icon) {
            rules.push(addIconToWorkspace(options.project!));
        }
        rules.push(addStyleToWorkspace(options.project!));
        return chain(rules as any);
    };
}
