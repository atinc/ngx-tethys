import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

import { createTestProject } from './test-project';

/** Create a base app used for testing. */
export async function createTestApp(runner: SchematicTestRunner, appOptions = {}, tree?: Tree): Promise<UnitTestTree> {
    return createTestProject(runner, 'application', appOptions, tree);
}
