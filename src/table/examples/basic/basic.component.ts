import { Component, OnInit } from '@angular/core';
import { ThyMultiSelectEvent, ThyTableRowEvent, ThyTableSize, ThyTableTheme } from 'ngx-tethys';

@Component({
    selector: 'thy-table-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyTableBasicExampleComponent implements OnInit {
    public cloneModel: any[];

    public size: ThyTableSize = 'default';

    public theme: ThyTableTheme = 'default';

    public model = [
        {
            id: '11',
            name: '张三',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 1
        },
        {
            id: '22',
            name: '李四',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 0
        },
        {
            id: '3',
            name: '王五',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 0
        },
        {
            id: '4',
            name: '张三2',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 0
        },
        {
            id: '5',
            name: '李四2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 0
        },
        {
            id: '6',
            name: '王五2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        },
        {
            id: '7',
            name: '张三3',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 1
        },
        {
            id: '8',
            name: '李四3',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        },
        {
            id: '9',
            name: '王五3',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        },
        {
            id: '10',
            name: '张三4',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 1
        },
        {
            id: '11',
            name: '李四4',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        },
        {
            id: '12',
            name: '王五4',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        }
    ];

    public selections: any = [];

    public pagination = {
        index: 1,
        size: 10,
        total: 12
    };

    ngOnInit() {
        this.cloneModel = this.model;
        this.model = this.cloneModel.slice(0, this.pagination.index * this.pagination.size);
        this.sortModel();
    }

    sortModel() {
        const favoriteItems = this.model.filter(item => {
            return item.is_favorite;
        });
        const unFavoriteItems = this.model.filter(item => {
            return !item.is_favorite;
        });
        this.model = [...favoriteItems, ...unFavoriteItems];
    }

    onMultiSelectChange(event: ThyMultiSelectEvent) {
        if (!this.selections.includes(event.row)) {
            this.selections.push(event.row);
        } else {
            this.selections = this.selections.filter((item: any) => item.id !== event.row.id);
        }
        this.selections = [...this.selections];
        console.log(event);
        console.log(this.selections);
    }

    onRadioSelectChange(event: any) {
        console.log(event);
    }

    onPageChange(event: any) {
        console.log(event);
        this.model = this.cloneModel.slice((event.page - 1) * this.pagination.size, event.page * this.pagination.size);
    }

    onSwitchChange(event: any) {
        setTimeout(() => {
            event.row.checked = false;
            event.refresh();
        }, 2000);
    }

    onDraggableUpdate(event: any) {
        console.log(event);
    }

    onContextMenu(event: any) {
        console.log(event);
        alert('右键');
    }

    onRowClick(event: ThyTableRowEvent) {
        console.log(event);
    }

    onFavorite(row: any) {
        row.is_favorite = !!row.is_favorite ? 0 : 1;
        this.sortModel();
    }

    deleteItem(row: any) {
        const index = this.model.indexOf(row);
        this.model.splice(index, 1);
    }
}
