import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { AbstractPickerComponent } from './abstract-picker.component';
import { PanelMode, CompatibleValue } from './standard-types';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    template: ``
})
export class HeaderPickerComponent extends AbstractPickerComponent implements OnInit, OnChanges {
    @Input() thyPlaceHolder: string;

    @Input() thyDefaultValue: TinyDate;
    @Input() thyFormat: string;

    endPanelMode: SupportHeaderPanel; // would rewrite by sub class
    panelMode: PanelMode;

    private supportPanels: PanelMode[];

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.panelMode = this.endPanelMode;

        const allHeaderPanels: PanelMode[] = ['decade', 'year', 'month'];
        this.supportPanels = allHeaderPanels.slice(0, allHeaderPanels.indexOf(this.endPanelMode) + 1);
    }

    onPanelModeChange(mode: PanelMode): void {
        if (this.supportPanels.indexOf(mode) > -1) {
            this.panelMode = mode;
        } else {
            // Since the default "click year" logic can be "year panel" -> "date panel", we need force to the end panel otherwise
            this.panelMode = this.endPanelMode;
        }
    }

    onChooseValue(mode: SupportHeaderPanel, value: CompatibleValue): void {
        if (this.endPanelMode === mode) {
            super.onValueChange(value);

            this.closeOverlay();
        }
    }

    onOpenChange(open: boolean): void {
        if (!open) {
            this.cleanUp();
        }
        this.thyOpenChange.emit(open);
    }

    // Restore some initial props to let open as new in next time
    private cleanUp(): void {
        this.panelMode = this.endPanelMode;
    }
}

export type SupportHeaderPanel = 'year' | 'month';
