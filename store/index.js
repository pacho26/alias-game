export const state = () => ({
  loserTeams: [],
  currentTeams: [
    {
      name: 'Chelsea',
      players: ['Kepa', 'Timo'],
      logo: 'https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fchelsea.png?alt=media&token=44556fdc-0ccc-40f0-ad52-0708298c6e7f',
      points: 0,
      explainingPlayerIndex: 0,
    },
    {
      name: 'Manchester United',
      players: ['David', 'Luke'],
      logo: 'https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fmanchester-united.png?alt=media&token=f62e0b41-8c15-4579-88ea-a109d5a3c65e',
      points: 0,
      explainingPlayerIndex: 0,
    },
    {
      name: 'Milan',
      players: ['Ante', 'Zlatan'],
      logo: 'https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fmilan.png?alt=media&token=3f16dc0b-b429-41d1-b268-f808e3d6f73f',
      points: 0,
      explainingPlayerIndex: 0,
    },
  ],
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
    // set the next player who explains
    state.currentTeams[state.currentTeamIndex].explainingPlayerIndex + 1 ===
    state.currentTeams[state.currentTeamIndex].players.length
      ? (state.currentTeams[state.currentTeamIndex].explainingPlayerIndex = 0)
      : state.currentTeams[state.currentTeamIndex].explainingPlayerIndex++;
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
    state.currentTeamIndex = 0;
    state.hasWinner = false;
    state.loserTeams = [];
    for (const team of state.currentTeams) {
      team.points = 0;
      team.explainingPlayerIndex = 0;
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
  changeGameScreenStatus(state, status) {
    state.isGameScreen = status;
  },
  startingFromIndexPage(state) {
    state.startedOnIndexPage = true;
  },
};
