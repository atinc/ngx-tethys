import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-drag-drop-with-handle-example',
    templateUrl: './with-handle.component.html',
    styleUrls: ['./with-handle.component.scss']
})
export class ThyDragDropWithHandleExampleComponent implements OnInit {
    nodes = [
        {
            key: '000001',
            title: '000001（不可拖拽）',
            draggable: false,
            handleDisabled: true
        },
        {
            key: '000002',
            title: '000002',
            draggable: true,
            handleDisabled: false
        },
        {
            key: '000003',
            title: '000003',
            draggable: true,
            handleDisabled: false
        },
        {
            key: '000004',
            title: '000004',
            draggable: true,
            handleDisabled: false
        }
    ];

    constructor() {}

    ngOnInit() {}
}
