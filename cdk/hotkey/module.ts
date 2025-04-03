import { NgModule } from '@angular/core';
import { ThyHotkeyDirective } from './hotkey.directive';

@NgModule({
    imports: [ThyHotkeyDirective],
    exports: [ThyHotkeyDirective],
    providers: []
})
export class ThyHotkeyModule {}
