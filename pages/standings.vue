<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main v-if="getStartedOnIndexPage">
      <TeamStandings @stopLoading="onImagesLoaded" />
      <div v-if="!getHasWinner" class="btn">
        <BaseButton :to="'/game'" :buttonText="strings.continue" />
      </div>
      <div v-else class="btn">
        <BaseButton :to="'/winner'" :buttonText="strings.finish" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoading: true,
      strings: {},
    };
  },
  computed: {
    ...mapGetters([
      'getHasWinner',
      'getChosenLanguage',
      'getStartedOnIndexPage',
    ]),
  },
  created() {
    !this.getStartedOnIndexPage
      ? this.$router.push({ path: '/' })
      : (this.translate(), this.continueOnNextTeam());
  },
  mounted() {
    this.preventClickingBack();
  },
  methods: {
    ...mapMutations(['continueOnNextTeam']),

    onImagesLoaded() {
      this.isLoading = false;
    },
    translate() {
      this.getChosenLanguage === 'english'
        ? ((this.strings.continue = 'Continue'),
          (this.strings.finish = 'Finish'))
        : ((this.strings.continue = 'Nastavi'),
          (this.strings.finish = 'Završi'));
    },
    preventClickingBack() {
      window.location.hash = 'no-back-button';

      // Again because Google Chrome doesn't insert
      // the first hash into the history
      window.location.hash = 'Again-No-back-button';

      window.onhashchange = () => (window.location.hash = 'no-back-button');
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .btn {
    margin-top: 10px;
  }
}
</style>
