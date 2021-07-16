<template>
  <body>
    <div class="teamsContainer">
      <h3 @click="ispisi">Current teams:</h3>
      <ul>
        <li v-for="team in currentTeamsData" :key="team.name">
          {{ team.name }} --> {{ team.players[0] }} i {{ team.players[1] }}
        </li>
      </ul>
      <PlusButton :tooltipText="'Add a new team!'" v-b-modal.addTeam />
      <b-modal id="addTeam" title="New team">
        <div class="addTeamForm">
          <b-form-input
          class="mb-3 teamNameInput"
            v-model="newTeamName"
            placeholder="Enter team name"
          ></b-form-input>
          <b-form-select
            class="selectForm"
            v-model="numberOfPlayers"
            :options="options"
          ></b-form-select>

          <div class="playersContainer">
            <div
              class="playersList"
              v-for="index in numberOfPlayers"
              :key="index"
            >
              <p class="pr-4 mt-3">Player {{ index }}:</p>
              <b-form-input
                class="nameInput"
                v-model="names[index]"
                placeholder="Enter player's name"
              ></b-form-input>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
    <BaseButton
      v-if="currentTeamsData.length >= 2"
      :buttonText="'Start game'"
    />
    <h2 v-else>There must be at least 2 teams!</h2>
  </body>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      currentTeamsData: [],
      newTeamName: '',
      numberOfPlayers: null,
      options: [
        { value: null, text: 'Select number of players', disabled: true },
        { value: 2, text: '2 players' },
        { value: 3, text: '3 players' },
        { value: 4, text: '4 players' },
      ],
      names: [],
    };
  },
  computed: {
    ...mapGetters(['currentTeams']),
    setCurrentTeams() {
      return this.currentTeams;
    },
  },
  created() {
    this.currentTeamsData = this.setCurrentTeams;
  },
  methods: {
    ispisi() {
      console.log(this.currentTeamsData);
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  padding: 20px;
}

body > * {
  margin: 20px;
}

.teamsContainer {
  background: #fff5de;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.nameInput {
  max-width: 170px;
}

.selectForm {
  max-width: 220px;
}

.addTeamForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.playersList {
  display: flex;
  justify-content: center;
  align-items: center;
}

.playersContainer {
  margin-top: 20px;
}

.teamNameInput {
  max-width: 220px;
}
</style>
