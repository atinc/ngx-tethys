import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { ThyTreeModule } from '../tree.module';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyTreeComponent } from '../tree.component';
import { ThyTreeNodeData, ThyTreeIcons } from '../tree.class';
describe('ThyTreeComponent', () => {
    function configureThyTreeTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThyTreeModule],
            declarations: declarations
        }).compileComponents();
    }
    describe('basic tree', () => {
        let treeInstance;
        let treeElement: HTMLElement;
        let component;
        let fixture: ComponentFixture<TestBasicTreeComponent>;
        let treeComponent: ThyTreeComponent;
        beforeEach(async(() => {
            configureThyTreeTestingModule([TestBasicTreeComponent]);
            fixture = TestBed.createComponent(TestBasicTreeComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            treeInstance = fixture.debugElement.componentInstance;
            treeComponent = fixture.debugElement.componentInstance.tree;
            treeElement = fixture.debugElement.query(By.directive(ThyTreeComponent)).nativeElement;
        }));

        it('should create', () => {
            expect(component).toBeDefined();
        });

        it('test set tree size', () => {
            expect(treeElement.classList).toContain('thy-tree-sm');
        });

        it('test set tree type', () => {
            expect(treeElement.classList).toContain('thy-tree-especial');
        });

        it('test set title truncate', () => {
            expect(treeElement.querySelector('.thy-tree-node-title').classList).toContain('truncate');
        });

        it('test set data correctly', () => {
            expect(treeComponent.getRootNodes().length).toEqual(2);
        });

        it('test set data correctly', () => {
            expect(treeComponent.treeNodes.length).toEqual(2);
        });

        it('test public function', fakeAsync(() => {
            expect(treeComponent.getRootNodes().length).toEqual(2);
            expect(treeComponent.getExpandedNodes().length).toEqual(1);
            expect(treeComponent.getExpandedNodes()[0].title).toEqual('北京');
            treeComponent.selectTreeNode(treeComponent.getRootNodes()[1]);
            fixture.detectChanges();
            tick(100);
            expect(treeComponent.getSelectedNodes().length).toEqual(1);
            expect(treeComponent.getSelectedNode().title).toEqual('上海');
            treeComponent.addTreeNode({ key: '03', title: '深圳' }, null);
            treeComponent.addTreeNode({ key: '02001', title: '徐汇' }, treeComponent.getRootNodes()[1]);
            fixture.detectChanges();
            tick(100);
            expect(treeComponent.getRootNodes().length).toEqual(3);
            expect(treeComponent.getRootNodes()[1].children[0].title).toEqual('徐汇');
            treeComponent.deleteTreeNode(treeComponent.getRootNodes()[2]);
            expect(treeComponent.getRootNodes().length).toEqual(2);
        }));
    });

    describe('test tree property', () => {
        let treeElement: HTMLElement;
        let fixture: ComponentFixture<TestTreeCustomizedIconComponent>;
        beforeEach(async(() => {
            configureThyTreeTestingModule([TestTreeCustomizedIconComponent]);
            fixture = TestBed.createComponent(TestTreeCustomizedIconComponent);
            fixture.detectChanges();
            treeElement = fixture.debugElement.query(By.directive(ThyTreeComponent)).nativeElement;
        }));

        it('test customized icon', fakeAsync(() => {
            fixture.detectChanges();
            // customized template icon
            expect(treeElement.querySelectorAll('thy-icon.thy-icon-angle-double-down').length).toEqual(1);
            expect(treeElement.querySelectorAll('thy-icon.thy-icon-angle-double-up').length).toEqual(1);
        }));
    });
});

@Component({
    selector: 'test-basic-tree',
    template: `
        <thy-tree
            #tree
            [thyNodes]="treeNodes"
            [thyType]="'especial'"
            [thySize]="'sm'"
            [thyTitleTruncate]="true"
        ></thy-tree>
    `
})
class TestBasicTreeComponent {
    @ViewChild('tree') tree: ThyTreeComponent;

    public treeNodes: ThyTreeNodeData[] = [
        {
            key: '01',
            title: '北京',
            expanded: true,
            children: [
                {
                    key: '01001',
                    title: '海淀',
                    children: [
                        {
                            key: '010101',
                            title: '西二旗'
                        },
                        {
                            key: '010102',
                            title: '西三旗'
                        }
                    ]
                },
                {
                    key: '01002',
                    title: '昌平'
                }
            ]
        },
        {
            key: '02',
            title: '上海'
        }
    ];
}

@Component({
    template: `
        <thy-tree
            #tree
            [thyNodes]="treeNodes"
            [thyIcons]="treeIcons"
            [thySize]="'sm'"
            [thyTitleTruncate]="true"
        ></thy-tree>
    `
})
class TestTreeCustomizedIconComponent {
    @ViewChild('tree') treeComponent: ThyTreeComponent;
    public treeNodes: ThyTreeNodeData[] = [
        {
            key: '01',
            title: '北京',
            expanded: true,
            children: [
                {
                    key: '01001',
                    title: '海淀',
                    children: [
                        {
                            key: '010101',
                            title: '西二旗'
                        },
                        {
                            key: '010102',
                            title: '西三旗'
                        }
                    ]
                },
                {
                    key: '01002',
                    title: '昌平'
                }
            ]
        },
        {
            key: '02',
            title: '上海'
        }
    ];

    public treeIcons: ThyTreeIcons = {
        expand: 'angle-double-down',
        collapse: 'angle-double-up'
    };
}
