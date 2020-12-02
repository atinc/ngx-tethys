import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestProject } from './test-project';

export async function createTestApp(runner: SchematicTestRunner, libOptions: any = {}, tree?: Tree): Promise<UnitTestTree> {
    return createTestProject(runner, 'library', libOptions, tree);
}
