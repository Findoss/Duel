import { mapActions, mapState, mapGetters } from 'vuex';

// Components
import UserParametrs from '@/components/UserParametrs/UserParametrs.vue';
import UserEstate from '@/components/UserEstate/UserEstate.vue';
import SkillCard from '@/components/SkillCard/SkillCard.vue';
import SkillSet from '@/components/SkillSet/SkillSet.vue';
import Skill from '@/components/Skill/Skill.vue';

export default {

  components: {
    'z-user-parametrs': UserParametrs,
    'z-user-estate': UserEstate,
    'z-skill-card': SkillCard,
    'z-skill-set': SkillSet,
    'z-skill': Skill,
  },

  data() {
    return {
      pickSlill: 1,
    };
  },

  computed: {
    ...mapState({
      skillSet: state => state.user.skillSet,
      skillsUnlocked: state => state.user.skillsUnlocked,
      skills: state => state.skills.skills,
      level: state => state.user.level,
      nickname: state => state.user.nickname,
      points: state => state.user.points,
      gold: state => state.user.gold,
      avatar: state => state.user.avatar,
    }),
    ...mapGetters({
      getSkillInfo: 'skills/getSkillInfo',
      skillSet: 'user/getSkillSet',
      getCountSkillsClones: 'user/getCountSkillsClones',
    }),
    ...mapGetters([
      'pathAvatarIcon',
      'pathSkill',
    ]),
  },

  methods: {
    ...mapActions({
      loadSkills: 'skills/loadSkills',
      delInSkillSet: 'user/delInSkillSet',
      addInSkillSet: 'user/addInSkillSet',
      buySkill: 'user/buySkill',
    }),

    pressSkill(id) {
      this.pickSlill = id;
    },
  },
};
