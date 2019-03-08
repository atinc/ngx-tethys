import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksStore } from '../../store/tasks-store';
import { DriveStore } from '../../store/drive-store';

@Component({
    selector: 'demo-store-other-section',
    templateUrl: './store-other-section.component.html',
    styleUrls: ['./store-section.component.scss'],
    providers: [
        TasksStore,
        DriveStore
    ]
})
export class DemoStoreOtherSectionComponent {
    constructor(public tasksStore: TasksStore, public driveStore: DriveStore) {

    }
    addFile() {
        this.driveStore.dispatch('addFile');
    }

    changeFold() {
        this.driveStore.changeFold();
    }
}
