import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-table-tree-example',
    templateUrl: './tree.component.html'
})
export class ThyTableTreeExampleComponent implements OnInit {
    data = [
        {
            id: '1',
            name: 'Product R&D',
            children: [
                {
                    id: '1-1',
                    name: 'Project Team',
                    children: [
                        {
                            id: 1,
                            name: 'Peter',
                            age: 25,
                            job: 'Engineer',
                            address: 'Beijing Dong Sheng Technology',
                            children: [{ id: 5, name: 'Jill', age: 22, job: 'DevOps', address: 'Hangzhou' }]
                        },
                        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
                    ]
                }
            ]
        },
        {
            id: '2',
            name: 'Product Design',
            children: [{ id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' }]
        },
        { id: 4, name: 'Elyse', age: 31, job: 'Engineer', address: 'Yichuan Ningxia' }
    ];

    selections: { id: number; name: string }[] = [];

    ngOnInit() {}
}
