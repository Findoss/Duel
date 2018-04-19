import Regexp from '@/modules/regexp';
import UserService from '@/services/user-service';

export default {
  nickname(nickname, check = false) {
    return new Promise((resolve, reject) => {
      if (nickname === '') {
        reject(new Error('Nickname can\'t be blank'));
      } else if (nickname.length < 4) {
        reject(new Error('Nickname is too short (minimum is 4 characters)'));
      } else if (nickname.length > 20) {
        reject(new Error('Nickname is too long (maximum is 20 characters)'));
      } else if (!Regexp.nickname.test(nickname)) {
        reject(new Error('Nickname contains invalid characters'));
      } else if (check) {
        UserService.checkNickname(nickname).then((result) => {
          if (result.used) resolve();
          reject(new Error('Nickname is already taken'));
        });
      } else {
        resolve();
      }
    });
  },
  email(email, check = false) {
    return new Promise((resolve, reject) => {
      if (email === '') {
        reject(new Error('Email can\'t be blank'));
      } else if (!Regexp.email.test(email)) {
        reject(new Error('Email is invalid'));
      } else if (check) {
        UserService.checkEmail(email).then((result) => {
          if (result.used) resolve();
          reject(new Error('Email is already taken'));
        });
      } else {
        resolve();
      }
    });
  },
  password(password) {
    return new Promise((resolve, reject) => {
      if (password === '') {
        reject(new Error('Password can\'t be blank'));
      } else if (password.length < 7) {
        reject(new Error('Password is too short (minimum is 7 characters)'));
      } else if (password.length > 20) {
        reject(new Error('Password is too long (maximum is 20 characters)'));
      } else if (!Regexp.password.test(password)) {
        reject(new Error('Password needs at least one number and at least one characters'));
      } else {
        resolve();
      }
    });
  },
};
