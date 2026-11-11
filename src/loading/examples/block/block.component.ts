import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyLoading } from 'ngx-tethys/loading';
import { ThySwitch } from 'ngx-tethys/switch';

@Component({
    selector: 'thy-loading-block-example',
    templateUrl: './block.component.html',
    imports: [ThyLoading, ThySwitch, FormsModule]
})
export class ThyLoadingBlockExampleComponent {
    loading = true;
}
