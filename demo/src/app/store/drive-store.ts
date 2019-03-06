import { Store, Action } from '../../../../src/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';


export const DriveActions = {
    fetchFiles: 'fetchFiles',
    addFile: 'addFile',
    changeFold: 'changeFold'
};

export
    interface DriveState {
    currentFold: {
        id: string,
        name: string
    };
    parentFolds: {
        id: string,
        name: string
    }[];
    list: {
        type: string,
        id: string
        name: string
    }[];
}
export class DriveStore extends Store<DriveState> {

    constructor() {
        super({
            currentFold: null,
            parentFolds: [],
            list: []
        });
    }

    id = 0;
    getInitialState(): DriveState {
        return {
            currentFold: null,
            parentFolds: [],
            list: []
        };
    }

    @Action()
    fetchFiles() {
        const apiContent = {
            currentFold: {
                id: '1111',
                name: '企业网盘'
            },
            parentFolds: [{
                id: '1111',
                name: '企业网盘'
            }],
            list: [
                {
                    type: 'dic',
                    id: '222',
                    name: '文件夹a'
                },
                {
                    type: 'file',
                    id: '333',
                    name: 'yanjiang.txt'
                }
            ]
        };
        return of(apiContent)
            .pipe(tap((state) => {
                this.snapshot.currentFold = state.currentFold;
                this.snapshot.parentFolds = state.parentFolds;
                this.snapshot.list = state.list;
                // this.next();
            }));
    }

    @Action()
    addFile() {
        this.snapshot.list.push({
            name: '新增文件1',
            id: '' + ++this.id,
            type: 'file'
        });
        this.next(this.snapshot);
    }

    @Action()
    changeFold() {
        this.snapshot.parentFolds.push({
            id: '8888',
            name: '新的导航'
        });
        this.next(this.snapshot);
    }
}
