export const state = () => ({
  currentTeams: [
    {
      name: 'Skakavci',
      players: ['Marko', 'Ivan'],
    },
    {
      name: 'Rokeri',
      players: ['Franjo', 'Josip'],
    },
  ],
});

export const getters = {
  currentTeams(state) {
    return state.currentTeams;
  },
};

export const mutations = {
  pushNewTeam(state, team) {
    state.currentTeams.push(team);
  },
};

export const actions = {
  addNewTeam({ commit }, team) {
    commit('pushNewTeam', team);
  },
};
