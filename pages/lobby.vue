<template>
  <main>
    <div class="settings">
      <div class="teams-container">
        <h3>CURRENT TEAMS</h3>
        <div id="teams-table">
          <table style="width: 100%">
            <tr
              v-for="team in this.getCurrentTeams"
              :key="team.name"
              @click="prepareEditing(team.name)"
            >
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
          @click="openEmptyTeamModal"
        >
          <fa class="icon-plus" icon="plus"></fa>
        </div>

        <b-modal
          id="add-team-modal"
          ref="team-modal"
          title="New team"
          hide-footer
          hide-header
          centered
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

            <div v-if="!editingTeam" @click="addTeamMethod">
              <BaseButton id="add-team-button" :buttonText="'Add team'" />
            </div>
            <div v-else @click="addTeamMethod">
              <BaseButton id="add-team-button" :buttonText="'Confirm'" />
            </div>
          </div>
        </b-modal>
      </div>

      <div class="sliders">
        <h3>SETTINGS</h3>
        <div class="slider">
          Target result: <span>{{ targetResult }}</span>
        </div>
        <b-form-input
          v-model="targetResult"
          type="range"
          min="30"
          max="120"
          step="5"
        ></b-form-input>

        <div class="slider mt-4">
          Duration of the round: <span>{{ duration }}</span>
        </div>
        <b-form-input
          v-model="duration"
          type="range"
          min="30"
          max="90"
          step="10"
        ></b-form-input>

        <div>
          <p id="selected-language" class="mt-4">
            Selected language: <span>{{ selectedLanguage }}</span>
          </p>
          <div class="flags">
            <img
              src="../assets/countryFlags/croatia.svg"
              alt="Croatia flag"
              id="croatia-flag"
              class="flag"
              @click="
                selectedLanguage = 'Croatian';
                selectFlag();
              "
            />
            <img
              src="../assets/countryFlags/united-kingdom.svg"
              alt="United Kingdom flag"
              id="united-kingdom-flag"
              class="flag"
              @click="
                selectedLanguage = 'English';
                selectFlag();
              "
            />
          </div>
        </div>
      </div>
    </div>

    <BaseButton
      id="startBtn"
      v-if="this.getCurrentTeams.length >= 2"
      :buttonText="'Start game'"
      :to="'/game'"
    />
    <h2 v-else>There must be at least 2 teams!</h2>
  </main>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

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
      editingTeam: false,
      previousTeamName: '',
      targetResult: '60',
      duration: '60',
      selectedLanguage: 'Croatian',
    };
  },
  computed: {
    ...mapGetters(['getCurrentTeams']),
    ...mapState('colors', ['colors']),
  },
  methods: {
    ...mapMutations(['addTeam', 'editTeam']),

    addTeamMethod() {
      if (
        !this.newTeamName ||
        this.names.length !== this.numberOfPlayers ||
        !this.checkIfNamesExist()
      ) {
        this.unfinishedForm = true;
      } else {
        const num = Math.floor(Math.random() * this.colors.length);
        const color = this.colors[num];
        const newTeam = {
          logo: `https://avatar.oxro.io/avatar.svg?name=${this.newTeamName}&caps=1&fontSize=200&bold=true&background=${color.bg}&color=${color.text}`,
          name: this.newTeamName,
          players: this.names,
          points: 0,
          explaining: 0,
        };
        const idx = this.getCurrentTeams.findIndex(
          (t) => t.name === this.previousTeamName
        );

        if (idx >= 0) {
          this.editTeam({
            team: newTeam,
            idx: idx,
          });
          this.previousTeamName = '';
        } else {
          this.addTeam(newTeam);
        }
        this.$refs['team-modal'].hide();
        this.clearForm();
      }
    },
    prepareEditing(teamName) {
      const foundTeam = _.cloneDeep(
        this.getCurrentTeams.find((t) => t.name === teamName)
      );
      this.newTeamName = foundTeam.name;
      this.names = foundTeam.players;
      this.numberOfPlayers = foundTeam.players.length;
      this.editingTeam = true;
      this.previousTeamName = teamName;
      this.$refs['team-modal'].show();
    },
    openEmptyTeamModal() {
      this.clearForm();
      this.$refs['team-modal'].show();
      this.editingTeam = false;
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
    selectFlag() {
      switch (this.selectedLanguage) {
        case 'Croatian':
          document.getElementById('croatia-flag').style.opacity = '1';
          document.getElementById('united-kingdom-flag').style.opacity = '0.5';
          break;
        case 'English':
          document.getElementById('croatia-flag').style.opacity = '0.5';
          document.getElementById('united-kingdom-flag').style.opacity = '1';
          break;
      }
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
  max-width: 1100px;
  color: #374b7b;

  #startBtn {
    margin-bottom: 40px;
  }
}

main > * {
  margin: 20px;
}

.settings {
  display: flex;

  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
}
.settings > * {
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
    margin-bottom: 14px;
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
    background: #a580b3;
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
  background: #fff5de;
  color: #8e609f;
  border-color: #8e609f;
  font-size: 15px;
  font-weight: 700;
  max-width: 110px;

  &:hover {
    color: #fff5de;
    background: #8e609f;
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

.sliders {
  background: #fff5de;
  padding: 22px;
  border-radius: 8px;
  min-width: 360px;

  h3 {
    text-align: center;
    margin-bottom: 14px;
    font-weight: 600;
  }

  .flags {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .flag {
      max-width: 60px;
      cursor: pointer;
      margin: 0;
      transition: 0.2s;

      &:hover {
        transform: scale(1.2, 1.2);
      }
    }

    #united-kingdom-flag {
      opacity: 0.5;
    }
  }

  .slider {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-weight: 800;
      font-size: 26px;
      margin-left: 7px;
    }
  }

  #selected-language {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-weight: 700;
      font-size: 24px;
      margin-left: 7px;
    }
  }
}

@media only screen and (max-width: 1000px) {
  .settings {
    flex-direction: column;
  }
}
</style>
