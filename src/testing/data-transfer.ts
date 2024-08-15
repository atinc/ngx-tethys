function removeFromArray<T>(array: T[], item: T) {
    const index = array.indexOf(item);

    if (index >= 0) {
        array.splice(index, 1);
    }
}

export class FakeDataTransferItem implements DataTransferItem {
    type: string;

    constructor(
        private entry: FileSystemEntry,
        public kind: string
    ) {}

    getAsFile(): File {
        return this.entry as unknown as File;
    }

    getAsString(callback: FunctionStringCallback): void {
        throw new Error('Method not implemented.');
    }

    webkitGetAsEntry() {
        return this.entry;
    }
}

export class FakeDataTransfer implements DataTransfer {
    dataByFormat = {};
    dropEffect: 'none' | 'copy' | 'link' | 'move' = 'none';
    effectAllowed: 'none' | 'copy' | 'copyLink' | 'copyMove' | 'link' | 'linkMove' | 'move' | 'all' | 'uninitialized' = 'all';
    files: FileList;
    types: string[] = [];
    items: DataTransferItemList;

    constructor(files?: File[], items?: DataTransferItem[]) {
        this.files = files as any;
        this.items = items as any;
    }

    clearData(dataFormat: string) {
        if (dataFormat) {
            delete this.dataByFormat[dataFormat];
            removeFromArray(this.types, dataFormat);
        } else {
            this.dataByFormat = {};
            this.types = [];
        }
    }

    getData = function (dataFormat: string) {
        return this.dataByFormat[dataFormat];
    };

    setData(dataFormat: string, data: string) {
        this.dataByFormat[dataFormat] = data;

        if (this.types.indexOf(dataFormat) < 0) {
            this.types.push(dataFormat);
        }

        return true;
    }

    setDragImage = function () {
        // don't do anything (the stub just makes sure there is no error thrown if someone tries to call the method)
    };
}
