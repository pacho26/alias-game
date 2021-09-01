<template>
  <div>
    <header>
      <nuxt-link v-if="!this.gameInProgress" to="/" id="logo-link"
        >Alias<span>Game</span>
      </nuxt-link>
      <nuxt-link v-else to="/" id="logo-link" class="no-click"
        >Alias<span>Game</span>
      </nuxt-link>
    </header>
    <Nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['gameInProgress']),
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: 'Poppins', sans-serif;
}

.no-click {
  pointer-events: none;
}

#logo-link {
  text-decoration: none;
  font-family: 'Poppins Bold', sans-serif;
  color: #3c5186;
  font-size: 40px;
  font-weight: 800;
  padding: 8px;
  user-select: none;

  span {
    font-family: 'Poppins Extra Bold', sans-serif;
    color: #9b72aa;
    font-size: 20px;
    font-weight: 800;
  }
}

header {
  margin: 0;
  padding: 0;
  background: #fff5de;
}
</style>
