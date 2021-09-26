<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main v-if="getStartedOnIndexPage">
      <div class="settings">
        <div class="teams-container box-shadow-effect">
          <h3>{{ strings.teams }}</h3>
          <div id="teams-table">
            <table style="width: 100%">
              <tr id="team-placeholder" v-if="this.currentTeams.length === 0">
                {{
                  strings.addTeamsToStart
                }}
              </tr>
              <tr
                v-for="team in this.currentTeams"
                :key="team.name"
                @click="prepareEditing(team.name)"
              >
                <td id="logo-container" class="pl-2">
                  <img
                    :src="team.logo"
                    id="team-logo"
                    alt="team logo"
                    @load="handleImgLoading"
                  />
                </td>
                <td id="team-name">{{ team.name }}</td>
                <td id="team-players" class="pr-4 pt-3">
                  <div
                    id="players"
                    v-for="player in team.players"
                    :key="player"
                  >
                    <p>{{ player }}</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <div
            v-if="mobileScreen"
            class="icon-plus-container"
            @click="
              selectedLogoUrl = '';
              openEmptyTeamModal();
            "
          >
            <fa class="icon-plus" icon="plus"></fa>
          </div>
          <div
            v-else
            class="icon-plus-container"
            v-b-tooltip.hover.right="strings.tooltipAddTeam"
            @click="
              selectedLogoUrl = '';
              openEmptyTeamModal();
            "
          >
            <fa class="icon-plus" icon="plus"></fa>
          </div>

          <b-modal
            id="add-team-modal"
            class="add-team-modal"
            ref="team-modal"
            hide-footer
            hide-header
            centered
          >
            <div id="add-team-form">
              <b-form-input
                class="mb-3 team-name-input"
                v-model.trim="newTeamName"
                :placeholder="strings.enterTeamName"
                autocomplete="off"
              ></b-form-input>

              <b-modal
                id="logo-modal"
                class="logo-modal"
                ref="logo-modal"
                hide-footer
                hide-header
                centered
              >
                <LogoSelection @logoSelected="setSelectedLogo" />
              </b-modal>

              <p v-if="selectedLogoUrl">
                <img
                  :src="selectedLogoUrl"
                  id="selected-logo"
                  alt="selected-logo"
                />
              </p>

              <div
                v-if="!this.selectedLogoUrl"
                @click="$bvModal.show('logo-modal')"
              >
                <BaseButton
                  id="choose-logo-button"
                  class="mb-2 mt-3"
                  :buttonText="strings.chooseLogo"
                />
              </div>
              <div v-else @click="$bvModal.show('logo-modal')">
                <BaseButton
                  id="choose-logo-button"
                  :buttonText="strings.changeLogo"
                />
              </div>

              <b-form-select
                @change="setMarginBottom"
                id="select-number-of-players"
                class="select-form"
                v-model="numberOfPlayers"
                :options="
                  chosenLanguage === 'english'
                    ? optionsEnglish
                    : optionsCroatian
                "
              ></b-form-select>

              <div class="players-container">
                <div
                  class="players-list"
                  v-for="index in numberOfPlayers"
                  :key="index"
                >
                  <p class="pr-2 mt-3">{{ strings.player }} {{ index }}:</p>
                  <b-form-input
                    class="name-input"
                    v-model.trim="names[index - 1]"
                    @keyup.enter="addTeamMethod()"
                    :placeholder="strings.enterPlayerName"
                    autocomplete="off"
                  ></b-form-input>
                </div>
              </div>
            </div>

            <p class="error-message" v-if="unfinishedForm">
              {{ strings.emptyValues }}
            </p>
            <p class="error-message" v-if="areDuplicateTeamNames">
              {{ strings.duplicateTeamNames }}
            </p>
            <p class="error-message" v-if="areDuplicatePlayerNames">
              {{ strings.duplicatePlayerNames }}
            </p>

            <div class="modal-buttons">
              <div
                @click="
                  $bvModal.hide('add-team-modal');
                  clearForm();
                "
              >
                <BaseButton
                  id="close-form-button"
                  :buttonText="strings.cancel"
                />
              </div>

              <div v-if="!editingTeam" @click="addTeamMethod">
                <BaseButton
                  id="confirm-form-button"
                  :buttonText="strings.addTeam"
                />
              </div>
              <div v-else @click="addTeamMethod">
                <BaseButton
                  id="confirm-form-button"
                  :buttonText="strings.confirm"
                />
              </div>
            </div>

            <div
              v-if="editingTeam"
              id="delete-team-container"
              @click="deleteTeam"
            >
              <BaseButton
                id="delete-team-button"
                :buttonText="strings.deleteTeam"
              />
            </div>
          </b-modal>
        </div>

        <div class="settings-container box-shadow-effect">
          <h3>{{ strings.settings }}</h3>
          <div class="slider">
            {{ strings.targetResult }}: <span>{{ targetResult }}</span>
          </div>
          <b-form-input
            v-model="targetResult"
            @change="setTargetResult(+targetResult)"
            type="range"
            class="custom-range"
            min="30"
            max="120"
            step="5"
          ></b-form-input>

          <div class="slider mt-4">
            {{ strings.duration }}: <span>{{ duration }}</span>
          </div>
          <b-form-input
            v-model="duration"
            @change="setDurationOfRound(+duration)"
            class="custom-range"
            type="range"
            min="30"
            max="90"
            step="10"
          ></b-form-input>

          <div id="checkbox-container" class="mt-4">
            {{ strings.recordingSound }}
            <input
              type="checkbox"
              class="checkbox"
              name="checkbox"
              v-model="recordingSelected"
            />
            <label
              class="label mt-2"
              name="label"
              @click="
                updateRecordingCheckbox();
                updateCheckboxColors();
              "
            >
              <div class="ball"></div>
            </label>
          </div>
        </div>
      </div>

      <div v-if="this.currentTeams.length >= 2" @click="clearPreviousGame()">
        <BaseButton id="startBtn" :buttonText="strings.startGame" to="/game" />
      </div>

      <h2 v-else>{{ strings.thereMustBe }}</h2>
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
      optionsEnglish: [
        { value: null, text: 'Select number of players', disabled: true },
        { value: 2, text: '2 players' },
        { value: 3, text: '3 players' },
        { value: 4, text: '4 players' },
      ],
      optionsCroatian: [
        { value: null, text: 'Odaberite broj igrača', disabled: true },
        { value: 2, text: '2 igrača' },
        { value: 3, text: '3 igrača' },
        { value: 4, text: '4 igrača' },
      ],
      names: [],
      unfinishedForm: false,
      areDuplicateTeamNames: false,
      areDuplicatePlayerNames: false,
      editingTeam: false,
      previousTeamName: '',
      targetResult: '60',
      duration: '60',
      mobileScreen: false,
      isLoading: true,
      strings: {},
      selectedLogoUrl: '',
      imgLoaded: 0,
      recordingSelected: false,
    };
  },
  computed: {
    ...mapGetters([
      'getStartedOnIndexPage',
      'getDurationOfRound',
      'getTargetResult',
    ]),
    ...mapState(['currentTeams']),
    ...mapState('colors', ['colors']),
    ...mapState(['isDarkMode', 'chosenLanguage']),
    ...mapState('recordings', ['enabledRecording']),
  },
  created() {
    !this.getStartedOnIndexPage
      ? this.$router.push({ path: '/' })
      : (this.translate(),
        (this.mobileScreen = screen.width < 1000 ? true : false),
        this.setGameInProgress(false));

    this.duration = this.getDurationOfRound;
    this.targetResult = this.getTargetResult;
    this.recordingSelected = this.enabledRecording;
  },
  mounted() {
    document.body.classList[this.isDarkMode ? 'add' : 'remove']('dark-mode');

    if (this.currentTeams.length === 0) {
      this.isLoading = false;
    }
    this.updateCheckboxColors();
  },
  methods: {
    ...mapMutations([
      'addTeam',
      'editTeam',
      'setTargetResult',
      'setDurationOfRound',
      'clearPreviousGame',
      'deleteTeamByIndex',
      'setGameInProgress',
    ]),
    ...mapMutations('recordings', ['setEnabledRecording']),

    addTeamMethod() {
      if (
        !this.newTeamName ||
        this.names.length !== this.numberOfPlayers ||
        !this.checkIfNamesExist() ||
        !this.selectedLogoUrl
      ) {
        this.unfinishedForm = true;
        this.areDuplicateTeamNames = false;
        this.areDuplicatePlayerNames = false;
      } else if (this.checkForDuplicateTeamNames()) {
        this.areDuplicateTeamNames = true;
        this.unfinishedForm = false;
        this.areDuplicatePlayerNames = false;
      } else if (this.checkForDuplicatePlayerNames()) {
        this.areDuplicatePlayerNames = true;
        this.unfinishedForm = false;
        this.areDuplicateTeamNames = false;
      } else {
        this.isLoading = true;
        // const num = Math.floor(Math.random() * this.colors.length);
        // const color = this.colors[num];
        const newTeam = {
          // set random colors with initial letters as a logo
          // logo: `https://avatar.oxro.io/avatar.svg?name=${this.newTeamName}&caps=1&fontSize=200&bold=true&background=${color.bg}&color=${color.text}`,
          name: this.newTeamName,
          logo: this.selectedLogoUrl,
          players: this.names,
          points: 0,
        };
        const idx = this.currentTeams.findIndex(
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
        this.isLoading = false;
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
        this.currentTeams.find((t) => t.name === teamName)
      );
      this.currentTeamIndex = this.currentTeams.findIndex(
        (t) => t.name === teamName
      );
      this.newTeamName = foundTeam.name;
      this.names = foundTeam.players;
      this.numberOfPlayers = foundTeam.players.length;
      this.editingTeam = true;
      this.previousTeamName = teamName;
      this.selectedLogoUrl = foundTeam.logo;
      this.$refs['team-modal'].show();
      this.unfinishedForm = false;
      this.areDuplicateTeamNames = false;
      this.areDuplicatePlayerNames = false;
    },
    openEmptyTeamModal() {
      this.clearForm();
      this.$refs['team-modal'].show();
      this.editingTeam = false;
    },
    checkForDuplicateTeamNames() {
      for (const [idx, team] of this.currentTeams.entries()) {
        if (this.editingTeam && idx === this.currentTeamIndex) {
          continue;
        } else if (team.name === this.newTeamName) {
          return true;
        }
      }
      return false;
    },
    checkForDuplicatePlayerNames() {
      return !(this.names.length === new Set(this.names).size);
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
      this.areDuplicateTeamNames = false;
      this.areDuplicatePlayerNames = false;
    },
    setSelectedLogo(url) {
      this.selectedLogoUrl = url;
      this.$refs['logo-modal'].hide();
    },
    setMarginBottom() {
      document.getElementById(
        'select-number-of-players'
      ).style.marginBottom = `${this.numberOfPlayers * 4}px`;
    },
    handleImgLoading() {
      this.imgLoaded++;
      if (this.imgLoaded === this.currentTeams.length) {
        this.isLoading = false;
      }
    },
    updateRecordingCheckbox() {
      this.recordingSelected = !this.recordingSelected;
      this.setEnabledRecording(this.recordingSelected);
    },
    updateCheckboxColors() {
      const label = document.getElementsByName('label')[0];

      if (!label) {
        return;
      }

      if (this.isDarkMode) {
        this.recordingSelected
          ? (label.style.backgroundColor = '#bb86fc')
          : (label.style.backgroundColor = '#e6e6e6');
      } else {
        this.recordingSelected
          ? (label.style.backgroundColor = '#47619e')
          : (label.style.backgroundColor = '#b3b3b3');
      }
    },
    translate() {
      this.chosenLanguage === 'english'
        ? ((this.strings.teams = 'Teams'.toUpperCase()),
          (this.strings.addTeamsToStart = 'Add teams to start the game.'),
          (this.strings.tooltipAddTeam = 'Add a new team!'),
          (this.strings.emptyValues = 'You have some empty values!'),
          (this.strings.cancel = 'Cancel'),
          (this.strings.addTeam = 'Add team'),
          (this.strings.confirm = 'Confirm'),
          (this.strings.deleteTeam = 'Delete team'),
          (this.strings.settings = 'Settings'.toUpperCase()),
          (this.strings.targetResult = 'Target result'),
          (this.strings.duration = 'Duration of the round'),
          (this.strings.startGame = 'Start game'),
          (this.strings.thereMustBe = 'There must be at least 2 teams!'),
          (this.strings.enterTeamName = 'Enter team name'),
          (this.strings.enterPlayerName = "Enter player's name"),
          (this.strings.player = 'Player'),
          (this.strings.chooseLogo = 'Choose logo'),
          (this.strings.changeLogo = 'Change logo'),
          (this.strings.recordingSound = 'Sound recording during the round'),
          (this.strings.duplicateTeamNames = 'Team name already exists!'),
          (this.strings.duplicatePlayerNames =
            'Player names in a team has to be unique!'))
        : ((this.strings.teams = 'Ekipe'.toUpperCase()),
          (this.strings.addTeamsToStart =
            'Dodajte ekipe kako bi započeli igru.'),
          (this.strings.tooltipAddTeam = 'Dodaj novu ekipu!'),
          (this.strings.emptyValues = 'Nisu unesena sva polja!'),
          (this.strings.cancel = 'Odustani'),
          (this.strings.addTeam = 'Dodaj'),
          (this.strings.confirm = 'Potvrdi'),
          (this.strings.deleteTeam = 'Izbriši ekipu'),
          (this.strings.settings = 'Postavke'.toUpperCase()),
          (this.strings.targetResult = 'Ciljni rezultat'),
          (this.strings.duration = 'Vrijeme trajanja runde'),
          (this.strings.startGame = 'Započni igru'),
          (this.strings.thereMustBe = 'Trebaju se dodati barem 2 ekipe!'),
          (this.strings.enterTeamName = 'Unesite ime ekipe'),
          (this.strings.enterPlayerName = 'Unesite ime igrača'),
          (this.strings.player = 'Igrač'),
          (this.strings.chooseLogo = 'Izaberi logo'),
          (this.strings.changeLogo = 'Promijeni logo'),
          (this.strings.recordingSound = 'Snimanje zvuka tijekom runde'),
          (this.strings.duplicateTeamNames = 'Ime ekipe već postoji!'),
          (this.strings.duplicatePlayerNames =
            'Imena igrača u timu moraju biti jedinstvena!'));
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
  max-width: 1050px;
  color: #374b7b;

  #startBtn {
    margin-bottom: 40px;
  }
}

main > * {
  margin: 20px;
}

.box-shadow-effect {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
}

.settings {
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: space-evenly;
}
.settings > * {
  margin: 20px;
}

.teams-container {
  padding: 23px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 580px;

  h3 {
    color: #374b7b;
    font-weight: 700;
    margin-bottom: 14px;
  }
}

.select-form,
.team-name-input {
  max-width: 250px;
  transform: scale(1.2);
}

.select-form {
  margin-top: 10px;
  position: relative;
  top: 14px;
  margin-bottom: 2px;
}

#add-team-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  font-family: 'Poppins', sans-serif;
  margin: 14px 0;

  #selected-logo {
    position: relative;
    top: 6px;
    margin-bottom: 2px;
    max-width: 70px;
    max-height: 70px;
    border-radius: 8px;
  }

  #choose-logo-button {
    background-color: #374b7b;
    color: #f5f5f5;
    font-size: 15px;
    font-weight: 600;
    max-width: 150px;
    transform: scale(1.13);
    margin-top: 5px;

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

  .select-form {
    color: #374b7b;
    font-weight: 500;
  }

  .team-name-input {
    color: #374b7b;
    font-weight: 700;
  }
}

.error-message {
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
  transform: scale(1.18);
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
      transform: scale(1.15);
    }
  }
}

#confirm-form-button {
  color: #f5f5f5;
  background: #374b7b;
  transform: scale(1.2);
  font-size: 15px;
  font-weight: 700;
  max-width: 110px;

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
  transform: scale(1.2);

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
  width: 580px;
  padding: 10px 0;

  #team-placeholder {
    user-select: none;
    color: #374b7b;
    text-align: center;
    font-size: 22px;

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

  #team-players {
    font-size: 20px;

    #players {
      line-height: 0.5;
    }
  }

  #logo-container {
    padding-right: 10px;
    padding: 10px 10px 10px 0;

    #team-logo {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 80px;
      max-height: 80px;
      border-radius: 8px;
    }
  }
}

.settings-container {
  padding: 23px 28px 30px;
  border-radius: 8px;
  min-width: 360px;

  #checkbox-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    text-align: center;

    .label {
      transform: scale(1.22);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      border-radius: 50px;
      height: 26px;
      width: 50px;
      position: relative;
      top: 5px;
    }

    .ball {
      background-color: white;
      position: absolute;
      height: 22px;
      top: 2px;
      left: 2px;
      border-radius: 50%;
      width: 22px;
      transition: transform 0.2s linear;
    }

    .checkbox {
      opacity: 0;
      position: absolute;
    }

    .checkbox:checked + .label .ball {
      transform: translateX(24px);
    }

    .label {
      cursor: pointer;
    }
  }

  h3 {
    text-align: center;
    margin-bottom: 16px;
    font-weight: 700;
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
      max-width: 30px;
    }
  }
}

.custom-range::-webkit-slider-thumb {
  background: #385494;
  box-shadow: none;

  &:active,
  &:hover {
    background: #6b87c7;
  }
}

.custom-range::-moz-range-thumb {
  background: #385494;

  &:active,
  &:hover {
    background: #6b87c7;
  }
}

.custom-range::-ms-thumb {
  background: #385494;

  &:active,
  &:hover {
    background: #6b87c7;
  }
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

    #team-placeholder {
      color: #f2f2f2;
    }

    tr:hover {
      background: hsl(267, 94%, 85%);
      color: rgb(43, 43, 43);
    }
  }

  .settings-container {
    background: #303136;

    #checkbox-container {
      .ball {
        background-color: #242529;
      }
    }

    .custom-range::-webkit-slider-thumb {
      background: hsl(267, 100%, 74%);

      &:active,
      &:hover {
        background: hsl(267, 100%, 65%);
      }
    }

    .custom-range::-moz-range-thumb {
      background: hsl(267, 100%, 74%);

      &:active,
      &:hover {
        background: hsl(267, 100%, 65%);
      }
    }

    .custom-range::-ms-thumb {
      background: hsl(267, 100%, 74%);

      &:active,
      &:hover {
        background: hsl(267, 100%, 65%);
      }
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

@media only screen and (max-width: 1000px) and (min-width: 600px) {
  .team-name-input,
  .select-form {
    width: 256px;
  }

  .modal-buttons {
    width: 314px;
  }
}

@media only screen and (max-width: 1000px) {
  main {
    h2 {
      font-size: 5.1vw;
    }
  }

  .settings {
    flex-direction: column;
  }

  .teams-container {
    min-width: 91vw;
    width: auto;

    #teams-table {
      min-width: 91vw;
      width: auto;
    }
  }

  .settings-container {
    min-width: 91vw;
    padding: 24px 12vw;

    .custom-range {
      transform: scale(1.15);
    }
  }

  .select-form,
  .team-name-input {
    max-width: 60vw;
    transform: scale(1.3);
  }

  .team-name-input {
    margin-top: 4px;
  }

  .select-form {
    margin-top: 14px;
  }

  .players-container {
    transform: scale(1.34);
    margin-top: 40px;
  }

  .modal-buttons {
    margin-top: 46px;
    max-width: 66vw;

    #close-form-button {
      transform: scale(1.4);
    }

    #confirm-form-button {
      transform: scale(1.4);
    }
  }

  #delete-team-container {
    #delete-team-button {
      margin-top: 8px;
      margin-bottom: 10px;
      transform: scale(1.2);
      max-width: 63vw;
    }
  }
}
</style>
