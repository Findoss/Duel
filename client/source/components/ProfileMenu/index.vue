<template>
  <div class="profile-menu">
    <div class="profile-menu__item button-icon__skill">
      socket = {{ this.$store.state.statusSocket }}
    </div>
    <!-- <router-link
      class="profile-menu__item button-play button-icon__skill"
      :to="{ name: 'profile'}"
    >
      {{ $t('menu.profile') }}
    </router-link> -->
    <router-link
      class="profile-menu__item button-play button-icon__skill"
      :to="{ name: `lobby` }"
    >
      {{ $t('menu.play') }}
    </router-link>
    <router-link
      class="profile-menu__item button-icon__skill"
      :to="{ name: 'profile', params: { userId: this.$store.getters.myId } }"
    >
      {{ $t('menu.profile') }}
    </router-link>
    <!-- <router-link
      class="profile-menu__item button-icon__skill"
      :to="{ name: 'skills'}"
    >
      {{ $t('menu.skills') }}
    </router-link> -->
    <!-- <router-link
      class="profile-menu__item button-icon__skill"
      :to="{ name: 'inventory'}"
    >
      {{ $t('menu.inventory') }}
    </router-link> -->
    <!-- <router-link
      class="profile-menu__item button-icon__skill"
      :to="{ name: 'shop'}"
    >
      {{ $t('menu.shop') }}
    </router-link> -->
    <router-link
      class="profile-menu__item button-icon__skill"
      :to="{ name: 'scoreboard'}"
    >
      {{ $t('menu.scoreboard') }}
    </router-link>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.css" scoped></style>