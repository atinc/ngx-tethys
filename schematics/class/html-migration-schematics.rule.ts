import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import {
    createUpdateFileService,
    getAngularJson,
    getWorkspaceAllTsconfig,
    creatTreeTsParseConfigHost,
    createTreeCompilerHost
} from '../utils';
import ts, { PropertyAssignment } from 'typescript';
import * as path from 'path';
import { ClassType } from '../types';
import { HtmlMigrationBase } from './html.base';
import { createCssSelectorForHtml, createCssSelectorForTs } from 'cyia-code-util';

export function HtmlMigrationSchematicsRule(migrationList: ClassType<HtmlMigrationBase>[]): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const updateFileService = createUpdateFileService(tree);
        const angularConfig = getAngularJson(tree);
        const tsConfigList = getWorkspaceAllTsconfig(angularConfig);
        const transformedList: string[] = [];
        const htmlPathList: string[] = [];
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
                    const instance = createCssSelectorForTs(sf);
                    const templateUrlNodeList: PropertyAssignment[] = instance.queryAll(
                        'CallExpression[expression=Component] PropertyAssignment[name=templateUrl]'
                    ) as any[];

                    templateUrlNodeList
                        .sort((a, b) => b.pos - a.pos)
                        .forEach(item => {
                            const htmlPath = path.join(path.dirname(sf.fileName), (item.initializer as ts.StringLiteral).text);
                            if (htmlPathList.includes(htmlPath)) {
                                return;
                            }
                            htmlPathList.push(htmlPath);
                            migrationList.forEach(Item => {
                                new Item(htmlPath, 0, createCssSelectorForHtml(tree.read(htmlPath).toString()), updateFileService).run();
                            });
                        });

                    const templateNodeList: PropertyAssignment[] = instance.queryAll(
                        'CallExpression[expression=Component] PropertyAssignment[name=template]'
                    ) as any[];

                    templateNodeList
                        .sort((a, b) => b.pos - a.pos)
                        .forEach(item => {
                            if (htmlPathList.includes(sf.fileName)) {
                                return;
                            }
                            let str = item.initializer.getText();
                            str = str.substr(1, str.length - 2);
                            migrationList.forEach(Item => {
                                new Item(
                                    sf.fileName,
                                    item.initializer.getStart() + 1,
                                    createCssSelectorForHtml(str),
                                    updateFileService
                                ).run();
                            });
                        });
                    htmlPathList.push(sf.fileName);
                    transformedList.push(sf.fileName);
                });
        }
        return tree;
    };
}
