<template>
  <main>
    <div class="teamsContainer">
      <h3>CURRENT TEAMS:</h3>
      <div id="teamsTable">
        <table style="width: 100%">
          <tr>
            <th>Team name</th>
            <th>Players</th>
          </tr>
          <tr v-for="team in this.currentTeams" :key="team.name">
            <td>{{ team.name }}</td>
            <td>{{ team.players.join(', ') }}</td>
          </tr>
        </table>
      </div>

      <div
        class="iconPlusContainer"
        v-b-tooltip.hover.right="'Add a new team!'"
      >
        <fa class="iconPlus" v-b-modal.addTeamModal icon="plus"></fa>
      </div>

      <b-modal
        id="addTeamModal"
        ref="my-modal"
        title="New team"
        hide-footer
        hide-header
      >
        <div id="addTeamForm">
          <b-form-input
            class="mb-3 teamNameInput"
            v-model.trim="newTeamName"
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
                v-model.trim="names[index - 1]"
                @keyup.enter="addTeamMethod()"
                placeholder="Enter player's name"
                autocomplete="off"
              ></b-form-input>
            </div>
          </div>
        </div>

        <p id="errorMessage" v-if="unfinishedForm">
          You have some empty values!
        </p>

        <div class="modalButtons">
          <div
            @click="
              $bvModal.hide('addTeamModal');
              clearForm();
            "
          >
            <BaseButton id="closeFormButton" :buttonText="'Cancel'" />
          </div>

          <div @click="addTeamMethod()">
            <BaseButton id="addTeamButton" :buttonText="'Add team'" />
          </div>
        </div>
      </b-modal>
    </div>
    <BaseButton
      v-if="this.currentTeams.length >= 2"
      :buttonText="'Start game'"
    />
    <h2 v-else>There must be at least 2 teams!</h2>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      newTeamName: '',
      numberOfPlayers: null,
      options: [
        { value: null, text: 'Select number of players', disabled: true },
        { value: 2, text: '2 players' },
        { value: 3, text: '3 players' },
        { value: 4, text: '4 players' },
      ],
      names: [],
      unfinishedForm: false,
    };
  },
  computed: {
    ...mapGetters(['currentTeams']),
  },
  methods: {
    ...mapActions(['addNewTeam']),

    addTeamMethod() {
      if (
        !this.newTeamName ||
        this.names.length !== this.numberOfPlayers ||
        !this.checkIfNamesExist()
      ) {
        this.unfinishedForm = true;
      } else {
        const newTeam = {
          name: this.newTeamName,
          players: this.names,
        };
        this.addNewTeam(newTeam);
        this.$refs['my-modal'].hide();
        this.clearForm();
      }
    },
    checkIfNamesExist() {
      for (const name of this.names) {
        if (!name) {
          return false;
        }
      }
      return true;
    },
    clearForm() {
      this.newTeamName = '';
      this.numberOfPlayers = null;
      this.names = [];
      this.unfinishedForm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  padding: 20px;
}

main > * {
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

  h3 {
    color: #3c5186;
  }
}

.table {
  background: #dcd1e1;
  color: #2f406a;
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

#errorMessage {
  color: #8e609f;
  font-weight: 500;
  text-align: center;
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
  margin-top: 12px;
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

#teamsTable {
  background: #dcd1e1;
  padding: 16px;
  border-radius: 8px;
  font-size: 24px;
  color: #283558;

  th {
    padding: 0 30px;
    margin-bottom: 4px;
  }

  td {
    padding: 0 30px;
  }

  tr:hover:not(:first-child) {
    background: white;
    cursor: pointer;
  }
}
</style>
