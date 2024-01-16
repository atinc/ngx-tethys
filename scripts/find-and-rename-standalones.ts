import * as path from 'path';
import * as fs from 'fs-extra';
import { ts, Project, SyntaxKind } from 'ts-morph';
import { execSync } from 'child_process';

const enum Operate {
    filter = 'filter',
    rename = 'rename',
    pretty = 'pretty'
}
const srcPath = path.resolve(__dirname, '../src');
const allDeclarationNames: string[] = [];

let results = {
    renameableComponents: [],
    conflictComponents: [],
    schematicsRules: []
};

function traverseFilesAndFindAllDeclarations(directoryPath: string) {
    const files = fs.readdirSync(directoryPath);
    files.forEach(fileName => {
        const filePath = path.resolve(directoryPath, fileName);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (!['doc', 'examples', 'styles', 'test', 'style'].includes(fileName)) {
                traverseFilesAndFindAllDeclarations(filePath);
            }
        } else {
            if (
                !['.scss', '.html', '.json', '.js', '.md'].includes(path.extname(fileName)) &&
                !path.basename(fileName).match(/\.spec\.ts$/) &&
                !path.basename(fileName).match(/\.module\.ts$/) &&
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

function findStandaloneComponents(allDeclarationNames) {
    const project = new Project();
    project.addSourceFilesAtPaths('src/**/*.ts');
    const sourceFiles = project.getSourceFiles();
    const conflictComponents = [];
    const renameableComponents = [];
    const schematicsRules = [];

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
                            if (allDeclarationNames.includes(componentName)) {
                                const newComponentName = componentName.replace(/Component$/, '');
                                if (allDeclarationNames.includes(newComponentName)) {
                                    conflictComponents.push(componentName);
                                } else {
                                    renameableComponents.push(componentName);

                                    schematicsRules.push({
                                        replace: componentName,
                                        replaceWith: newComponentName
                                    });
                                }
                            }
                        }
                    }
                });
            });
        });
    });

    const standaloneComponents = {
        renameableComponents,
        conflictComponents,
        schematicsRules
    };
    fs.writeFileSync(path.join(__dirname, './standalones.json'), JSON.stringify(standaloneComponents));
    execSync('npm run prettier-standalone');

    console.log(
        `All standalone components: ${
            standaloneComponents.renameableComponents.length + standaloneComponents.conflictComponents.length
        }\nRenameable components: ${standaloneComponents.renameableComponents.length}\nConflict components: ${
            standaloneComponents.conflictComponents.length
        }\nPlease see standalones.json for details`
    );
}

function globalRenameStandaloneComponents() {
    traverseFilesAndRenameStandalones(srcPath);
    console.log('Rename standalone components success!');
}

function traverseFilesAndRenameStandalones(directoryPath: string) {
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const filePath = path.resolve(directoryPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            traverseFilesAndRenameStandalones(filePath);
        } else if (file.endsWith('.ts')) {
            renameStandaloneComponents(filePath);
        }
    });
}

function renameStandaloneComponents(filePath: string) {
    const project = new Project();
    project.addSourceFilesAtPaths(filePath);
    const sourceFiles = project.getSourceFiles();
    sourceFiles.forEach(sourceFile => {
        sourceFile.transform(traversal => {
            const node = traversal.visitChildren();
            if (ts.isIdentifier(node) && results.renameableComponents.includes(node.escapedText)) {
                const componentName = node.escapedText as string;
                const newComponentName = componentName.replace(/Component$/, '');
                return traversal.factory.createIdentifier(newComponentName);
            }
            return node;
        });
        sourceFile.saveSync();
    });
}

function main(operate: Operate) {
    console.log('operate:', operate);
    if (operate === Operate.filter) {
        traverseFilesAndFindAllDeclarations(srcPath);
        findStandaloneComponents(allDeclarationNames);
    } else if (operate === Operate.rename) {
        results = require('./standalones.json');
        globalRenameStandaloneComponents();
    } else if (operate === Operate.pretty) {
        execSync('npm run prettier-all');
    } else {
        traverseFilesAndFindAllDeclarations(srcPath);
        findStandaloneComponents(allDeclarationNames);
        results = require('./standalones.json');
        globalRenameStandaloneComponents();
        execSync('npm run prettier-all');
    }
}

const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
main(args.operate);
