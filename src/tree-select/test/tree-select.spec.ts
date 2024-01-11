import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { animationFrameScheduler, of } from 'rxjs';

import { OverlayContainer } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ApplicationRef, Component, DebugElement, OnInit, Sanitizer, SecurityContext, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By, DomSanitizer } from '@angular/platform-browser';

import { ThyFormModule } from '../../form';
import { ThyIconComponent, ThyIconRegistry } from '../../icon';
import { bigTreeNodes, searchTreeSelectData } from '../examples/mock-data';
import { ThyTreeSelectModule } from '../module';
import { ThyTreeSelectNode } from '../tree-select.class';
import { filterTreeData, ThyTreeSelectComponent } from '../tree-select.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
                [thyDisable]="disable"
                [thyAllowClear]="allowClear"
                [thyAsyncNode]="asyncNode"
                [thyGetNodeChildren]="fetchNodeChildren"
                [thyHiddenNodeKey]="hiddenKey"
                [thyDisableNodeKey]="disableKey"
                (thyExpandStatusChange)="expandChange($event)"></thy-tree-select>
        </div>
    `
})
class BasicTreeSelectComponent {
    @ViewChild(ThyTreeSelectComponent, { static: false }) treeComponent: ThyTreeSelectComponent;

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

    disable = false;

    allowClear = true;

    cdkConnectOverlayWidth = 0;

    expandTreeSelectOptions = false;

    @ViewChild('treeSelect', { static: true })
    treeSelect: ThyTreeSelectComponent;

    asyncNode = true;

    hiddenKey = 'hidden';

    disableKey = 'disabled';

    expandStatus = false;

    fetchNodeChildren(node: ThyTreeSelectNode) {
        return of([
            {
                _id: '010101',
                name: 'child-1',
                level: 2,
                icon: 'flag',
                children: []
            },
            {
                _id: '010102',
                name: 'child-2',
                level: 2,
                icon: 'flag',
                children: []
            }
        ]);
    }

    expandChange(status: boolean) {
        this.expandStatus = status;
    }
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
                thyShowKey="title"></thy-tree-select>
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
                (ngModelChange)="treeSelectChange()"
                [thyMultiple]="multiple"></thy-tree-select>
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

    objSelectedValue: ThyTreeSelectNode | string = null;

    multiple = false;

    @ViewChild('treeSelect', { static: true })
    treeSelect: ThyTreeSelectComponent;

    treeSelectChange = jasmine.createSpy('treeSelectChange');
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
                [thyShowSearch]="treeShowSearch"></thy-tree-select>
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

@Component({
    selector: 'test-virtual-scrolling-tree-select',
    template: `
        <thy-tree-select #treeSelect [thyTreeNodes]="mockData" [(ngModel)]="selectedValue" [thyVirtualScroll]="true"> </thy-tree-select>
    `
})
export class VirtualScrollingTreeSelectComponent implements OnInit {
    @ViewChild('treeSelect', { static: true }) treeSelect: ThyTreeSelectComponent;

    mockData = bigTreeNodes;
    public selectedValue = '';
    constructor() {}
    ngOnInit(): void {}
}

describe('ThyTreeSelect', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let platform: Platform;

    function configureThyCustomSelectTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThyFormModule, ThyTreeSelectModule, ReactiveFormsModule, FormsModule, NoopAnimationsModule],
            declarations: declarations,
            providers: [
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
            beforeEach(waitForAsync(() => {
                configureThyCustomSelectTestingModule([BasicTreeSelectComponent]);
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                treeSelectDebugElement = fixture.debugElement.query(By.directive(ThyTreeSelectComponent));
                treeSelectElement = treeSelectDebugElement.nativeElement;
            }));

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

            it('should allowClear worked in multiple', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();

                const touchSpy = spyOn<any>(fixture.componentInstance.treeSelect, 'onTouchedFn');

                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();

                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');
                optionNodes[1].click();
                fixture.detectChanges();

                const clearElement = fixture.debugElement.nativeElement.querySelector('.select-control-clear');
                clearElement.click();
                fixture.detectChanges();
                expect(fixture.debugElement.nativeElement.querySelectorAll('.select-control-search').length).toEqual(1);
                expect(touchSpy).not.toHaveBeenCalled();
            }));

            it('should allowClear worked in single', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                fixture.componentInstance.multiple = false;
                fixture.detectChanges();

                const touchSpy = spyOn<any>(fixture.componentInstance.treeSelect, 'onTouchedFn');

                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();

                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');
                optionNodes[1].click();
                fixture.detectChanges();

                const clearElement = fixture.debugElement.nativeElement.querySelector('.select-control-clear');
                clearElement.click();
                fixture.detectChanges();
                expect(touchSpy).toHaveBeenCalled();
            }));

            it('should close popup when click document', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();
                flush();

                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');
                optionNodes[1].click();
                document.body.click();
                fixture.detectChanges();
                expect(fixture.componentInstance.treeSelect.expandTreeSelectOptions).toBeFalsy();
            }));

            it('should change expandStatus when thyExpandStatusChange is dispatched', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();
                flush();

                expect(fixture.componentInstance.expandStatus).toBeTruthy();

                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');
                optionNodes[1].click();
                document.body.click();
                fixture.detectChanges();
                expect(fixture.componentInstance.expandStatus).toBeFalsy();
            }));

            it('should do not open popup when disable', () => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();

                fixture.componentInstance.disable = true;
                fixture.detectChanges();

                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();

                expect(overlayContainerElement.querySelectorAll('a').length).toEqual(0);
            });

            it('should call onFocus methods when focus', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                const treeSelectDebugElement = fixture.debugElement.query(By.directive(ThyTreeSelectComponent));
                fixture.detectChanges();
                const focusSpy = spyOn(fixture.componentInstance.treeComponent, 'onFocus').and.callThrough();

                dispatchFakeEvent(treeSelectDebugElement.nativeElement, 'focus');
                fixture.detectChanges();

                expect(focusSpy).toHaveBeenCalled();
            }));

            it('should call blur and not call onTouchFn when blur', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();

                const blurSpy = spyOn<any>(fixture.componentInstance.treeComponent, 'onTouchedFn');
                const trigger = fixture.debugElement.query(By.css('.select-control-search input')).nativeElement;
                fixture.componentInstance.treeComponent.onBlur({ relatedTarget: trigger } as FocusEvent);

                fixture.detectChanges();

                expect(blurSpy).not.toHaveBeenCalled();
            }));

            it('should call onTouchFn when value change in single mode', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                fixture.componentInstance.multiple = false;
                fixture.detectChanges();
                const blurSpy = spyOn<any>(fixture.componentInstance.treeComponent, 'onTouchedFn');
                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();
                flush();
                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('.thy-option-item');
                optionNodes[3].click();
                fixture.detectChanges();
                expect(blurSpy).toHaveBeenCalled();
            }));

            it('should not call onTouchFn when value change in multiple mode', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                fixture.componentInstance.multiple = true;
                fixture.detectChanges();
                const blurSpy = spyOn<any>(fixture.componentInstance.treeComponent, 'onTouchedFn');
                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();
                flush();
                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('.thy-option-item');
                dispatchFakeEvent(optionNodes[3], 'click');
                fixture.detectChanges();
                expect(blurSpy).not.toHaveBeenCalled();
            }));
        });

        describe('with thyPlaceHolder', () => {
            beforeEach(waitForAsync(() => {
                configureThyCustomSelectTestingModule([PlaceHolderTreeSelectComponent]);
            }));

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
            beforeEach(waitForAsync(() => {
                configureThyCustomSelectTestingModule([BasicTreeSelectComponent]);
            }));

            it('should select item with single when item is clicked', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                fixture.componentInstance.multiple = false;
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();
                flush();

                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');
                optionNodes[1].click();
                fixture.detectChanges();
                const multipleWrapper = fixture.debugElement.query(By.css('.select-control-rendered')).nativeElement;
                expect(multipleWrapper.textContent).toContain('root2');
            }));

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
                expect(
                    fixture.debugElement.nativeElement.querySelectorAll('.choice-item').length +
                        fixture.debugElement.nativeElement.querySelectorAll('.select-control-search').length
                ).toEqual(2);

                optionNodes[1].click();
                fixture.detectChanges();
                flush();
                expect(fixture.debugElement.nativeElement.querySelectorAll('.select-control-search').length).toEqual(1);

                optionNodes[1].click();
                fixture.detectChanges();
                flush();
                expect(
                    fixture.debugElement.nativeElement.querySelectorAll('.choice-item').length +
                        fixture.debugElement.nativeElement.querySelectorAll('.select-control-search').length
                ).toEqual(2);

                const multipleWrapper = fixture.debugElement.query(By.css('.select-control-rendered')).nativeElement;
                expect(multipleWrapper.textContent).toContain('root2');

                const multipleItem = fixture.debugElement.nativeElement.querySelector('.thy-flex-item thy-icon');
                multipleItem.click();
                fixture.detectChanges();
                expect(fixture.debugElement.nativeElement.querySelectorAll('.select-control-search').length).toEqual(1);
            }));

            it('should hiddenKey and disableKey worked', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
                trigger.click();
                fixture.detectChanges();
                flush();

                fixture.componentInstance.hiddenKey = '';
                fixture.detectChanges();
                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');
                expect(optionNodes.length).toBe(5);

                fixture.componentInstance.disableKey = '';
                fixture.detectChanges();
                expect(optionNodes[0].classList.contains('disabled')).toBeTruthy();
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

            fixture.componentInstance.objSelectedValue = '04';
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(treeSelectShowNode.textContent).toContain('root4');
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

            fixture.componentInstance.objSelectedValue = ['04', '03'];
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(multipleWrapper.textContent).toContain('root4');
            expect(multipleWrapper.textContent).toContain('root3');
        }));

        it('should dispatch model change once when remove selected node at multiple', fakeAsync(() => {
            const fixture = TestBed.createComponent(NgModelTreeSelectComponent);
            fixture.componentInstance.multiple = true;
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
            trigger.click();
            fixture.detectChanges();
            flush();

            const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('.thy-option-item');
            optionNodes[0].click();
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelectChange).toHaveBeenCalledTimes(1);
            expect(fixture.componentInstance.treeSelect.selectedNodes.length).toBe(1);

            const changeSpy = jasmine.createSpy('newChangeSpy');
            fixture.componentInstance.treeSelectChange = changeSpy;

            optionNodes[0].click();
            fixture.detectChanges();
            expect(changeSpy).toHaveBeenCalledTimes(1);
            expect(fixture.componentInstance.treeSelect.selectedNodes.length).toBe(0);
        }));
    });

    describe('with search', () => {
        beforeEach(waitForAsync(() => configureThyCustomSelectTestingModule([SearchTreeSelectComponent])));
        it('show search input when set thyShowSearch is true', fakeAsync(() => {
            const fixture = TestBed.createComponent(SearchTreeSelectComponent);
            fixture.detectChanges();
            expect(fixture.debugElement.nativeElement.querySelector('input')).toBeTruthy();

            const touchSpy = spyOn<any>(fixture.componentInstance.treeSelect, 'onTouchedFn');
            const trigger = fixture.debugElement.query(By.css('.select-control-search input')).nativeElement;
            dispatchFakeEvent(trigger, 'blur');

            fixture.detectChanges();

            expect(touchSpy).toHaveBeenCalled();
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

    describe('virtual scrolling tree-select', () => {
        let treeSelectElement: HTMLElement;
        let component: VirtualScrollingTreeSelectComponent;
        let fixture: ComponentFixture<VirtualScrollingTreeSelectComponent>;

        beforeEach(fakeAsync(() => {
            configureThyCustomSelectTestingModule([VirtualScrollingTreeSelectComponent]);
            fixture = TestBed.createComponent(VirtualScrollingTreeSelectComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            treeSelectElement = fixture.debugElement.query(By.directive(ThyTreeSelectComponent)).nativeElement;
        }));

        it('should create', () => {
            expect(component).toBeDefined();
        });

        it('should load part of tree nodes', fakeAsync(() => {
            const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
            trigger.click();
            fixture.detectChanges();
            flush();

            fixture.detectChanges();
            const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');
            expect(optionNodes.length).toBe(12);
        }));

        it('should scrolling tree nodes', fakeAsync(() => {
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement.children[0];
            trigger.click();
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const wrap = document.querySelector('.cdk-virtual-scroll-content-wrapper');
            dispatchFakeEvent(wrap, 'scroll');
            animationFrameScheduler.flush();

            tick(100);
            fixture.detectChanges();
            const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');
            expect(optionNodes.length).toBe(12);
        }));
    });
});
