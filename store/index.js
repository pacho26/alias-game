export const state = () => ({
  currentTeams: [
    {
      name: 'Chelsea',
      players: ['Kepa', 'Timo'],
      logo: 'https://upload.wikimedia.org/wikipedia/bs/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
      points: 0,
      explainingPlayerIndex: 0,
    },
    {
      name: 'Manchester United',
      players: ['David', 'Luke'],
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png',
      points: 0,
      explainingPlayerIndex: 0,
    },
    {
      name: 'Milan',
      players: ['Ante', 'Zlatan'],
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1306px-Logo_of_AC_Milan.svg.png',
      points: 0,
      explainingPlayerIndex: 0,
    },
  ],
  hasWiner: false,
  currentTeamIndex: 0,
  targetResult: 60,
  durationOfRound: 60,
  chosenLanguage: 'croatian',
});

export const getters = {
  getCurrentTeams(state) {
    return state.currentTeams;
  },
  getCurrentTeamIndex(state) {
    return state.currentTeamIndex;
  },
  getTargetResult(state) {
    return state.targetResult;
  },
  getDurationOfRound(state) {
    return state.durationOfRound;
  },
  getChosenLanguage(state) {
    return state.chosenLanguage;
  },
  getHasWinner(state) {
    return state.hasWiner;
  },
};

export const mutations = {
  addTeam(state, team) {
    state.currentTeams.push(team);
  },
  editTeam(state, { idx, team }) {
    state.currentTeams[idx] = team;
  },
  setPoints(state, points) {
    state.currentTeams[state.currentTeamIndex].points += points;
  },
  continueOnNextTeam(state) {
    state.currentTeamIndex + 1 === state.currentTeams.length
      ? (state.currentTeamIndex = 0)
      : state.currentTeamIndex++;

    if (state.currentTeamIndex === 0) {
      const winners = _.filter(state.currentTeams, function (t) {
        return t.points >= state.targetResult;
      });

      if (winners.length > 0) {
        state.hasWiner = true;
      }
    }

    state.currentTeams[state.currentTeamIndex].explainingPlayerIndex + 1 ===
    state.currentTeams[state.currentTeamIndex].players.length
      ? (state.currentTeams[state.currentTeamIndex].explainingPlayerIndex = 0)
      : state.currentTeams[state.currentTeamIndex].explainingPlayerIndex++;
  },
  setTargetResult(state, res) {
    state.targetResult = res;
  },
  seDurationOfRound(state, duration) {
    state.durationOfRound = duration;
  },
  setLanguage(state, language) {
    state.chosenLanguage = language;
  },
  clearPreviousGame(state) {
    state.currentTeamIndex = 0;
    state.hasWiner = false;
    for (const team of state.currentTeams) {
      team.points = 0;
      team.explainingPlayerIndex = 0;
    }
  },
};

export const actions = {};
