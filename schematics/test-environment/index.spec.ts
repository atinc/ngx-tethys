import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestEnvironment } from '../testing';

describe('Workspace Schematic', () => {
    let tree: UnitTestTree;
    beforeEach(async () => {
        tree = await createTestEnvironment();
    });
    it('should exist angular.json', () => {
        const file = tree.get('/angular.json');
        expect(file).toBeTruthy();
    });
    it('should not exist package.json', () => {
        const file = tree.get('/package.json');
        expect(file).toBeFalsy();
    });
    it('should exist /src/main.ts', () => {
        const file = tree.get('/src/main.ts');
        expect(file).toBeTruthy();
    });
    it('should exist /src/app/module1.ts', () => {
        const file = tree.get('/src/app/module1.ts');
        expect(file).toBeTruthy();
    });
    it('should have content from /src/app/module1.ts', () => {
        const buffer = tree.read('/src/app/module1.ts');
        expect(buffer.length).toBeTruthy();
    });
});
