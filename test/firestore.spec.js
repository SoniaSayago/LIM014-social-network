import MockFirebase from 'mock-cloud-firestore';

import {
  addPost, getPosts, sendDataCurrentUser, updateCurrentUser, getDataUser, addComment,
  getComment, updatephotoProfile, updatephotoCover, updatePost, deletePost, updateComment,
  updatePrivacy, updateLikes, deleteComment,
} from '../src/view/services/firestore.services.js';

const fixtureData = {
  __collection__: {
    SN_Users: {
      __doc__: {
        uid_002: {
          username: 'Sonia',
          email: 'ssayagos@gmail.com',
          photo: '',
          photoCover: '',
          phone: '',
          birthday: 'yyyy-MM-dd',
          country: '',
          description: '',
        },
      },
    },
    SN_Post: {
      __doc__: {
        id_001: {
          userId: '001',
          date: '',
          privacy: 'Public',
          publication: 'Primera publicación',
          urlimg: '',
          likes: '',
          planes: '',

          __collection__: {
            SN_Comment: {
              __doc__: {
                cid_001: {
                  userId: '001',
                  pid: 'id_001',
                  date: '',
                  comment: 'Felicidades quedo hermoso',
                },
              },
            },
          },
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

// --------------------------SN-USER COLLECTION-----------------------------------
// Set user
describe('set new user', () => {
  it('Deberia crear un nuevo usuario', () => {
    const currentUser = {
      uid: 'uid_005',
      displayName: 'Sonia Sayago ',
      photoURL: 'prueba.jpg',
      email: 'ssayagos@gmail.com',
    };
    const current = {
      uid: 'uid_006',
      displayName: null,
      photoURL: null,
      email: 'sonia.sayago.dev@gmail.com',
    };
    sendDataCurrentUser(currentUser)
      .then(() => {
        getDataUser('uid_005')
          .then((doc) => {
            expect(doc.data().email).toEqual('ssayagos@gmail.com');
            expect(doc.data().username).toEqual('Sonia Sayago');
            expect(doc.data().photo).toEqual('prueba.jpg');
          });
      });
    sendDataCurrentUser(current)
      .then(() => {
        getDataUser('uid_006')
          .then((doc) => {
            expect(doc.data().username).toEqual('User');
            expect(doc.data().photo).toEqual('img/default-avatar.png');
          });
      });
  });
});
// Update user profile
describe('update user profile', () => {
  it('Deberia actualizar los datos del usuario', (done) => updateCurrentUser('uid_002', 'Izychoice', '999999999', 'yyyy-MM-dd', '', '')
    .then(() => {
      getDataUser('uid_002')
        .then((doc) => {
          expect(doc.data().username).toBe('Izychoice');
          done();
        });
    }));
});
// --------------------------SN-POST COLLECTION-----------------------------------
// Add new post
describe('add new post', () => {
  it('Deberia agregar una nueva publicación', (done) => addPost('uid_003', 'Public', 'Added post to post', '', '', '')
    .then(() => getPosts(
      (data) => {
        const result = data.find((posts) => posts.publication === 'Added post to posts');
        expect(result.publication).toBe('Added post to posts');
        done();
      },
    )));
});
// --------------------------SN-COMMENTS SUBCOLLECTION-----------------------------------
// Add new comment
describe('add new comment', () => {
  it('Deberia agregar una nuevo comentario', (done) => addComment('uid_001', 'id_001', 'I like it!')
    .then(() => getComment('id_001',
      (data) => {
        const result = data.find((comment) => comment.comment === 'I like it!');
        expect(result.comment).toBe('I like it!');
        done();
      })));
});

// Update user profile
describe('update photo profile', () => {
  it('Deberia actualizar la foto del usuario', (done) => updatephotoProfile('uid_002', 'profile.jpg')
    .then(() => {
      getDataUser('uid_002')
        .then((doc) => {
          expect(doc.data().photo).toBe('profile.jpg');
          done();
        });
    }));
});
// Update user photo cover
describe('update photo cover', () => {
  it('Deberia actualizar la foto de portada del usuario', (done) => updatephotoCover('uid_002', 'photoCover.jpg')
    .then(() => {
      getDataUser('uid_002')
        .then((doc) => {
          expect(doc.data().photoCover).toBe('photoCover.jpg');
          done();
        });
    }));
});
// Update post
describe('update Post', () => {
  it('Deberia actualizar información del post', (done) => updatePost('id_001', 'post editado')
    .then(() => getPosts(
      (data) => {
        const result = data.find((posts) => posts.publication === 'post editado');
        expect(result.publication).toBe('post editado');
        done();
      },
    )));
});
// Update privacy
describe('update Privacy', () => {
  it('Deberia actualizar información de la privacidad', (done) => updatePrivacy('id_001', 'Private')
    .then(() => getPosts(
      (data) => {
        const result = data.find((posts) => posts.privacy === 'Private');
        expect(result.privacy).toBe('Private');
        done();
      },
    )));
});
// Update Comment
describe('update Comment', () => {
  it('Deberia actualizar un comentario', (done) => updateComment('id_001', 'cid_001', 'Edited Comment')
    .then(() => getComment('id_001',
      (data) => {
        const result = data.find((comment) => comment.comment === 'Edited Comment');
        expect(result.comment).toBe('Edited Comment');
        done();
      })));
});
// Update like
describe('update Like', () => {
  it('Deberia  reaccionar Like a Post', (done) => updateLikes('id_001', 'like')
    .then(() => getPosts(
      (data) => {
        const result = data.find((posts) => posts.likes === 'like');
        expect(result.likes).toBe('like');
        done();
      },
    )));
});
// Delete Post
it('Debería poder eliminar un post', (done) => deletePost('id_001')
  .then(() => getPosts(
    (data) => {
      const result = data.find((post) => post.id === 'id_001');
      expect(result).toBe(undefined);
      done();
    },
  )));
// Delete Comment
it('Debería poder eliminar un comentario', (done) => deleteComment('id_001', 'cid_001')
  .then(() => getComment('id_001',
    (data) => {
      const result = data.find((comment) => comment.id === 'cid_001');
      expect(result).toBe(undefined);
      done();
    })));
