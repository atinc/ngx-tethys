import { Component } from '@angular/core';

@Component({
    selector: 'demo-avatar-remove-section',
    templateUrl: './remove.component.html'
})
export class DemoAvatarRemoveSectionComponent {
    public avatarSrc = 'dfea7c36-5147-4569-8910-829137920172_80x80.png';

    public avatarPath = '9cb2637b-9f70-4d73-8c1d-24542b6ab4e1_80x80.png';

    public removeMembers = [
        {
            avatar: this.avatarPath,
            _id: 1,
            size: 24
        },
        {
            avatar: this.avatarSrc,
            _id: 2,
            size: 32
        },
        {
            avatar: this.avatarPath,
            _id: 3,
            size: 36
        }
    ];

    onRemove(member: any) {
        this.removeMembers.splice(this.removeMembers.indexOf(member), 1);
    }

    resetRemoveMembers() {
        this.removeMembers = [
            {
                avatar: this.avatarPath,
                _id: 1,
                size: 24
            },
            {
                avatar: this.avatarSrc,
                _id: 2,
                size: 32
            },
            {
                avatar: this.avatarPath,
                _id: 3,
                size: 36
            }
        ];
    }
}
