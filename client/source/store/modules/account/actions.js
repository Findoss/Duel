import Http from '@/utils/http';
import Router from '@/routes';
import socket, { socketAuth } from '@/utils/socket';

export default {
  showAlertSignin({ commit }, alert) {
    commit('SET_ALERT', alert);
  },

  registration({ dispatch }, user) {
    return new Promise((reject) => {
      Http.send('POST', '/users', user)
        .then((response) => {
          dispatch('showAlertSignin', {
            type: 'success',
            message: response.message,
          });
          Router.push({ path: '/signin' });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },


  deleteAccount({ dispatch }) {
    return new Promise(() => {
      if (confirm('Once you delete your account, there is no going back. Please be certain.')) {
        Http.send('DELETE', '/me')
          .then((response) => {
            localStorage.removeItem('session-token');
            dispatch('showAlertSignin', {
              type: 'info',
              message: response.message,
            });
            Router.push({ path: '/signin' });
          });
      }
    });
  },


  // TODO реализовать методы API
  // newPassword({ dispatch }, password) {
  //   // ...
  // },

  // TODO реализовать методы API
  // resetPassword({ dispatch }, email) {
  //   // ...
  // },

  signIn({ commit, dispatch }, user) {
    return new Promise((reject) => {
      Http.send('POST', '/auth/signin', user)
        .then((response) => {
          // сохраняем в стор
          commit('SET_MY_ID', response.id, { root: true });
          // сохраняем в localStorage
          localStorage.setItem('session-token', response.token);
          // запускаем сокеты
          socketAuth();

          Router.push({ path: `/${response.id}` });
        })
        .catch((error) => {
          dispatch('showAlertSignin', {
            type: 'error',
            message: error.message,
          });
          reject(error);
        });
    });
  },

  signOut({ commit, dispatch }) {
    Http.send('DELETE', '/auth/signout')
      .then((response) => {
        dispatch('showAlertSignin', {
          type: 'info',
          message: response.message,
        });
      })
      .catch((error) => {
        dispatch('showAlertSignin', {
          type: 'error',
          message: error.message,
        });
      })
      .finally(() => {
        commit('DEL_MY_ID', undefined, { root: true });
        localStorage.removeItem('session-token');
        socket.disconnect();
        Router.push({ path: '/signin' });
      });
  },
};