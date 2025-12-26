import { Tree } from '@angular-devkit/schematics';
import ts from 'typescript';

export function createTreeCompilerHost(options: ts.CompilerOptions, tree: Tree) {
    const host = ts.createCompilerHost(options, true);
    host.readFile = fileName => {
        return tree.get(fileName).content.toString();
    };
    host.readDirectory = fileName => {
        return tree.getDir(fileName).subfiles.map(item => item);
    };
    host.fileExists = fileName => {
        return tree.exists(fileName);
    };
    host.directoryExists = fileName => {
        if (fileName.includes('node_modules')) {
            return false;
        }
        try {
            const dir = tree.getDir(fileName);
            return !!dir.subdirs.length || !!dir.subfiles.length;
        } catch (error) {
            return false;
        }
    };
    host.getCurrentDirectory = () => '/';
    host.getCanonicalFileName = fileName => fileName;
    return host;
}
