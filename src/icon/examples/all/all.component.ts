import { ThyIconRegistry } from 'ngx-tethys/icon';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
    standalone: false
})
export class ThyIconAllExampleComponent implements OnInit {
    private http = inject(HttpClient);

    glyphs: GlyphCategory[];

    ngOnInit() {
        this.http.get<GlyphCategory[]>(`assets/icons/glyphs.json`).subscribe(data => {
            this.glyphs = data;
        });
    }
}
