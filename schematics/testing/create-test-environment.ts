import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

export async function createTestEnvironment(options?) {
    const testRunner = new SchematicTestRunner('ngx-tethys', require.resolve('../collection.json'));
    const tree = await testRunner.runSchematicAsync('test-environment', options).toPromise();
    return tree;
}
