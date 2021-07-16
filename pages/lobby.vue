<template>
  <body>
    <div class="teamsContainer">
      <h3>CURRENT TEAMS:</h3>
      <ul>
        <li v-for="team in currentTeamsData" :key="team.name">
          {{ team.name }} --> {{ team.players[0] }} i {{ team.players[1] }}
        </li>
      </ul>
      <div
        class="iconPlusContainer"
        v-b-tooltip.hover.right="'Add a new team!'"
      >
        <fa class="iconPlus" v-b-modal.addTeamModal icon="plus"></fa>
      </div>

      <b-modal id="addTeamModal" title="New team" hide-footer hide-header>
        <div id="addTeamForm">
          <b-form-input
            class="mb-3 teamNameInput"
            v-model="newTeamName"
            placeholder="Enter team name"
            autocomplete="off"
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
              <p class="pr-2 mt-3">Player {{ index }}:</p>
              <b-form-input
                class="nameInput"
                v-model="names[index - 1]"
                @keyup.enter="
                  $bvModal.hide('addTeamModal');
                  ispisi();
                  clearForm();
                "
                placeholder="Enter player's name"
                autocomplete="off"
              ></b-form-input>
            </div>
          </div>
        </div>

        <div class="modalButtons">
          <div
            @click="
              $bvModal.hide('addTeamModal');
              clearForm();
            "
          >
            <BaseButton id="closeFormButton" :buttonText="'Cancel'" />
          </div>

          <div
            @click="
              $bvModal.hide('addTeamModal');
              ispisi();
              clearForm();
            "
          >
            <BaseButton id="addTeamButton" :buttonText="'Add team'" />
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
import { mapGetters, mapActions } from 'vuex';

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
    ...mapActions(['addNewTeam']),
    ispisi() {
      const newTeam = {
        name: this.newTeamName,
        players: this.names,
      };
      console.log(newTeam);
      this.addNewTeam(newTeam);
    },
    clearForm() {
      this.newTeamName = '';
      this.numberOfPlayers = null;
      this.names = [];
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
  max-width: 183px;
}

.selectForm,
.teamNameInput {
  max-width: 250px;
}

#addTeamForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  font-family: 'Poppins', sans-serif;
  margin: 14px 0;
}

.playersList {
  display: flex;
  justify-content: center;
  align-items: center;
}

.playersContainer {
  margin-top: 20px;
}

.iconPlus {
  font-size: 30px;
  color: #fff5de;
  border: none;
  margin: 0;
  transition: 0.2s ease-in-out;

  &:focus {
    outline: none;
  }
}

.iconPlusContainer {
  transform: scale(1.1, 1);
  padding: 6px;
  background: #3c5186;
  border-radius: 8px;
  margin: 0;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #8e609f;
    .iconPlus {
      color: #c6b4ce;
      transform: scale(1.15, 1.15);
    }
  }
}

#addTeamButton {
  font-size: 15px;
  font-weight: 700;
  max-width: 110px;
}

#closeFormButton {
  background: #9b72aa;
  border-color: #9a70a9;
  font-size: 15px;
  font-weight: 700;
  max-width: 110px;

  &:hover {
    background: #fff5de;
    color: #9a70a9;
  }
}

.modalButtons {
  margin: 0 auto;
  padding: 12px 0;
  max-width: 280px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
