<template>
  <main>
    <TeamStandings />
    <div v-if="!getHasWinner" class="btn">
      <BaseButton :to="'/game'" :buttonText="'Continue'" />
    </div>
    <div v-else class="btn">
      <BaseButton :to="'/winner'" :buttonText="'Finish'" />
    </div>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getHasWinner']),
  },
  methods: {
    ...mapMutations(['continueOnNextTeam']),
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
