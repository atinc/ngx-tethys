import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyLoading } from 'ngx-tethys/loading';
import { ThySwitch } from 'ngx-tethys/switch';

@Component({
    selector: 'thy-loading-block-example',
    templateUrl: './block.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyLoading, ThySwitch, FormsModule]
})
export class ThyLoadingBlockExampleComponent {
    loading = true;
}
