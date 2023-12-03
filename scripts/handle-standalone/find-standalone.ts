import * as path from 'path';
import * as fs from 'fs-extra';
import { Project, SyntaxKind } from 'ts-morph';

const allDeclarationNames: string[] = [];
const srcPath = path.resolve(__dirname, '../../src');

traverseFilesAndFindAllDeclarations(srcPath);

findStandaloneComponents();

function traverseFilesAndFindAllDeclarations(directoryPath: string) {
    const files = fs.readdirSync(directoryPath);
    files.forEach(fileName => {
        const filePath = path.resolve(directoryPath, fileName);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!['doc', 'examples', 'styles', 'test'].includes(fileName)) {
                traverseFilesAndFindAllDeclarations(filePath);
            }
        } else {
            if (
                !['.spec.ts', '.module.ts', '.scss', '.html', '.json', '.js', '.md'].includes(path.extname(fileName)) &&
                fileName !== 'index.ts'
            ) {
                const project = new Project();
                const sourceFile = project.addSourceFileAtPath(filePath);

                sourceFile.getClasses().forEach(classItem => {
                    allDeclarationNames.push(classItem.getName());
                });
                sourceFile.getInterfaces().forEach(interfaceItem => {
                    allDeclarationNames.push(interfaceItem.getName());
                });
                sourceFile.getTypeAliases().forEach(typeAliasItem => {
                    allDeclarationNames.push(typeAliasItem.getName());
                });
                sourceFile.getFunctions().forEach(functionItem => {
                    allDeclarationNames.push(functionItem.getName());
                });
                sourceFile.getVariableDeclarations().forEach(variableItem => {
                    allDeclarationNames.push(variableItem.getName());
                });
            }
        }
    });
}

function findStandaloneComponents() {
    const project = new Project();
    project.addSourceFilesAtPaths('src/**/*.ts');
    const sourceFiles = project.getSourceFiles();
    const conflictComponents = [];
    const renameableComponents = [];

    sourceFiles.forEach(sourceFile => {
        sourceFile.getClasses().forEach(classDeclaration => {
            const decorators = classDeclaration.getDecorators();

            decorators.forEach(decorator => {
                const arg = decorator.getArguments()[0];
                const declarationsProp = arg?.getDescendants();
                declarationsProp?.forEach(prop => {
                    if (prop.getKind() === SyntaxKind.PropertyAssignment) {
                        const componentName = classDeclaration.getName();
                        if (prop.getFullText().includes('standalone: true') && componentName.endsWith('Component')) {
                            if (allDeclarationNames.includes(componentName.replace(/Component$/, ''))) {
                                conflictComponents.push(componentName);
                            } else {
                                renameableComponents.push(componentName);
                            }
                        }
                    }
                });
            });
        });
    });

    const standaloneComponents = {
        renameableComponents,
        conflictComponents
    };
    fs.writeFileSync(path.join(__dirname, './standalones.json'), JSON.stringify(standaloneComponents));

    console.log(
        `All standalone components: ${
            standaloneComponents.renameableComponents.length + standaloneComponents.conflictComponents.length
        }\nRenameable components: ${standaloneComponents.renameableComponents.length}\nConflict components: ${
            standaloneComponents.conflictComponents.length
        }\nPlease see standalones.json for details`
    );
}
