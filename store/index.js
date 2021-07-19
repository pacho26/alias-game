export const state = () => ({
  currentTeams: [
    {
      name: 'Chelsea',
      players: ['Kepa', 'Timo'],
      logo: 'https://upload.wikimedia.org/wikipedia/bs/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
    },
    {
      name: 'Manchester United',
      players: ['David', 'Luke'],
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png',
    },
    {
      name: 'Milan',
      players: ['Ante', 'Zlatan'],
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1306px-Logo_of_AC_Milan.svg.png',
    },
  ],
});

export const getters = {
  currentTeams(state) {
    return state.currentTeams;
  },
};

export const mutations = {
  addTeam(state, team) {
    state.currentTeams.push(team);
  },
  editTeam(state, {idx, team}) {
    state.currentTeams[idx] = team;
  },
};

export const actions = {
};
