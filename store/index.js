export const state = () => ({
  currentTeamIndex: 0,
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
});

export const getters = {
  getCurrentTeams(state) {
    return state.currentTeams;
  },
  getCurrentTeamIndex(state) {
    return state.currentTeamIndex;
  },
};

export const mutations = {
  addTeam(state, team) {
    state.currentTeams.push(team);
  },
  editTeam(state, { idx, team }) {
    state.currentTeams[idx] = team;
  },
  continueOnNextTeam(state) {
    state.currentTeamIndex + 1 === state.currentTeams.length
      ? (state.currentTeamIndex = 0)
      : state.currentTeamIndex++;

    state.currentTeams[state.currentTeamIndex] + 1 ===
    state.currentTeams[state.getCurrentTeamIndex].players.length
      ? (state.currentTeams[state.currentTeamIndex].explainingPlayerIndex = 0)
      : state.currentTeams[state.currentTeamIndex].explainingPlayerIndex++;
  },
};

export const actions = {};
