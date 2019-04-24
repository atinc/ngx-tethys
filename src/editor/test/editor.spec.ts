import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { NgModule, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyEditorModule } from '../module';
import { ThyEditorComponent } from '../editor.component';
import { CommonModule } from '@angular/common';
import { ThyDirectiveModule } from '../../directive';
import { ThyUploaderModule } from '../../uploader';
import { ThyEditorLinkModuleService, ThyDefaultEditorLinkModuleService } from '../editor-linkmodule.service';

describe('ThyEditor', () => {
    let fixture: ComponentFixture<ThyDemoEditorComponent>;
    let thyEditorComponent;
    let thyEditorWrap;
    let thyEditorArea;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyEditorModule, ThyEditorTestModule],
            providers: []
        });

        TestBed.compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoEditorComponent);
        thyEditorComponent = fixture.debugElement.query(By.directive(ThyEditorComponent));
        thyEditorArea = fixture.debugElement.query(By.css('.thy-editor-textarea'));
    });

    it('thy-editor should have class: thy-editor-wrapper', () => {
        fixture.detectChanges();
        expect(thyEditorComponent.nativeElement.classList.contains('thy-editor-wrapper')).toBe(true);
    });

    it('thyEditorWrap should have class: thy-editor-simple', function(done) {
        fixture.detectChanges();
        setTimeout(function() {
            thyEditorWrap = fixture.debugElement.query(By.css('.thy-editor'));
            expect(thyEditorWrap.nativeElement.classList.contains('thy-editor-simple')).toBe(true);
            done();
        }, 500);
    });

    it('thyEditorWrap autofocus should have class: thy-editor-focus', function(done) {
        fixture.detectChanges();
        setTimeout(function() {
            thyEditorWrap = fixture.debugElement.query(By.css('.thy-editor'));
            expect(thyEditorWrap.nativeElement.classList.contains('thy-editor-focus')).toBe(true);
            done();
        }, 500);
    });
});

@Component({
    selector: 'thy-demo-thy-menu',
    template: `
        <thy-editor [(ngModel)]="value" [config]="config"></thy-editor>
    `
})
class ThyDemoEditorComponent {
    public value = '';
    public config = {
        type: 'simple',
        autofocus: true,
        placeholder: '这个是自定义的placeholder',
        uploadImg: {
            multiple: true,
            acceptType: ['.gif', '.jpeg']
        }
    };
    @ViewChild(ThyEditorComponent) editor: ThyEditorComponent;
}

@NgModule({
    imports: [CommonModule, FormsModule, ThyDirectiveModule, ThyUploaderModule, ThyEditorModule],
    declarations: [ThyDemoEditorComponent],
    exports: [ThyDemoEditorComponent],
    providers: [
        {
            provide: ThyEditorLinkModuleService,
            useClass: ThyDefaultEditorLinkModuleService
        }
    ]
})
export class ThyEditorTestModule {}
