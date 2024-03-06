import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as fs from 'fs';
import * as path from 'path';

export class TestWorkspaceFactory {
    private hostTree = new HostTree();
    private tree: UnitTestTree;
    constructor(public runner: SchematicTestRunner) {}

    async create(options?: {
        name?: string;
        newProjectRoot?: string;
        version?: string;
        minimal?: boolean;
        strict?: boolean;
        packageManager?: 'npm' | 'yarn' | 'pnpm' | 'cnpm';
    }) {
        this.tree = await this.runner.runExternalSchematic(
            '@schematics/angular',
            'workspace',
            {
                name: 'test-workspace',
                version: '9.0.0',
                newProjectRoot: 'projects',
                ...options
            },
            this.hostTree
        );
        return this.tree;
    }

    async addApplication(options: { name: string; [name: string]: any }) {
        this.tree = await this.runner.runExternalSchematic('@schematics/angular', 'application', options, this.tree);
        return this.tree;
    }

    async addLibrary(options: { name: string; [name: string]: any }) {
        this.tree = await this.runner.runExternalSchematic('@schematics/angular', 'library', options, this.tree);
        return this.tree;
    }

    addNewFile(templatePath: string, content: string | Buffer) {
        this.hostTree.create(templatePath, content);
        return this.tree;
    }
    /**
     * @description 复制硬盘中的资源到虚拟的tree中,目前并没用用到,因为换了一种方案,但是好不容易写的就不删了
     * @param from 真实路径
     * @param to 虚拟路径
     */
    copyFolder(from: string, to: string, overwrite: boolean = false) {
        if (!fs.existsSync(from)) {
            throw new Error(`${from} folder not found`);
        }
        const list = fs.readdirSync(from);
        const toAddList = [{ parentFromPath: from, parentToPath: to, children: list }];
        while (toAddList.length) {
            const item = toAddList.pop();
            for (let i = 0; i < item.children.length; i++) {
                const element = item.children[i];
                const absolutePath = path.resolve(item.parentFromPath, element);
                const stat = fs.statSync(absolutePath);

                if (stat.isDirectory()) {
                    toAddList.push({
                        parentFromPath: absolutePath,
                        parentToPath: path.join(item.parentToPath, element),
                        children: fs.readdirSync(absolutePath)
                    });
                } else {
                    if (this.hostTree.exists(path.join(item.parentToPath, element))) {
                        if (overwrite) {
                            this.hostTree.overwrite(path.join(item.parentToPath, element), fs.readFileSync(absolutePath));
                        }
                        continue;
                    }
                    this.hostTree.create(path.join(item.parentToPath, element), fs.readFileSync(absolutePath));
                }
            }
        }
        return this.tree;
    }
    getTree() {
        return this.tree;
    }
}

export function createTestWorkspaceFactory(runner: SchematicTestRunner) {
    return new TestWorkspaceFactory(runner);
}
