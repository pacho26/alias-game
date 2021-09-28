<template>
  <div>
    <BaseLoader v-if="isLoading" />

    <main v-if="getStartedOnIndexPage">
      <h2>{{ strings.rules }}</h2>
      <p v-if="chosenLanguage === 'croatian'">
        Osnovna ideja igre Alias je
        <strong>objašnjavanje određenog pojma "drugim riječima"</strong>
        koristeći sinonime, suprotnosti ili bilo koje načine na koje će igrač
        koji pogađa lakše doći do tražene riječi.<br /><br />
        Za igru je potrebno
        <strong>minimalno 2 ekipe koje se sastoje od najmanje 2 igrača.</strong>
        Prije početka igre, svaka ekipa unosi svoje ime, imena svojih igrača i
        odabire svoj logo. Također, prije početka igre međusobno se određuje
        vrijeme trajanja svake runde ("objašnjavanja") te ciljni rezultat koji
        se treba postići da se pobijedi. <br /><br />
        Sama igra se sastoji od rundi objašnjavanja. Svaki tim, jedan za drugim,
        objašnjava po jednu rundu. Kada svi završe, gotov je prvi krug te se
        kreće u drugi, itd. Kako prolaze krugovi, tako se mijenjaju i ljudi koji
        objašnjavaju. Ime igrača koji objašnjava će pisati prije početka svake
        runde. Ukoliko je neka
        <strong
          >ekipa postigla više ili jednako bodova zadanog ciljnog rezultata na
          kraju nekoga kruga, tada ona pobjeđuje.</strong
        >
        Ukoliko se dogodi da su dvije ili više ekipa prešle ciljni rezultat te
        imaju jednak rezultat, tada samo te ekipe idu u dodatne krugove sve dok
        neka ekipa ne postigne više bodova od druge/drugih. <br /><br />
        Što se tiče samog kriterija objašnjavanja,
        <strong
          >zabranjeno je objašnjavati koristeći korijene riječi i prijevode
          stranih riječi</strong
        >, a ako se to dogodi, ekipa si mora dodati kazneni bod (-1). Ukoliko
        igrač koji pogađa kaže korijen riječi, ali ne i samu riječ, tada je
        igraču koji objašnjava dozvoljno koristiti samu riječ. O tome mora li se
        poštivati točan rod i padež zadane riječi, ostavlja se igračima da se
        dogovore, iako je preporuka da se treba izreći točno zadana riječ kako
        je i tražena.
      </p>

      <p v-else>
        Main concept of the game Alias is
        <strong>explaining using "other words"</strong>
        with synonyms, opposites or any other way to help player who need to
        guess the word.<br /><br />
        To start the game you need
        <strong
          >minimum of 2 teams which consists of at least 2 players.</strong
        >
        Before the game begins, every team needs to enter their team name, name
        of the players and choose their logo. Also, all teams have to determine
        duration of the round and target result which needs to be achieved in
        order to win the game. <br /><br />
        The game itself consists of rounds of explaining. Every team, one after
        another, explains one round each. When everyone is done, first cycle is
        over and then the second starts, and so on... The player who explains is
        changed every new cycle. Name of the player who explains will be shown
        before each round. In case any
        <strong
          >team has score greater than or equal to the target result at the end
          of cycle, that team wins.</strong
        >
        If two or more teams passed target result and have the same score, then
        that teams have extra cycles until some team have higher score than
        other one(s).
        <br /><br />
        Related to the explanation criterion,
        <strong
          >it is forbidden to explain using the root of the word and
          translations of foreign words.</strong
        >If that happens, team gets penalty point (-1). If the player who
        guesses says the root of the word, then the player who explains is
        allowed to use it without getting penalty point.
      </p>
      <BaseButton class="btn" to="/" :buttonText="this.strings.return" />
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      strings: {},
      isLoading: true,
    };
  },
  computed: {
    ...mapState(['isDarkMode', 'chosenLanguage']),
    ...mapGetters(['getStartedOnIndexPage']),
  },
  created() {
    !this.getStartedOnIndexPage
      ? this.$router.push({ path: '/' })
      : this.translate();
  },
  mounted() {
    document.body.classList[this.isDarkMode ? 'add' : 'remove']('dark-mode');
    this.isLoading = false;
  },
  methods: {
    translate() {
      this.chosenLanguage === 'english'
        ? ((this.strings.return = 'Return to menu'),
          (this.strings.rules = 'Rules'))
        : ((this.strings.return = 'Povratak na izbornik'),
          (this.strings.rules = 'Pravila igre'));
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
  max-width: 1000px;
  padding: 20px;
  color: #3c5186;

  .btn {
    font-size: 22px;
    margin-top: 30px;
  }

  h2 {
    font-family: 'Poppins Extra Bold', sans-serif;
    font-weight: 700;
    font-size: 46px;
    color: #374b7b;
    margin: 4px 0 32px 0;
    text-transform: uppercase;
    cursor: default;
    user-select: none;
  }

  p {
    font-size: 20px;
    padding: 3px;
  }
}

.dark-mode {
  main {
    color: #f2f2f2;

    h2 {
      color: #bb86fc;
    }
  }
}
</style>
