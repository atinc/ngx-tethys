import * as path from 'path';
import * as fs from 'fs-extra';
import { Project, SyntaxKind } from 'ts-morph';

const conflictClass = [
    'ThyFullscreen',
    'ThyGrid',
    'ThyTreeNode',
    'ThyCascaderOption',
    'ThyCascaderSearchOption',
    'ThyTableColumn',
    'ThyFlex',
    'ThyFlexItem',
    'ThyDropdownMenu'
];

(function findStandaloneComponents() {
    const project = new Project();
    project.addSourceFilesAtPaths('src/**/*.ts');
    const sourceFiles = project.getSourceFiles();
    const standaloneComponents = [];

    sourceFiles.forEach(sourceFile => {
        sourceFile.getClasses().forEach(classDeclaration => {
            const decorators = classDeclaration.getDecorators();

            decorators.forEach(decorator => {
                const arg = decorator.getArguments()[0];
                const declarationsProp = arg?.getDescendants();
                declarationsProp?.forEach(prop => {
                    if (prop.getKind() === SyntaxKind.PropertyAssignment) {
                        const componentName = classDeclaration.getName();
                        if (
                            prop.getFullText().includes('standalone: true') &&
                            componentName.endsWith('Component') &&
                            !conflictClass.includes(componentName.replace(/Component$/, ''))
                        ) {
                            standaloneComponents.push(componentName);
                        }
                    }
                });
            });
        });
    });

    fs.writeFileSync(path.join(__dirname, './renameable-standalone.json'), JSON.stringify(standaloneComponents));
})();
