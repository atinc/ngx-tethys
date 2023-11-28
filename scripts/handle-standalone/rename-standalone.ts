import * as path from 'path';
import * as fs from 'fs-extra';
import { ts, Project } from 'ts-morph';

const allStandaloneComponents = require('./renameable-standalone.json');

(function globalRenameStandaloneComponents() {
    traverseFilesAndRenameStandalone(path.resolve(__dirname, '../../src'));
})();

function traverseFilesAndRenameStandalone(directoryPath: string) {
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const filePath = path.resolve(directoryPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            traverseFilesAndRenameStandalone(filePath);
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
            if (ts.isIdentifier(node) && allStandaloneComponents.includes(node.escapedText)) {
                const componentName = node.escapedText as string;
                const newComponentName = componentName.replace(/Component$/, '');
                return traversal.factory.createIdentifier(newComponentName);
            }
            return node;
        });
        sourceFile.saveSync();
    });
}
