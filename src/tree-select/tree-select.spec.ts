import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ApplicationRef, Component, DebugElement, Sanitizer, SecurityContext, ViewChild } from '@angular/core';
import { waitForAsync, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By, DomSanitizer } from '@angular/platform-browser';
import { dispatchMouseEvent } from 'ngx-tethys/testing';

import { UpdateHostClassService } from '../core';
import { ThyFormModule } from '../form';
import { ThyIconComponent, ThyIconRegistry } from '../icon';
import { searchTreeSelectData } from './examples/mock-data';
import { ThyTreeSelectModule } from './module';
import { ThyTreeSelectNode } from './tree-select.class';
import { filterTreeData, ThyTreeSelectComponent } from './tree-select.component';

function treeNodesExpands(nodes: ThyTreeSelectNode[]) {
    const arr = [] as ThyTreeSelectNode[];
    const filterExpandNodes = (node: ThyTreeSelectNode, total: ThyTreeSelectNode[]) => {
        if (node.expand) {
            total.push(node);
        }
        if (node.children.length > 0) {
            node.children.reduce((pre, current) => filterExpandNodes(current, pre), arr);
        }
        return total;
    };
    return nodes.reduce((pre, current) => filterExpandNodes(current, pre), arr);
}
@Component({
    selector: 'thy-basic-tree-select',
    template: `
        <div>
            <thy-tree-select
                #treeSelect
                [thyTreeNodes]="nodes"
                thyPrimaryKey="key"
                [thyMultiple]="multiple"
                [thyPlaceholder]="thyPlaceholder"
                thyShowKey="title"
                thyDisableNodeKey="disabled"
            ></thy-tree-select>
        </div>
    `
})
class BasicTreeSelectComponent {
    nodes: ThyTreeSelectNode[] = [
        {
            key: '01',
            title: 'root1',
            level: 0,
            icon: 'wtf wtf-drive-o',
            disabled: true,
            children: [
                {
                    key: '0101',
                    title: 'child1',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: [
                        {
                            key: '010101',
                            title: 'child11',
                            disabled: 'true',
                            level: 2,
                            icon: 'wtf wtf-file-text',
                            children: []
                        }
                    ]
                },
                {
                    key: '0102',
                    title: 'child2',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: []
                }
            ]
        },
        {
            key: '02',
            title: 'root2',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '03',
            title: 'root3',
            hidden: true,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '04',
            title: 'root4',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '05',
            title: 'root5',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '06',
            title: 'root6',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        }
    ];

    multiple = true;

    thyPlaceholder = '';

    cdkConnectOverlayWidth = 0;

    @ViewChild('treeSelect', { static: true })
    treeSelect: ThyTreeSelectComponent;
}

@Component({
    selector: 'thy-placeholder-tree-select',
    template: `
        <div>
            <thy-tree-select
                #treeSelect
                [thyTreeNodes]="nodes"
                thyPrimaryKey="key"
                [thyMultiple]="multiple"
                [thyPlaceholder]="thyPlaceholder"
                thyShowKey="title"
            ></thy-tree-select>
        </div>
    `
})
class PlaceHolderTreeSelectComponent {
    nodes: ThyTreeSelectNode[] = [
        {
            key: '01',
            title: 'root1',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: [
                {
                    key: '0101',
                    title: 'child1',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: [
                        {
                            key: '010101',
                            title: 'child11',
                            disabled: 'true',
                            level: 2,
                            icon: 'wtf wtf-file-text',
                            children: []
                        }
                    ]
                },
                {
                    key: '0102',
                    title: 'child2',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: []
                }
            ]
        },
        {
            key: '02',
            title: 'root2',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '03',
            title: 'root3',
            hidden: true,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '04',
            title: 'root4',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '05',
            title: 'root5',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '06',
            title: 'root6',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        }
    ];

    multiple = false;

    thyPlaceholder = 'this is a placeholder';

    @ViewChild('treeSelect', { static: true })
    treeSelect: ThyTreeSelectComponent;
}

@Component({
    selector: 'thy-ng-model-tree-select',
    template: `
        <div>
            <thy-tree-select
                #treeSelect
                [thyTreeNodes]="nodes"
                [(ngModel)]="objSelectedValue"
                thyPrimaryKey="key"
                thyShowKey="title"
                [thyMultiple]="multiple"
            ></thy-tree-select>
        </div>
    `
})
class NgModelTreeSelectComponent {
    nodes: ThyTreeSelectNode[] = [
        {
            key: '01',
            title: 'root1',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: [
                {
                    key: '0101',
                    title: 'child1',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: [
                        {
                            key: '010101',
                            title: 'child11',
                            disabled: 'true',
                            level: 2,
                            icon: 'wtf wtf-file-text',
                            children: []
                        }
                    ]
                },
                {
                    key: '0102',
                    title: 'child2',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: []
                }
            ]
        },
        {
            key: '02',
            title: 'root2',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '03',
            title: 'root3',
            hidden: true,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '04',
            title: 'root4',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '05',
            title: 'root5',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '06',
            title: 'root6',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        }
    ];
    objSelectedValue: ThyTreeSelectNode = null;

    multiple = false;

    @ViewChild('treeSelect', { static: true })
    treeSelect: ThyTreeSelectComponent;
}

@Component({
    selector: 'thy-search-tree-select',
    template: `
        <div>
            <thy-tree-select
                #treeSelect
                [thyTreeNodes]="nodes"
                thyPrimaryKey="key"
                thyShowKey="title"
                [(ngModel)]="selectedValue"
                [thyShowSearch]="treeShowSearch"
            ></thy-tree-select>
        </div>
    `
})
class SearchTreeSelectComponent {
    nodes = searchTreeSelectData;

    selectedValue = '';

    treeShowSearch = true;

    @ViewChild('treeSelect', { static: true })
    treeSelect: ThyTreeSelectComponent;
}

describe('ThyTreeSelect', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let platform: Platform;

    function configureThyCustomSelectTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThyFormModule, ThyTreeSelectModule, ReactiveFormsModule, FormsModule],
            declarations: declarations,
            providers: [
                UpdateHostClassService,
                {
                    provide: Sanitizer,
                    useValue: {
                        sanitize: (context: SecurityContext, html: string) => html
                    }
                }
            ]
        }).compileComponents();

        inject(
            [OverlayContainer, Platform, ThyIconRegistry, DomSanitizer],
            (oc: OverlayContainer, p: Platform, iconRegistry: ThyIconRegistry, domSanitizer: DomSanitizer) => {
                overlayContainer = oc;
                overlayContainerElement = oc.getContainerElement();
                platform = p;
                iconRegistry.addSvgIconLiteral(
                    'angle-down',
                    domSanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 16 16" id="angle-down" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z"/>
                </svg>`)
                );
            }
        )();
    }

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('core', () => {
        describe('basic class', () => {
            let treeSelectDebugElement: DebugElement;
            let treeSelectElement: HTMLElement;
            beforeEach(
                waitForAsync(() => {
                    configureThyCustomSelectTestingModule([BasicTreeSelectComponent]);
                    const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                    fixture.detectChanges();
                    treeSelectDebugElement = fixture.debugElement.query(By.directive(ThyTreeSelectComponent));
                    treeSelectElement = treeSelectDebugElement.nativeElement;
                })
            );

            it('should get correct class', () => {
                expect(treeSelectElement).toBeTruthy();
                expect(treeSelectElement.classList.contains(`thy-select-custom`)).toBeTruthy();
                expect(treeSelectElement.classList.contains(`thy-select`)).toBeTruthy();
            });

            it('should get correct icon class', () => {
                const iconDebugElement = treeSelectDebugElement.query(By.directive(ThyIconComponent));
                expect(iconDebugElement).toBeTruthy();
                const iconElement = iconDebugElement.nativeElement;
                expect(iconElement).toBeTruthy();
                expect(iconElement.classList.contains(`thy-icon`)).toBeTruthy();
                expect(iconElement.classList.contains(`thy-icon-angle-down`)).toBeTruthy();
            });

            it('should not run change detection on document clicks when the popup is closed', () => {
                const appRef = TestBed.inject(ApplicationRef);
                spyOn(appRef, 'tick');

                dispatchMouseEvent(treeSelectElement, 'click');
                expect(appRef.tick).not.toHaveBeenCalled();
            });

            it('should disabled worked', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();
                flush();
                const disabledNode = overlayContainerElement.querySelector('.thy-option-item');
                const extendBtn = fixture.debugElement.query(By.css('.thy-tree-select-option-icon')).nativeElement.children[0];
                expect(disabledNode.classList.contains(`disabled`)).toBeTruthy();
                expect(extendBtn.classList.contains('thy-icon-angle-right')).toBeTruthy();
                extendBtn.click();
                fixture.detectChanges();
                flush();
                expect(extendBtn.classList.contains('thy-icon-angle-down')).toBeTruthy();
            }));
            it('should get correct width when the window is resized', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                const event = new Event('resize');
                window.dispatchEvent(event);
                fixture.detectChanges();
                tick(100);
                const initDomWidth = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.getBoundingClientRect().width;
                fixture.componentInstance.cdkConnectOverlayWidth = initDomWidth;
                expect(initDomWidth).toEqual(document.body.clientWidth);
            }));
        });

        describe('with thyPlaceHolder', () => {
            beforeEach(
                waitForAsync(() => {
                    configureThyCustomSelectTestingModule([PlaceHolderTreeSelectComponent]);
                })
            );

            it('should show default placeholder', fakeAsync(() => {
                const fixture = TestBed.createComponent(PlaceHolderTreeSelectComponent);
                fixture.detectChanges();

                const treeSelectShowNode = fixture.debugElement.query(By.css('.text-placeholder')).nativeElement;
                expect(treeSelectShowNode.textContent).toContain('this is a placeholder');
            }));

            it('should show default placeholder with multiple', fakeAsync(() => {
                const fixture = TestBed.createComponent(PlaceHolderTreeSelectComponent);
                fixture.componentInstance.multiple = true;
                fixture.componentInstance.thyPlaceholder = 'this is a multiple placeholder';
                fixture.detectChanges();

                const placeholderWrapper = fixture.debugElement.query(By.css('.text-placeholder')).nativeElement;
                expect(placeholderWrapper.textContent).toContain('this is a multiple placeholder');
            }));
        });

        describe('select logic', () => {
            beforeEach(
                waitForAsync(() => {
                    configureThyCustomSelectTestingModule([BasicTreeSelectComponent]);
                })
            );

            it('should select item with multiple when item is clicked', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();
                flush();

                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');

                optionNodes[1].click();
                fixture.detectChanges();
                flush();

                const multipleWrapper = fixture.debugElement.query(By.css('.select-control-rendered')).nativeElement;
                expect(multipleWrapper.textContent).toContain('root2');
            }));
        });
    });

    describe('with ngModel', () => {
        beforeEach(waitForAsync(() => configureThyCustomSelectTestingModule([NgModelTreeSelectComponent])));

        it('show selected text when set ngModel ', fakeAsync(() => {
            const fixture = TestBed.createComponent(NgModelTreeSelectComponent);
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelect.selectedNode).toBe(null);
            const treeSelectShowNode = fixture.debugElement.query(By.css('.select-control-rendered')).nativeElement;

            fixture.componentInstance.objSelectedValue = fixture.componentInstance.nodes[fixture.componentInstance.nodes.length - 1];
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelect.selectedNode).toBe(
                fixture.componentInstance.nodes[fixture.componentInstance.nodes.length - 1]
            );
            expect(treeSelectShowNode.textContent).toContain('root6');
        }));

        it('show selected text with multiple when set ngModel ', fakeAsync(() => {
            const fixture = TestBed.createComponent(NgModelTreeSelectComponent);
            fixture.componentInstance.multiple = true;
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelect.selectedNodes.length).toBe(0);

            fixture.componentInstance.objSelectedValue = fixture.componentInstance.nodes.slice(
                fixture.componentInstance.nodes.length - 2,
                fixture.componentInstance.nodes.length
            );
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelect.selectedNodes.length).toBe(2);
            const multipleWrapper = fixture.debugElement.query(By.css('.select-control-rendered')).nativeElement;
            expect(multipleWrapper.textContent).toContain('root5');
            expect(multipleWrapper.textContent).toContain('root6');
        }));
    });

    describe('with search', () => {
        beforeEach(waitForAsync(() => configureThyCustomSelectTestingModule([SearchTreeSelectComponent])));
        it('show search input when set thyShowSearch is true', fakeAsync(() => {
            const fixture = TestBed.createComponent(SearchTreeSelectComponent);
            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.querySelector('input')).toBeTruthy();
        }));

        it('should show filter trees when has search text', fakeAsync(() => {
            const fixture = TestBed.createComponent(SearchTreeSelectComponent);
            const componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            const filterNodes = filterTreeData(componentInstance.treeSelect.originTreeNodes, '2-1', 'name');
            componentInstance.treeSelect.searchValue('2-1 ');
            componentInstance.treeSelect.treeNodes = filterNodes;
            fixture.detectChanges();
            expect(treeNodesExpands(componentInstance.treeSelect.treeNodes).length).toEqual(2);
        }));
    });
});
