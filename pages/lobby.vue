<template>
  <main>
    <div class="teams-container">
      <h3>CURRENT TEAMS:</h3>
      <div id="teams-table">
        <table style="width: 100%">
          <tr v-for="team in this.currentTeams" :key="team.name">
            <td id="logo-container" class="pl-4">
              <img :src="team.logo" id="team-logo" alt="team logo" />
            </td>
            <td id="team-name">{{ team.name }}</td>
            <td class="px-4">{{ team.players.join(', ') }}</td>
          </tr>
        </table>
      </div>

      <div
        class="icon-plus-container"
        v-b-tooltip.hover.right="'Add a new team!'"
        v-b-modal.add-team-modal
      >
        <fa class="icon-plus" icon="plus"></fa>
      </div>

      <b-modal
        id="add-team-modal"
        ref="my-modal"
        title="New team"
        hide-footer
        hide-header
      >
        <div id="add-team-form">
          <b-form-input
            class="mb-3 team-name-input"
            v-model.trim="newTeamName"
            placeholder="Enter team name"
            autocomplete="off"
          ></b-form-input>
          <b-form-select
            class="select-form"
            v-model="numberOfPlayers"
            :options="options"
          ></b-form-select>

          <div class="players-container">
            <div
              class="players-list"
              v-for="index in numberOfPlayers"
              :key="index"
            >
              <p class="pr-2 mt-3">Player {{ index }}:</p>
              <b-form-input
                class="name-input"
                v-model.trim="names[index - 1]"
                @keyup.enter="addTeamMethod()"
                placeholder="Enter player's name"
                autocomplete="off"
              ></b-form-input>
            </div>
          </div>
        </div>

        <p id="error-message" v-if="unfinishedForm">
          You have some empty values!
        </p>

        <div class="modal-buttons">
          <div
            @click="
              $bvModal.hide('add-team-modal');
              clearForm();
            "
          >
            <BaseButton id="close-form-button" :buttonText="'Cancel'" />
          </div>

          <div @click="addTeamMethod()">
            <BaseButton id="add-team-button" :buttonText="'Add team'" />
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

.teams-container {
  padding: 20px 0;
  background: #fff5de;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  h3 {
    color: #374b7b;
    font-weight: 600;
    margin-bottom: 12px;
  }
}

.table {
  background: #dcd1e1;
  color: #2f406a;
}

.name-input {
  max-width: 183px;
}

.select-form,
.team-name-input {
  max-width: 250px;
}

#add-team-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  font-family: 'Poppins', sans-serif;
  margin: 14px 0;
}

#error-message {
  color: #8e609f;
  font-weight: 500;
  text-align: center;
}

.players-list {
  display: flex;
  justify-content: center;
  align-items: center;
}

.players-container {
  margin-top: 20px;
}

.icon-plus-container {
  transform: scale(1.1, 1);
  padding: 6px;
  background: #3c5186;
  border-radius: 8px;
  margin-top: 20px;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  .icon-plus {
    font-size: 30px;
    color: #fff5de;
    border: none;
    margin: 0;
    transition: 0.2s ease-in-out;

    &:focus {
      outline: none;
    }
  }

  &:hover {
    background: #8e609f;
    .icon-plus {
      color: #c6b4ce;
      transform: scale(1.15, 1.15);
    }
  }
}

#add-team-button {
  font-size: 15px;
  font-weight: 700;
  max-width: 110px;
}

#close-form-button {
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

.modal-buttons {
  margin: 0 auto;
  padding: 12px 0;
  max-width: 280px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

#teams-table {
  border-radius: 8px;
  font-size: 24px;
  color: #2f406a;

  tr:hover {
    background: #cad2e7;
    cursor: pointer;
  }

  #team-name {
    font-weight: 600;
    padding-right: 36px;
    padding-left: 4px;
  }

  #logo-container {
    padding-right: 10px;
    padding: 10px 10px 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    #team-logo {
      max-width: 80px;
      max-height: 80px;
      border-radius: 8px;
    }
  }
}
</style>
