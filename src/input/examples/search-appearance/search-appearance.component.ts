import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyInputSearch } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-search-appearance-example',
    templateUrl: './search-appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInputSearch, ThyColDirective, ThyRowDirective, FormsModule]
})
export class ThyInputSearchAppearanceExampleComponent {
    public value = '搜索文本';

    appearances: { value: ThyFormControlAppearance; label: string }[] = [
        { value: 'outline', label: 'outline：灰色边框，hover/focus 蓝色边框' },
        { value: 'subtle', label: 'subtle：无边框，hover/focus 蓝色边框' },
        { value: 'ghost', label: 'ghost：无边框，hover/focus 也无边框' }
    ];
}
