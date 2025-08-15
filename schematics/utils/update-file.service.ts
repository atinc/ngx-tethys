import { Tree } from '@angular-devkit/schematics';
import { ContentChange, RemoveContentChange, ReplaceContentChange, UpdateContentChange } from '../types';
export class UpdateFileService {
    constructor(private tree: Tree) {}

    private update(filePath: string, change: UpdateContentChange) {
        try {
            const recorder = this.tree.beginUpdate(filePath);
            recorder.insertLeft(change.pos, change.content);
            this.tree.commitUpdate(recorder);
        } catch (error) {
            console.error('update fail', error);
        }
    }

    private remove(filePath: string, change: RemoveContentChange) {
        try {
            const recorder = this.tree.beginUpdate(filePath);
            recorder.remove(change.pos, change.length);
            this.tree.commitUpdate(recorder);
        } catch (error) {
            console.error('remove fail', error);
        }
    }

    private replace(filePath: string, change: ReplaceContentChange) {
        try {
            const recorder = this.tree.beginUpdate(filePath);
            recorder.remove(change.pos, change.length);
            recorder.insertRight(change.pos, change.content);
            this.tree.commitUpdate(recorder);
        } catch (error) {
            console.error('replace fail', error);
        }
    }

    change(filePath: string, changeList: ContentChange[]) {
        changeList
            .sort((a, b) => b.pos - a.pos)
            .forEach(change => {
                if (change instanceof UpdateContentChange) {
                    this.update(filePath, change);
                } else if (change instanceof ReplaceContentChange) {
                    this.replace(filePath, change);
                } else if (change instanceof RemoveContentChange) {
                    this.remove(filePath, change);
                }
            });
    }
}

export function createUpdateFileService(tree: Tree) {
    return new UpdateFileService(tree);
}
