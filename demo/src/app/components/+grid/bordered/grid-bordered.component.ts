import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-grid-bordered',
    templateUrl: './grid-bordered.component.html'
})
export class DemoGridBorderedComponent implements OnInit {
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

    public loadingDone = false;

    public size = 'default';

    ngOnInit() {
        setTimeout(() => {
            this.loadingDone = true;
        }, 3000);
    }

    onRadioSelectChange(event: any) {
        console.log(event);
    }

    setItem(row) {}

    deleteItem(row) {}
}
