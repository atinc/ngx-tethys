import { Injectable } from '@angular/core';
import { ComponentExample } from './component-example';

@Injectable()
export class ShowcaseSection {
    name?: string;
    anchor?: string;
    outlet?: any;
    description?: string;
    content?: ComponentExample[];
}
