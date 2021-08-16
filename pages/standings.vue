<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main>
      <TeamStandings @stopLoading="onImagesLoaded" />
      <div v-if="!getHasWinner" class="btn">
        <BaseButton :to="'/game'" :buttonText="'Continue'" />
      </div>
      <div v-else class="btn">
        <BaseButton :to="'/winner'" :buttonText="'Finish'" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(['getHasWinner']),
  },
  methods: {
    ...mapMutations(['continueOnNextTeam']),

    onImagesLoaded() {
      this.isLoading = false;
    },
  },
  created() {
    this.continueOnNextTeam();
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
