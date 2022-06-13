import * as path from 'path';
import * as fs from 'fs-extra';
import ts, { PropertyAssignment, SourceFile } from 'typescript';
import { createCssSelectorForTs } from 'cyia-code-util';
import * as cp from 'child_process';
import { cwd } from 'process';
export class ExtractExamplesComponentScss {
    fileSet = new Set<string>();
    sourceMap = new Map<string, SourceFile>();
    scssFileSet: string[] = [];
    constructor() {}
    run() {
        this.getAllTypescriptFiles();
        this.parseToSourceFile();
        this.sourceMap.forEach((value, key) => {
            this.getScssPath(value);
        });
        return this.scssFileSet;
    }
    getAllTypescriptFiles() {
        this.getTypescriptFiles(path.resolve(__dirname, '../site/src/app/content/components/ngx-tethys'));
    }
    parseToSourceFile() {
        for (const file of this.fileSet) {
            this.sourceMap.set(file, ts.createSourceFile(file, fs.readFileSync(file).toString(), ts.ScriptTarget.Latest, true));
        }
    }
    getScssPath(sourceFile: SourceFile) {
        const selector = createCssSelectorForTs(sourceFile);

        const componentConfigNodeList = selector.queryAll(
            `Decorator CallExpression[expression=Component] ObjectLiteralExpression PropertyAssignment[name=styleUrls]`
        ) as PropertyAssignment[];
        componentConfigNodeList.forEach(node => {
            const list = node.initializer as ts.ArrayLiteralExpression;
            list.elements
                .map(item => item.getText().slice(1, item.getText().length - 1))
                .map(item => path.resolve(path.dirname(sourceFile.fileName), item))
                .forEach(item => {
                    this.scssFileSet.push(item);
                });
        });
    }
    getTypescriptFiles(dirName: string) {
        const result = fs.readdirSync(dirName);
        result
            .map(item => path.resolve(dirName, item))
            .forEach(item => {
                const stat = fs.statSync(item);
                if (stat.isDirectory()) {
                    this.getTypescriptFiles(item);
                } else {
                    this.fileSet.add(item);
                }
            });
    }
}
class ReplaceScss {
    readonly originPathPrefix = `/Users/chen/third-project/ngx-tethys/site/src/app/content/components/ngx-tethys/`;
    readonly newPathPrefix = (componentName: string) => `/Users/chen/third-project/ngx-tethys/src/${componentName}/`;
    constructor(private scssList: string[]) {}
    run() {
        this.scssList.forEach(item => {
            const result = new RegExp(`${this.originPathPrefix}([^\\/]+)\\/(.*)`).exec(item);
            const newName = path.resolve(this.newPathPrefix(result[1]), 'examples', result[2]);
            // fs.renameSync(item, newName);
            fs.copyFileSync(item, newName);
        });
    }
}
const instance = new ExtractExamplesComponentScss();
const scssList = instance.run();

const cpInstance = cp.exec(`sass-migrator module -I ./site/src/styles -d ./site/src/styles.scss ${scssList.join(' ')} 1>1.log 2>&1`);
cpInstance.on('message', message => {
    console.log('信息: ', message);
});
cpInstance.on('error', err => {
    console.log('异常:', err);
});

cpInstance.on('close', code => {
    if (!code) {
        const instance = new ReplaceScss(scssList);
        instance.run();
        console.log('转换完成');
    } else {
        console.log('有异常退出', code, '查看 ./1.log');
    }
});
