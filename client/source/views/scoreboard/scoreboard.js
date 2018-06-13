// Services
import * as UserService from '@/services/user';

// Components
import BaseLoading from '@/components/BaseLoading/BaseLoading.vue';

export default {

  components: {
    'z-loading': BaseLoading,
  },

  data() {
    return {
      loading: false,
      users: [],
    };
  },

  // computed: {
  //   pathAvatar(avatar) {
  //     return require(`@/assets/avatars/${avatar}.png`);
  //   },
  // },

  methods: {
    pathAvatar(avatar) {
      return require(`@/assets/avatars/${avatar}.png`);
    },
  },

  created() {
    UserService.getAllUsers()
      .then((response) => {
        this.users = response.users;
        this.loading = true;
      })
      .catch((error) => {
        console.warn(error);
      });
  },
};
