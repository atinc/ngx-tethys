import * as path from 'path';
import { Tree } from '@angular-devkit/schematics';
import ts from 'typescript';
import minimatch from 'minimatch';
export class TreeTsParseConfigHost implements ts.ParseConfigFileHost {
    useCaseSensitiveFileNames = true;
    constructor(private tree: Tree) {}

    onUnRecoverableConfigFileDiagnostic = (r: any) => {
        console.warn(r);
    };

    fileExists(filePath: string) {
        return this.tree.exists(path.join(filePath));
    }

    readFile(filePath: string) {
        return this.tree.read(path.join(filePath))?.toString();
    }

    readDirectory(
        rootDir: string,
        extensions: readonly string[],
        excludes: readonly string[] | undefined,
        includes: readonly string[],
        depth?: number
    ) {
        excludes = excludes?.map(exclude => path.join(rootDir, exclude));
        includes = includes.map(include => path.join(rootDir, include));
        return this._readDirectory(rootDir, extensions, excludes, includes, depth);
    }

    private _readDirectory(
        fileDir: string,
        extensions: readonly string[],
        excludes: readonly string[] | undefined,
        includes: readonly string[],
        depth?: number
    ): string[] {
        const dirEntry = this.tree.getDir(path.join(fileDir));
        const subdirs = dirEntry.subdirs.filter(dirPath => dirPath !== 'node_modules');
        return dirEntry.subfiles
            .map(file => path.join(fileDir, file))
            .filter(fileName => (extensions.length ? extensions.some(extension => fileName.endsWith(extension)) : true))
            .filter(item => (excludes?.length ? !excludes.some(exclude => minimatch(path.join(fileDir, item), exclude)) : true))
            .filter(item => (includes.length ? includes.some(include => minimatch(path.join(fileDir, item), include)) : false))
            .concat(
                ...(dirEntry.subdirs.length
                    ? subdirs.map(item => this._readDirectory(path.join(fileDir, item), extensions, excludes, includes, depth))
                    : [])
            );
    }

    getCurrentDirectory() {
        return path.join('/');
    }
}

export function creatTreeTsParseConfigHost(tree: Tree) {
    return new TreeTsParseConfigHost(tree);
}
