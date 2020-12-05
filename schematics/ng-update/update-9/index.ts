import * as path from 'path';
import { SchematicContext, Tree } from '@angular-devkit/schematics';
import ts from 'typescript';
import {
    createTreeCompilerHost,
    createUpdateFileService,
    creatTreeTsParseConfigHost,
    getAngularJson,
    getWorkspaceAllTsconfig
} from '../../utils';
import { ImportEntryPointChangeMigration } from './migrations/import-entry-point-change';
import { ImportEntryPointTrimMigration } from './migrations/import-entry-point-trim';
import { ImportEntryPointClassifyMigration } from './migrations/import-entry-point-classify';

export default function main() {
    return (tree: Tree, ctx: SchematicContext) => {
        const updateFileService = createUpdateFileService(tree);
        const angularConfig = getAngularJson(tree);
        const tsConfigList = getWorkspaceAllTsconfig(angularConfig);
        const transformedList: string[] = [];
        for (const tsConfig of tsConfigList) {
            const readResult = ts.readConfigFile(tsConfig, e => {
                return tree.read(path.resolve('/', e)).toString();
            });
            if (readResult.error) {
                throw new Error(`read ${tsConfig} fail`);
            }
            const config = readResult.config;
            const basePath = path.dirname(path.join('/', tsConfig));
            const parseContent = ts.parseJsonConfigFileContent(config, creatTreeTsParseConfigHost(tree, basePath), basePath, {});
            const program = ts.createProgram({
                host: createTreeCompilerHost(parseContent.options, tree),
                rootNames: parseContent.fileNames,
                options: parseContent.options
            });
            program
                .getSourceFiles()
                .filter(sf => !sf.fileName.includes('node_modules'))
                .filter(item => !transformedList.includes(item.fileName))
                .forEach(sf => {
                    [ImportEntryPointChangeMigration, ImportEntryPointTrimMigration, ImportEntryPointClassifyMigration].forEach(item => {
                        const newSourceFile = ts.createSourceFile(
                            sf.fileName,
                            tree.read(sf.fileName).toString(),
                            ts.ScriptTarget.Latest,
                            true,
                            ts.ScriptKind.TS
                        );
                        new item(newSourceFile, updateFileService).run();
                    });
                    transformedList.push(sf.fileName);
                });
        }
        return tree;
    };
}
