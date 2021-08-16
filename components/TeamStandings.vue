<template>
  <main>
    <div id="teams-table">
      <table style="width: 100%">
        <tr
          v-for="team in _.orderBy(this.getAllTeams, (t) => t.points, ['desc'])"
          :key="team.name"
        >
          <td id="logo-container" class="pl-4">
            <img
              :src="team.logo"
              id="team-logo"
              alt="team logo"
              @load="$emit('stopLoading')"
            />
          </td>
          <td id="team-name">{{ team.name }}</td>
          <td class="px-4">{{ team.players.join(', ') }}</td>
          <td id="team-points" class="px-5">{{ team.points }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      sortedTeams: [],
    };
  },
  emits: ['stopLoading'],
  computed: {
    ...mapGetters(['getAllTeams']),
  },
};
</script>

<style lang="scss" scoped>
main {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.table {
  background: #dcd1e1;
  color: #2f406a;
}

#teams-table {
  border-radius: 8px;
  font-size: 24px;
  color: #2f406a;

  tr {
    border-radius: 8px;
  }

  #team-name {
    font-weight: 600;
    padding-right: 36px;
    padding-left: 4px;
  }

  #team-points {
    font-weight: 700;
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
