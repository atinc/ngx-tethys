
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, ViewChild } from '@angular/core';
import { ThySelectionListChange, ThySelectionListComponent, } from '../../../../../src/list';

@Component({
    selector: 'demo-list-section',
    templateUrl: './list-section.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DemoListComponent {

    @ViewChild(ThySelectionListComponent) selectionList: ThySelectionListComponent;

    searchText = '';

    allItems = [
        {
            id: 1,
            name: 'Item 1'
        },
        {
            id: 2,
            name: 'Item 2'
        },
        {
            id: 3,
            name: 'Item 3'
        },
        {
            id: 4,
            name: 'Item 4'
        },
        {
            id: 5,
            name: 'Item 5'
        },
        {
            id: 6,
            name: 'Item 6'
        },
        {
            id: 7,
            name: 'Item 7'
        },
        {
            id: 1,
            name: 'Item 1 Repeat'
        },
    ];

    items: any[];

    selectionModel = {
        multiple: true,
        stopKeydownEvent: false,
        selectAll: false,
        defaultValues: [2, 3],
        objectValues: []
    };

    public apiOptionParameters = [
        {
            property: 'thyValue',
            description: '选项的 Value，可以是普通的 ID，也可以是对象，与 thy-selection-list 的 ngModel 和 thyUniqueKey 配合使用',
            type: 'any',
            default: 'null'
        }
    ];

    public apiParameters = [
        {
            property: 'thyBindKeyEventContainer',
            description: '绑定键盘事件的容器',
            type: 'Element | ElementRef | string',
            default: 'thy-selection-list 组件绑定的元素'
        },
        {
            property: 'thyScrollContainer',
            description: '出现滚动条的容器',
            type: 'Element | ElementRef | string',
            default: 'thy-selection-list 组件绑定的元素'
        },
        {
            property: 'thyBeforeKeydown',
            description: '键盘事件触发 Before 调用，如果返回 false 则停止继续执行',
            type: 'Function',
            default: 'null'
        },
        {
            property: 'thyMultiple',
            description: '是否为多选',
            type: 'Boolean',
            default: 'true'
        },
        {
            property: 'thyUniqueKey',
            description: 'Option Value 唯一的 Key，用于存储哪些选择被选中的唯一值，只有 Option 的 thyValue 是对象的时才可以传入该选项',
            type: 'String',
            default: 'null'
        },
        {
            property: 'thyCompareWith',
            description: '比较2个选项的 Value 是否相同',
            type: 'Function',
            default: 'null'
        },
        {
            property: 'thySelectionChange',
            description: '选择 Options 的 Change 事件，',
            type: 'Function',
            default: 'null'
        },
        {
            property: 'ngModel',
            description: '默认选择项，选择项可以是对象，也可以是唯一的 ID，一般和 Option 的 thyValue 对应',
            type: 'any　| any[]',
            default: 'null'
        }
    ];

    thyBeforeKeydown = () => {
        return !this.selectionModel.stopKeydownEvent;
    }

    constructor() {
        setTimeout(() => {
            this.items = this.allItems;
            this.selectionModel.objectValues = [this.items[0]];
        }, 1000);
    }

    selectionChange(event: ThySelectionListChange) {
        console.log(event);
    }

    toggleSelectAll() {
        if (this.selectionModel.selectAll) {
            this.selectionList.selectAll();
        } else {
            this.selectionList.deselectAll();
        }
    }

    enterSearch() {
        this.items = this.allItems.filter((item) => {
            return !this.searchText || item.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
    }

    searchChange() {
        if (this.searchText) {
            this.selectionList.clearActiveItem();
        }
    }

    clearSearch() {
        this.items = this.allItems;
    }

}
