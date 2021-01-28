import { helpers } from 'ngx-tethys/util';
import { MIME_Map } from '../constant';
import { mimeTypeConvert } from './../util';

describe(`uploader-util`, () => {
    const fileTypes = ['.xls', '.xlsx'];
    const convertType = mimeTypeConvert(fileTypes);
    describe('test uploader file type', () => {
        it('should has .xls and .xlsx .png in MIME_Map', () => {
            expect(MIME_Map['.xls']).toBeTruthy();
            expect(MIME_Map['.xlsx']).toBeTruthy();
            expect(MIME_Map['.png']).toBeTruthy();
        });

        it('should has .xls and .xlsx type', () => {
            expect(convertType.indexOf(MIME_Map['.xls']) === -1).toBeFalsy();
            expect(convertType.indexOf(MIME_Map['.xlsx']) === -1).toBeFalsy();
        });

        it('should not has .png type', () => {
            expect(convertType.indexOf(MIME_Map['.png']) === -1).toBeTruthy();
        });
    });
});
