<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main>
      <div class="settings">
        <div class="teams-container box-shadow-effect">
          <h3>CURRENT TEAMS</h3>
          <div id="teams-table">
            <table style="width: 100%">
              <tr
                id="team-placeholder"
                v-if="this.getCurrentTeams.length === 0"
              >
                Add teams to start the game.
              </tr>
              <tr
                v-for="team in this.getCurrentTeams"
                :key="team.name"
                @click="prepareEditing(team.name)"
              >
                <td id="logo-container" class="pl-4">
                  <img
                    :src="team.logo"
                    id="team-logo"
                    alt="team logo"
                    @load="onImageLoad"
                  />
                </td>
                <td id="team-name">{{ team.name }}</td>
                <td class="px-4">{{ team.players.join(', ') }}</td>
              </tr>
            </table>
          </div>

          <div
            v-if="mobileScreen"
            class="icon-plus-container"
            @click="openEmptyTeamModal"
          >
            <fa class="icon-plus" icon="plus"></fa>
          </div>
          <div
            v-else
            class="icon-plus-container"
            v-b-tooltip.hover.right="'Add a new team!'"
            @click="openEmptyTeamModal"
          >
            <fa class="icon-plus" icon="plus"></fa>
          </div>

          <b-modal
            id="add-team-modal"
            class="add-team-modal"
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
                <BaseButton
                  id="confirm-form-button"
                  class="add-team-button"
                  :buttonText="'Add team'"
                />
              </div>
              <div v-else @click="addTeamMethod">
                <BaseButton
                  id="confirm-form-button"
                  class="add-team-button"
                  :buttonText="'Confirm'"
                />
              </div>
            </div>

            <div
              v-if="editingTeam"
              id="delete-team-container"
              @click="deleteTeam"
            >
              <BaseButton id="delete-team-button" :buttonText="'Delete team'" />
            </div>
          </b-modal>
        </div>

        <div class="sliders box-shadow-effect">
          <h3>SETTINGS</h3>
          <div class="slider">
            Target result: <span>{{ targetResult }}</span>
          </div>
          <b-form-input
            v-model="targetResult"
            type="range"
            class="custom-range"
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
              Selected language:
              <span>{{
                selectedLanguage.charAt(0).toUpperCase() +
                selectedLanguage.slice(1)
              }}</span>
            </p>
            <div class="flags">
              <img
                src="../assets/countryFlags/croatia.svg"
                alt="Croatia flag"
                id="croatia-flag"
                class="flag"
                @click="
                  selectedLanguage = 'croatian';
                  selectFlag();
                "
              />
              <img
                src="../assets/countryFlags/united-kingdom.svg"
                alt="United Kingdom flag"
                id="united-kingdom-flag"
                class="flag"
                @click="
                  selectedLanguage = 'english';
                  selectFlag();
                "
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="this.getCurrentTeams.length >= 2" @click="setConfiguration">
        <BaseButton id="startBtn" :buttonText="'Start game'" :to="'/game'" />
      </div>

      <h2 v-else>There must be at least 2 teams!</h2>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      newTeamName: '',
      currentTeamIndex: '',
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
      selectedLanguage: 'croatian',
      mobileScreen: false,
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(['getCurrentTeams']),
    ...mapState('colors', ['colors']),
    ...mapState(['isDarkMode']),
  },
  created() {
    this.mobileScreen = screen.width < 1000 ? true : false;
    this.setGameInProgress(false);
  },
  mounted() {
    this.isDarkMode
      ? document.body.classList.add('dark-mode')
      : document.body.classList.remove('dark-mode');
  },
  methods: {
    ...mapMutations([
      'addTeam',
      'editTeam',
      'setTargetResult',
      'setDurationOfRound',
      'setLanguage',
      'clearPreviousGame',
      'deleteTeamByIndex',
      'setGameInProgress',
    ]),

    addTeamMethod() {
      if (
        !this.newTeamName ||
        this.names.length !== this.numberOfPlayers ||
        !this.checkIfNamesExist()
      ) {
        this.unfinishedForm = true;
      } else {
        this.isLoading = true;
        const num = Math.floor(Math.random() * this.colors.length);
        const color = this.colors[num];
        const newTeam = {
          logo: `https://avatar.oxro.io/avatar.svg?name=${this.newTeamName}&caps=1&fontSize=200&bold=true&background=${color.bg}&color=${color.text}`,
          name: this.newTeamName,
          players: this.names,
          points: 0,
          explainingPlayerIndex: 0,
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
    deleteTeam() {
      this.isLoading = true;
      this.deleteTeamByIndex(this.currentTeamIndex);
      this.$refs['team-modal'].hide();
      this.isLoading = false;
    },
    prepareEditing(teamName) {
      const foundTeam = _.cloneDeep(
        this.getCurrentTeams.find((t) => t.name === teamName)
      );
      this.currentTeamIndex = this.getCurrentTeams.findIndex(
        (t) => t.name === teamName
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
        case 'croatian':
          document.getElementById('croatia-flag').style.opacity = '1';
          document.getElementById('united-kingdom-flag').style.opacity = '0.5';
          break;
        case 'english':
          document.getElementById('croatia-flag').style.opacity = '0.5';
          document.getElementById('united-kingdom-flag').style.opacity = '1';
          break;
      }
    },
    setConfiguration() {
      this.setTargetResult(+this.targetResult);
      this.setDurationOfRound(+this.duration);
      this.setLanguage(this.selectedLanguage);
      this.clearPreviousGame();
    },
    onImageLoad() {
      this.isLoading = false;
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

.custom-range::-webkit-slider-thumb {
  background: hsl(267, 100%, 73%);
}

.custom-range::-moz-range-thumb {
  background: hsl(267, 100%, 73%);
}

.custom-range::-ms-thumb {
  background: hsl(267, 100%, 73%);
}

.box-shadow-effect {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  max-width: 570px;
  min-width: 430px;

  h3 {
    color: #374b7b;
    font-weight: 600;
    margin-bottom: 14px;
  }
}

.select-form,
.team-name-input {
  max-width: 250px;
  transform: scale(1.2, 1.2);
}

.select-form {
  margin-top: 10px;
}

#add-team-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  font-family: 'Poppins', sans-serif;
  margin: 14px 0;

  .select-form {
    color: #374b7b;
    font-weight: 500;
  }

  .team-name-input {
    color: #374b7b;
    font-weight: 700;
  }
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
  transform: scale(1.18, 1.18);
  margin-top: 34px;
  color: #374b7b;
  font-weight: 600;

  .name-input {
    color: #374b7b;
    font-weight: 500;
    max-width: 183px;
  }
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
    color: #f2f2f2;
    border: none;
    margin: 0;
    transition: 0.2s ease-in-out;

    &:focus {
      outline: none;
    }
  }

  &:hover {
    box-shadow: 0 5px 15px rgba(114, 137, 192, 0.8);

    .icon-plus {
      transform: scale(1.15, 1.15);
    }
  }
}

.add-team-button {
  font-size: 15px;
  font-weight: 700;
  max-width: 110px;
}

#confirm-form-button {
  color: #f5f5f5;
  background: #374b7b;
  transform: scale(1.2, 1.2);

  &:hover {
    background: #e2e2e2;
    color: #374b7b;
    box-shadow: 0 5px 15px rgba(114, 137, 192, 0.8);
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }
}

#close-form-button {
  background-color: #8e609f;
  color: #f5f5f5;
  font-size: 15px;
  font-weight: 700;
  max-width: 110px;
  transform: scale(1.2, 1.2);

  &:hover {
    background: #e2e2e2;
    color: #80568f;
    box-shadow: 0 5px 15px rgba(114, 137, 192, 0.8);
  }

  &:focus {
    outline: 0;
    box-shadow: none;
  }
}

#delete-team-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0;

  #delete-team-button {
    background: #f5f5f5;
    color: #e05260;
    border-width: 2px;
    border-color: #e05260;
    font-size: 15px;
    font-weight: 700;
    max-width: 280px;
    min-width: 130px;
    transform: scale(1.09, 1.11);
    margin: 2px 0;

    &:hover {
      color: #f5f5f5;
      background: #e05260;
    }
  }
}

.modal-buttons {
  margin: 0 auto;
  margin-top: 24px;
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
  max-width: 570px;
  min-width: 430px;
  padding: 10px 0;

  #team-placeholder {
    user-select: none;
    color: #374b7b;
    text-align: center;

    &:hover {
      background: none;
      cursor: auto;
    }
  }

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

.custom-range::-webkit-slider-thumb {
  background: #385494;
}

.custom-range::-moz-range-thumb {
  background: #385494;
}

.custom-range::-ms-thumb {
  background: #385494;
}

.dark-mode {
  main {
    color: #f2f2f2;
  }

  .box-shadow-effect {
    box-shadow: none;
  }

  .teams-container {
    background: #303136;

    h3 {
      color: #f2f2f2;
    }
  }

  #teams-table {
    color: #f2f2f2;

    tr:hover {
      background: hsl(267, 94%, 85%);
      color: rgb(43, 43, 43);
    }
  }

  .sliders {
    background: #303136;

    .custom-range::-webkit-slider-thumb {
      background: hsl(267, 100%, 74%);
    }

    .custom-range::-moz-range-thumb {
      background: hsl(267, 100%, 74%);
    }

    .custom-range::-ms-thumb {
      background: hsl(267, 100%, 74%);
    }
  }

  .icon-plus-container {
    background: #bc85ff;

    .icon-plus {
      color: #303136;
    }

    &:hover {
      box-shadow: 0 5px 15px rgba(114, 137, 192, 0.4);

      .icon-plus {
        color: #f2f2f2;
      }
    }
  }
}

@media only screen and (max-width: 1000px) {
  .settings {
    flex-direction: column;
  }
}

@media only screen and (max-width: 600px) {
  .select-form,
  .team-name-input {
    max-width: 60vw;
    transform: scale(1.3, 1.3);
  }

  .team-name-input {
    margin-top: 4px;
  }

  .select-form {
    margin-top: 14px;
  }

  .players-container {
    transform: scale(1.34, 1.34);
    margin-top: 40px;
  }

  .modal-buttons {
    margin-top: 46px;
    max-width: 66vw;

    #close-form-button {
      transform: scale(1.4, 1.4);
    }

    #confirm-form-button {
      transform: scale(1.4, 1.4);
    }
  }

  #delete-team-container {
    #delete-team-button {
      margin-top: 8px;
      margin-bottom: 10px;
      transform: scale(1.2, 1.2);
      max-width: 63vw;
    }
  }
}
</style>
