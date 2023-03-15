import { InputBoolean } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';

import { Component, ContentChild, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';

export type ThyVoteSizes = 'default' | 'sm';

export type ThyVoteType = 'primary' | 'success' | 'primary-weak' | 'success-weak';

export type ThyVoteLayout = 'vertical' | 'horizontal';

@Component({
    selector: 'thy-vote,[thyVote]',
    templateUrl: './vote.component.html',
    host: {
        '[class.thy-vote-disabled]': `thyDisabled`
    },
    standalone: true,
    imports: [NgIf, ThyIconComponent, NgTemplateOutlet]
})
export class ThyVoteComponent implements OnInit {
    _size: ThyVoteSizes;

    _type: ThyVoteType;

    _layout: ThyVoteLayout;

    _initialized = false;

    _isRound = false;

    private hostRenderer = useHostRenderer();

    @HostBinding(`class.thy-vote`) class = true;

    @HostBinding(`class.has-voted`) _hasVoted = true;

    @Input()
    set thySize(value: ThyVoteSizes) {
        this._size = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input()
    set thyVote(value: ThyVoteType) {
        this._type = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input()
    set thyRound(value: boolean) {
        this._isRound = coerceBooleanProperty(value);
    }

    @Input()
    set thyLayout(value: ThyVoteLayout) {
        this._layout = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input() thyVoteCount: number | string;

    @Input() thyIcon = 'thumb-up';

    @Input()
    set thyHasVoted(value: boolean) {
        this._hasVoted = coerceBooleanProperty(value);
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input() @InputBoolean() thyDisabled = false;

    @ContentChild('voteIcon') voteIcon: TemplateRef<any>;

    constructor() {}

    ngOnInit() {
        this._setClassesByType();
        this._initialized = true;
    }

    _setClassesByType() {
        const classNames = [];
        if (!this._type) {
            this._type = 'primary';
        }
        if (!this._layout) {
            this._layout = 'horizontal';
        }
        if (!this._size) {
            this._size = 'default';
        }
        if (this._isRound) {
            classNames.push('thy-vote-round');
        }
        classNames.push(`thy-vote-${this._type}`);
        classNames.push(`thy-vote-${this._layout}`);
        classNames.push(`thy-vote-${this._layout}-size-${this._size}`);
        this.hostRenderer.updateClass(classNames);
    }
}
