import { HostTree, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { createTestWorkspaceFactory } from '../../testing';

describe('ng-update v18 Schematic', () => {
    let tree: Tree;
    const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));

    let workspaceTree: UnitTestTree;

    beforeEach(async () => {
        const factory = createTestWorkspaceFactory(schematicRunner);
        await factory.create();
        await factory.addApplication({ name: 'update-18-test' });

        tree = factory.getTree();
    });

    it('should update to ng v18', async () => {
        workspaceTree = await schematicRunner.runSchematic('migration-v18', undefined, tree);
        const file = workspaceTree.get('package.json');
        expect(file.content.toString()).toBeTruthy();
        const packageJSON = JSON.parse(file.content.toString());
        expect(packageJSON['dependencies']['@angular/core']).toContain('^18.');
    });

    // describe('should provide schematics for v18', () => {
    //     let tree: Tree;
    //     const schematicRunner = new SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));

    //     const TEST_COMPONENT_PATH = '/projects/update17test/src/app/app.component.ts';
    //     const TEST_COMPONENT_CONTENT = `
    //             import { ThyButtonComponent } from 'ngx-tethys/button';
    //             import { ThyOptionComponent } from 'ngx-tethys/shared';
    //             import { ThySelectComponent, ThySelectCustomComponent } from 'ngx-tethys/select';
    //             import { DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent } from 'ngx-tethys/dialog';

    //             @Component({
    //                 selector: 'app-root',
    //                 standalone: true,
    //                 imports: [
    //                     CommonModule,
    //                     FormsModule,
    //                     RouterOutlet,
    //                     ThySelectComponent,
    //                     ThySelectCustomComponent,
    //                     ThyOptionComponent,
    //                     ThyButtonComponent,
    //                     DialogHeaderComponent,
    //                     DialogBodyComponent,
    //                     DialogFooterComponent
    //                 ],
    //                 templateUrl: './app.component.html',
    //                 styleUrls: ['./app.component.scss'],
    //             })
    //             export class AppComponent {}
    //     `;

    //     let workspaceTree: UnitTestTree;

    //     beforeEach(async () => {
    //         const hostTree = new HostTree();

    //         tree = await schematicRunner.runExternalSchematic(
    //             '@schematics/angular',
    //             'workspace',
    //             {
    //                 name: 'test-workspace',
    //                 version: '18.0.0',
    //                 newProjectRoot: 'projects'
    //             },
    //             hostTree
    //         );

    //         await schematicRunner.runExternalSchematic('@schematics/angular', 'application', { name: 'update17test' }, tree);

    //         tree.overwrite(TEST_COMPONENT_PATH, TEST_COMPONENT_CONTENT);

    //         workspaceTree = await schematicRunner.runSchematic('migration-v18', {}, tree);
    //     });

    //     it('should remove the Component suffix from standalone components', async () => {
    //         const result = workspaceTree.read(TEST_COMPONENT_PATH).toString();

    //         expect(result).not.toContain(`ThyOptionComponent`);
    //         expect(result).toContain('ThyOption');

    //         expect(result).not.toContain(`ThyButtonComponent`);
    //         expect(result).toContain('ThyButton');
    //     });

    //     it('should rename ThySelectCustomComponent to ThySelect', async () => {
    //         const result = workspaceTree.read(TEST_COMPONENT_PATH).toString();
    //         expect(result).not.toContain('ThySelectComponent');
    //         expect(result).toContain('ThyNativeSelect');
    //     });

    //     it('should rename ThySelectComponent to ThyNativeSelect', async () => {
    //         const result = workspaceTree.read(TEST_COMPONENT_PATH).toString();
    //         expect(result).not.toContain(`ThySelectCustomComponent`);
    //         expect(result).toContain('ThySelect');
    //     });

    //     it('should rename DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent to ThyDialogHeader, ThyDialogBody, ThyDialogFooter', async () => {
    //         const result = workspaceTree.read(TEST_COMPONENT_PATH).toString();
    //         expect(result).not.toContain(`DialogHeaderComponent`);
    //         expect(result).toContain('ThyDialogHeader');

    //         expect(result).not.toContain(`DialogBodyComponent`);
    //         expect(result).toContain('ThyDialogBody');

    //         expect(result).not.toContain(`DialogFooterComponent`);
    //         expect(result).toContain('ThyDialogFooter');
    //     });
    // });
});
