import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ThySelectModule } from './module';
import { ThySelectCustomComponent } from './select-custom.component';
import { ThyOptionComponent } from './option.component';
import { By } from '@angular/platform-browser';
import { UpdateHostClassService } from '../shared';
import { ThyPositioningService } from '../positioning/positioning.service';

describe('ThyCustomSelect', () => {
    function configureThyCustomSelectTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThySelectModule],
            declarations: declarations,
            providers: [UpdateHostClassService, ThyPositioningService]
        }).compileComponents();
    }

    describe('core', () => {
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([BasicSelectComponent]);
        }));

        describe('accessibility', () => {
            let fixture: ComponentFixture<BasicSelectComponent>;
            let thyOptionComponent: ThyOptionComponent;
            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                thyOptionComponent = fixture.componentInstance.select._listOfOptionComponent.first;
            }));

            it('should thy-group-option length', fakeAsync(() => {
                expect(fixture.componentInstance.select._listOfOptionComponent.length).toEqual(2);
            }));

            it('should first group‘s options thyGroupLabel', fakeAsync(() => {
                expect(thyOptionComponent.thyGroupLabel).toEqual('企业成员');
            }));

            it('should first group‘s options sub options', fakeAsync(() => {
                expect(thyOptionComponent.showOptionComponents[0].thyGroupLabel).toEqual('企业成员');
                expect(thyOptionComponent.showOptionComponents[1].thyLabelText).toEqual('xingxing');
                expect(thyOptionComponent.showOptionComponents[2].thyLabelText).toEqual('xiaojian');
            }));
            // it('render first group‘s showOptionComponents', fakeAsync(() => {
            //     fixture.detectChanges();
            //     console.log(fixture.debugElement.nativeElement);
            //     const value = fixture.debugElement.query(By.css('.thy-option-item-group')).nativeElement;
            //     console.log(value);
            //     expect(thyOptionComponent.showOptionComponents[0].thyGroupLabel).toEqual('企业成员');
            //     expect(thyOptionComponent.showOptionComponents[1].thyLabelText).toEqual('xingxing');
            //     expect(thyOptionComponent.showOptionComponents[2].thyLabelText).toEqual('xiaojian');
            // }));
        });
    });
});
@Component({
    selector: 'basic-select',
    template: `
        <thy-custom-select>
            <thy-option-group [thyGroupLabel]="group.groupName" *ngFor="let group of groups">
                <thy-option [thyLabelText]="item.name" *ngFor="let item of group.items"></thy-option>
            </thy-option-group>
        </thy-custom-select>
    `
})
class BasicSelectComponent {
    constructor(public elementRef: ElementRef) {}
    public groups = [
        {
            groupName: '企业成员',
            items: [
                {
                    _id: '001',
                    name: 'xingxing'
                },
                {
                    _id: '002',
                    name: 'xiaojian'
                }
            ]
        },
        {
            groupName: '公开群组',
            items: [
                {
                    _id: '003',
                    name: '公告',
                    pin_yin: 'gg'
                }
            ]
        }
    ];
    @ViewChild(ThySelectCustomComponent) select: ThySelectCustomComponent;
}
