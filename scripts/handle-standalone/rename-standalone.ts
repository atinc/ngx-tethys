import * as path from 'path';
import * as fs from 'fs-extra';
import { ts, Project } from 'ts-morph';

const allStandaloneComponents = require('./standalones.json');

(function globalRenameStandaloneComponents() {
    traverseFilesAndRenameStandalones(path.resolve(__dirname, '../../src'));
    // 最后记得执行 npm run prettier-all 命令进行代码格式化
})();

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
            if (ts.isIdentifier(node) && allStandaloneComponents.renameableComponents.includes(node.escapedText)) {
                const componentName = node.escapedText as string;
                const newComponentName = componentName.replace(/Component$/, '');
                return traversal.factory.createIdentifier(newComponentName);
            }
            return node;
        });
        sourceFile.saveSync();
    });
}
