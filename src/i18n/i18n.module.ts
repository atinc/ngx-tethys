import { NgModule } from '@angular/core';
import { ThyI18nTranslate } from './i18n.pipe';

@NgModule({
    imports: [ThyI18nTranslate],
    exports: [ThyI18nTranslate]
})
export class ThyI18nModule {}
