import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySharedModule } from 'ngx-tethys/shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyPropertyModule } from 'ngx-tethys/property';
import { ThyTagModule } from 'ngx-tethys/tag';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyInputModule } from 'ngx-tethys/input';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThyButtonModule, ThyTagModule, ThyInputModule, ThyAvatarModule, ThyPropertyModule, ThySharedModule]
};
