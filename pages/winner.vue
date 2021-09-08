<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main>
      <h1 id="team-name">
        {{ winningTeam.name.toUpperCase() }}
      </h1>
      <img
        id="trophy"
        src="../assets/trophy.svg"
        alt="Trophy"
        @load="stopLoading"
      />
      <img id="team-logo" :src="winningTeam.logo" alt="Team logo" />
      <div
        @click="
          setPreviousTeams();
          changeGameScreenStatus(true);
        "
      >
        <BaseButton id="btn" :to="'lobby'" :buttonText="'Go to lobby'" />
      </div>
      <audio id="champions-audio">
        <source
          src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/sfx%2Fwe-are-the-champions-sfx.mp3?alt=media&token=7a029d8b-6ade-4e4e-9809-5a6a629cca84"
          type="audio/mpeg"
        />
      </audio>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      winningTeam: {},
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(['getAllTeams']),
    ...mapState(['isDarkMode']),
  },
  created() {
    this.winningTeam = this.getAllTeams.reduce((prev, current) =>
      prev.points > current.points ? prev : current
    );
    this.setGameInProgress(false);

    // It's true because if this page rerenders, song is starting over and over again
    this.changeGameScreenStatus(true);
  },
  mounted() {
    this.isDarkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
  },
  methods: {
    ...mapMutations([
      'setCurrentTeams',
      'setGameInProgress',
      'changeGameScreenStatus',
    ]),

    setPreviousTeams() {
      this.setCurrentTeams(this.getAllTeams);
    },
    stopLoading() {
      this.isLoading = false;
      document.getElementById('champions-audio').play();
    },
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
    max-width: 46vh;
  }

  #team-logo {
    max-width: 14vh;
    position: relative;
    bottom: 46vh;
    opacity: 0.75;
    padding: 10px 0;
    background: #fac809;
    border-radius: 8px;
  }

  #team-name {
    color: #374b7b;
    font-size: 48px;
    font-weight: 700;
    position: relative;
    bottom: 40px;
    text-align: center;
  }

  #btn {
    position: relative;
    bottom: 10vh;
  }
}

.dark-mode {
  main {
    #team-name {
      color: #ffb2ff;
    }
  }
}
</style>
