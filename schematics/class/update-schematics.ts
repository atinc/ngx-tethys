import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { MigrationBase } from './base';
import {
    createUpdateFileService,
    getAngularJson,
    getWorkspaceAllTsconfig,
    creatTreeTsParseConfigHost,
    createTreeCompilerHost
} from '../utils';
import ts from 'typescript';
import * as path from 'path';
import { ClassType } from '../types';

export function MigrationSchematicsRule(migrationList: ClassType<MigrationBase>[]): Rule {
    return (tree: Tree, context: SchematicContext) => {
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
            const parseContent = ts.parseJsonConfigFileContent(config, creatTreeTsParseConfigHost(tree), basePath, {});
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
                    migrationList.forEach(item => {
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
