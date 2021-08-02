<template>
  <main>
    <TeamStandings />
    <div id="btn" @click="continueOnNextTeam">
      <BaseButton :to="'/game'" :buttonText="'Continue'" />
    </div>
  </main>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['continueOnNextTeam']),
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
