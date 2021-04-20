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

export function TsMigrationSchematicsRule(
    migrationList: ClassType<MigrationBase>[],
    compilerHostHook?: (compilerHost: ts.CompilerHost) => ts.CompilerHost
): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const updateFileService = createUpdateFileService(tree);
        const angularConfig = getAngularJson(tree);
        const tsConfigList = getWorkspaceAllTsconfig(angularConfig);
        for (let i = 0; i < migrationList.length; i++) {
            const Item = migrationList[i];
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
                const compilerHost = createTreeCompilerHost(parseContent.options, tree);

                const program = ts.createProgram({
                    host: compilerHostHook ? compilerHostHook(compilerHost) : compilerHost,
                    rootNames: parseContent.fileNames,
                    options: parseContent.options
                });
                program
                    .getSourceFiles()
                    .filter(sf => !sf.fileName.includes('node_modules'))
                    .filter(item => !transformedList.includes(item.fileName))
                    .forEach(sf => {
                        transformedList.push(sf.fileName);
                        new Item(sf, updateFileService, program).run();
                    });
            }
        }
        return tree;
    };
}
