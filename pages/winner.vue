<template>
  <main>
    <h1 id="team-name">{{ winningTeam.name.toUpperCase() }}</h1>
    <img id="trophy" src="../assets/trophy.svg" alt="Trophy" />
    <img id="team-logo" :src="winningTeam.logo" alt="Team logo" />
    <BaseButton id="btn" :to="'lobby'" :buttonText="'Go to lobby'" />
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      winningTeam: {},
    };
  },
  computed: {
    ...mapGetters(['getCurrentTeams']),
  },
  created() {
    this.winningTeam = this.getCurrentTeams.reduce((prev, current) =>
      prev.points > current.points ? prev : current
    );
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  #trophy {
    max-width: 50vh;
  }

  #team-logo {
    max-width: 14vh;
    position: relative;
    bottom: 49vh;
    opacity: 0.7;
    padding: 10px 0;
    background: #fac809;
    border-radius: 8px;
  }

  #team-name {
    color: #2f406a;
    font-size: 48px;
    font-weight: 700;
    position: relative;
    bottom: 40px;
    text-align: center;
    text-shadow: 2px 2px #c8a104;
  }

  #btn {
    position: relative;
    bottom: 10vh;
  }
}
</style>
