import { migrateNotifyConfigColor } from './notify-color-migration';

describe('migrateNotifyConfigColor', () => {
    it('should migrate type to color in notifyService.show', () => {
        const content = `
import { ThyNotifyService } from 'ngx-tethys/notify';

this.notifyService.show({ type: 'info', title: 'Hi' });
`;
        expect(migrateNotifyConfigColor(content)).toContain("show({ color: 'info', title: 'Hi' })");
        expect(migrateNotifyConfigColor(content)).not.toContain('type: ');
    });

    it('should migrate type on ThyNotifyConfig object', () => {
        const content = `
import { ThyNotifyConfig } from 'ngx-tethys/notify';

const option: ThyNotifyConfig = { type: 'error', title: 'Error' };
`;
        expect(migrateNotifyConfigColor(content)).toContain("color: 'error'");
        expect(migrateNotifyConfigColor(content)).not.toContain('type: ');
    });

    it('should not migrate when color already exists', () => {
        const content = `
import { ThyNotifyService } from 'ngx-tethys/notify';

this.notifyService.show({ type: 'info', color: 'success', title: 'Hi' });
`;
        expect(migrateNotifyConfigColor(content)).toContain("type: 'info'");
        expect(migrateNotifyConfigColor(content)).toContain("color: 'success'");
    });

    it('should not migrate files without notify import', () => {
        const content = `this.calendar = { type: 'success', content: 'event' };`;
        expect(migrateNotifyConfigColor(content)).toBe(content);
    });
});
