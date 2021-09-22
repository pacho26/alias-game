export const state = () => ({
  loserTeams: [],
  currentTeams: [],
  hasWinner: false,
  currentRound: 1,
  currentTeamIndex: 0,
  targetResult: 60,
  durationOfRound: 60,
  chosenLanguage: 'croatian',
  gameInProgress: false,
  isDarkMode: false,
  isGameScreen: false,
  changingColorTheme: false,
  startedOnIndexPage: false,
});

export const getters = {
  getCurrentTeams(state) {
    return state.currentTeams;
  },
  getCurrentTeamIndex(state) {
    return state.currentTeamIndex;
  },
  getCurrentTeam(state) {
    return state.currentTeams[state.currentTeamIndex];
  },
  getAllTeams(state) {
    let allNames = [];
    let allTeams = [];
    for (const team of state.currentTeams) {
      if (!allNames.includes(team.name)) {
        allNames.push(team.name);
        allTeams.push(team);
      }
    }

    for (const team of state.loserTeams) {
      if (!allNames.includes(team.name)) {
        allNames.push(team.name);
        allTeams.push(team);
      }
    }

    return allTeams;
  },
  getTargetResult(state) {
    return state.targetResult;
  },
  getDurationOfRound(state) {
    return state.durationOfRound;
  },
  getCurrentRound(state) {
    return state.currentRound;
  },
  getChosenLanguage(state) {
    return state.chosenLanguage;
  },
  getHasWinner(state) {
    return state.hasWinner;
  },
  getStartedOnIndexPage(state) {
    return state.startedOnIndexPage;
  },
};

export const mutations = {
  addTeam(state, team) {
    state.currentTeams.push(team);
  },
  editTeam(state, { idx, team }) {
    state.currentTeams[idx] = team;
  },
  deleteTeamByIndex(state, index) {
    state.currentTeams.splice(index, 1);
  },
  setPoints(state, points) {
    state.currentTeams[state.currentTeamIndex].points += points;
  },
  continueOnNextTeam(state) {
    state.currentTeamIndex + 1 === state.currentTeams.length
      ? ((state.currentTeamIndex = 0), state.currentRound++)
      : state.currentTeamIndex++;

    if (state.currentTeamIndex === 0) {
      const maxPoints = state.currentTeams.reduce((prev, current) =>
        prev.points > current.points ? prev : current
      ).points;

      if (maxPoints >= state.targetResult) {
        let teamsWithMaxPoints = [];
        for (const team of state.currentTeams) {
          team.points === maxPoints
            ? teamsWithMaxPoints.push(team)
            : state.loserTeams.push(team);
        }

        if (teamsWithMaxPoints.length === 1) {
          state.hasWinner = true;
          for (const team of state.currentTeams) {
            state.loserTeams.push(team);
          }
        } else if (teamsWithMaxPoints.length > 1) {
          state.currentTeams = teamsWithMaxPoints;
        }
      }
    }
  },
  setTargetResult(state, res) {
    state.targetResult = res;
  },
  setDurationOfRound(state, duration) {
    state.durationOfRound = duration;
  },
  setLanguage(state, language) {
    state.chosenLanguage = language;
  },
  clearPreviousGame(state) {
    state.currentRound = 1;
    state.currentTeamIndex = 0;
    state.hasWinner = false;
    state.loserTeams = [];
    for (const team of state.currentTeams) {
      team.points = 0;
    }
  },
  setCurrentTeams(state, teams) {
    state.currentTeams = teams;
  },
  setGameInProgress(state, isInProgress) {
    state.gameInProgress = isInProgress;
  },
  changeColorTheme(state) {
    state.isDarkMode = !state.isDarkMode;
    state.changingColorTheme = true;
  },
  changeGameScreenStatus(state, bool) {
    state.isGameScreen = bool;
  },
  startingFromIndexPage(state) {
    state.startedOnIndexPage = true;
  },
};
