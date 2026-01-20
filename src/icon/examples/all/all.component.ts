import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThyIcon } from 'ngx-tethys/icon';

interface GlyphIcon {
    name: string;
    unicode: 'E0F4';
    color: '#888888';
}

interface GlyphCategory {
    name: string;
    text: string;
    description: string;
    icons: GlyphIcon[];
}

@Component({
    selector: 'thy-icon-all-example',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.scss'],
    imports: [ThyIcon]
})
export class ThyIconAllExampleComponent implements OnInit {
    private http = inject(HttpClient);

    private cdr = inject(ChangeDetectorRef);
    
    glyphs!: GlyphCategory[];

    ngOnInit() {
        this.http.get<GlyphCategory[]>(`assets/icons/glyphs.json`).subscribe(data => {
            this.glyphs = data;
            this.cdr.markForCheck();
        });
    }
}
