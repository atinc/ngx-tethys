import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[thyTransclude]'
})
export class ThyTranscludeDirective {
  viewRef: ViewContainerRef;

  protected _viewRef: ViewContainerRef;
  protected _ngTransclude: TemplateRef<any>;

  @Input()
  set thyTransclude(templateRef: TemplateRef<any>) {
    this._ngTransclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  get thyTransclude(): TemplateRef<any> {
    return this._ngTransclude;
  }

  constructor(viewRef: ViewContainerRef) {
    this.viewRef = viewRef;
  }
}
