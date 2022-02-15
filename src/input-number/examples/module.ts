import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThySpaceModule } from 'ngx-tethys/space';

export default {
    imports: [ThySpaceModule, CommonModule, FormsModule, ThyInputNumberModule]
};
