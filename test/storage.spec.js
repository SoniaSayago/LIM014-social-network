import mockFirebase from '../_mocks_/storage-mock.js';
import { sendImgToStorage } from '../src/view/services/storage.services.js';

global.firebase = mockFirebase();
describe('sendImgToStorage', () => {
  it('should be return', (done) => sendImgToStorage('the folder user 01', 'img.jpg')
    .then((data) => {
      expect(data).toBe('The file img.jpg was added to the folder user 01');
      done();
    }));
});
