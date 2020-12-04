import { Tree } from '@angular-devkit/schematics';
import ts from 'typescript';

export class TreeTsParseConfigHost implements ts.ParseConfigFileHost {
    constructor(private tree: Tree) {}
    useCaseSensitiveFileNames = true;
    onUnRecoverableConfigFileDiagnostic = r => {
        console.warn(r);
    };
    fileExists(filePath) {
        return this.tree.exists(filePath);
    }
    readFile(path: string) {
        return this.tree.read(path).toString();
    }
    readDirectory(filePath) {
        return this.tree.getDir(filePath).subfiles;
    }
    getCurrentDirectory() {
        return '/';
    }
}

export function creatTreeTsParseConfigHost(tree: Tree) {
    return new TreeTsParseConfigHost(tree);
}
