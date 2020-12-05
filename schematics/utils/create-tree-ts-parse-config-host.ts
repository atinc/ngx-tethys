import * as path from 'path';
import { Tree } from '@angular-devkit/schematics';
import ts from 'typescript';

export class TreeTsParseConfigHost implements ts.ParseConfigFileHost {
    useCaseSensitiveFileNames = true;
    constructor(private tree: Tree, private dir: string) {}

    onUnRecoverableConfigFileDiagnostic = r => {
        console.warn(r);
    };

    fileExists(filePath: string) {
        return this.tree.exists(path.join(this.dir, filePath));
    }

    readFile(filePath: string) {
        return this.tree.read(path.join(this.dir, filePath)).toString();
    }

    readDirectory(filePath: string) {
        return this.tree.getDir(path.join(this.dir, filePath)).subfiles;
    }

    getCurrentDirectory() {
        return path.join('/', this.dir);
    }
}

export function creatTreeTsParseConfigHost(tree: Tree, dir: string) {
    return new TreeTsParseConfigHost(tree, dir);
}
