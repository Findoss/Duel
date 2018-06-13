// Utils
import Rules from '@/utils/validation/rules';

// Services
import * as UserService from '@/services/user';

// Components
import BaseAlert from '@/components/BaseAlert/BaseAlert.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseTextField from '@/components/BaseTextField/BaseTextField.vue';

export default {

  components: {
    'z-text-field': BaseTextField,
    'z-button': BaseButton,
    'z-alert': BaseAlert,
  },

  data() {
    return {
      form: {
        error: '',
        nickname: {
          value: '',
          status: false,
          rules: [
            Rules.nickname,
            Rules.checkNickname,
          ],
        },
        email: {
          value: '',
          status: false,
          rules: [
            Rules.email,
            Rules.checkEmail,
          ],
        },
        password: {
          value: '',
          status: false,
          rules: [Rules.password],
        },
      },
    };
  },

  methods: {
    submit() {
      if (!this.form.nickname.status) {
        this.$refs.nickname.validation();
        return false;
      } else if (!this.form.email.status) {
        this.$refs.email.validation();
        return false;
      } else if (!this.form.password.status) {
        this.$refs.password.validation();
        return false;
      }

      const user = {
        nickname: this.form.nickname.value,
        email: this.form.email.value,
        password: this.form.password.value,
      };

      UserService.registration(user)
        .then((response) => {
          if (response.code === undefined) {
            // todo автомтическое залогивание и переход в профиль
            this.$store.commit('authorization/showAlert', {
              type: 'success',
              message: response.message,
            });
            this.$router.push({ path: '/signin' });
          } else {
            this.$refs.password.reset();
            this.form.error = response.message;
          }
        })
        .catch((error) => {
          console.warn(error);
        });
      return true;
    },

  },
};
