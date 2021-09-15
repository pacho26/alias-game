<template>
  <main>
    <BaseLoader v-if="isLoading" />

    <h1>CHOOSE LOGO</h1>
    <section>
      <div class="pb-1">
        <p>FOOTBALL</p>
        <div class="logos-container">
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fbarcelona.png?alt=media&token=bbcf8996-810e-45a4-9428-af1947021020"
              alt="barcelona"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fbayern.png?alt=media&token=1b29eeeb-5bf2-4b78-8321-df0819645517"
              alt="bayern"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fborussia.png?alt=media&token=8460c2af-4f0a-499f-b9a0-f80f758a7efc"
              alt="borussia"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fchelsea.png?alt=media&token=44556fdc-0ccc-40f0-ad52-0708298c6e7f"
              alt="chelsea"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Finter.png?alt=media&token=adfa968c-ca5d-453f-bb3c-e2733512ba59"
              alt="inter"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fjuventus.png?alt=media&token=d29babb2-ac88-423d-990b-fc6a8be39fe8"
              alt="juventus"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fmanchester-city.png?alt=media&token=9aaae7d9-4f82-4fcf-8744-7a6fffc78dc7"
              alt="manchester-city"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fmanchester-united.png?alt=media&token=f62e0b41-8c15-4579-88ea-a109d5a3c65e"
              alt="manchester-united"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fmilan.png?alt=media&token=3f16dc0b-b429-41d1-b268-f808e3d6f73f"
              alt="milan"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Fpsg.png?alt=media&token=a648e4a7-2f9b-468b-9da2-add208921ef5"
              alt="psg"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffootball%2Freal-madrid.png?alt=media&token=6cba7e73-c1c7-4dea-8be3-8d04d3a25f07"
              alt="real-madrid"
              @load="handleLoading"
            />
          </div>
        </div>
      </div>

      <div class="pb-1">
        <p>COMPANIES</p>
        <div class="logos-container">
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Famazon.png?alt=media&token=33199418-7902-4926-944a-c84ffc524ce3"
              alt="amazon"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Fapple.png?alt=media&token=4611d4d3-eb73-4118-a46b-27f983b8f845"
              alt="apple"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Febay.png?alt=media&token=87879a6b-94b1-478f-8d15-c8b6fecc5bc9"
              alt="ebay"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Ffacebook.png?alt=media&token=76f67270-58c4-45a9-bc04-b6667d91e3d1"
              alt="facebook"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Fgoogle.png?alt=media&token=c34621ca-0295-4420-9bf0-04410ad050ae"
              alt="google"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Finstagram.png?alt=media&token=872dc56b-c9a7-46d3-888f-888116ba4afe"
              alt="instagram"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Fmcdonalds.png?alt=media&token=589ba059-66ee-4598-b6a2-ddd9234047af"
              alt="mcdonalds"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Fnetflix.png?alt=media&token=223d35af-7e21-41a6-959e-afd9ed0b29a8"
              alt="netflix"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Ftiktok.png?alt=media&token=aa68b13f-98d0-49a5-b85d-1fc9b6ed0ccd"
              alt="tiktok"
              @load="handleLoading"
            />
          </div>

          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Fyoutube.png?alt=media&token=60c8181c-202a-4313-ad08-55e6d1a98d00"
              alt="youtube"
              @load="handleLoading"
            />
          </div>
        </div>
      </div>

      <div class="pb-1">
        <p>FOOD</p>
        <div class="logos-container">
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fapple.png?alt=media&token=86c0fa1d-657d-4452-9251-c9a7b1dbfb2d"
              alt="apple"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Favocado.png?alt=media&token=c0fc6ff1-0050-4351-afa8-e09f8380c4c6"
              alt="avocado"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fburger.png?alt=media&token=b17f7807-d04b-430c-8816-b0722465cb30"
              alt="burger"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fcupcake.png?alt=media&token=d045bd39-4183-46ad-b12e-f4b2a1eb8161"
              alt="cupcake"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Ffrench-fries.png?alt=media&token=79e65fc8-f284-47e0-b235-6107301eb0e9"
              alt="french-fries"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fgingerbread-man.png?alt=media&token=dd358b7c-f3dd-452d-b01c-6f92f4a92fcf"
              alt="gingerbread-man"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fhotdog.png?alt=media&token=4529fe16-afff-4e5b-9e41-72081382635a"
              alt="hotdog"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fmacarons.png?alt=media&token=c99dc4d1-9aaf-4179-9aa9-377f9a8856e2"
              alt="macarons"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fmushroom.png?alt=media&token=f893e642-9520-4d13-94d5-e80ecf9e6a5a"
              alt="mushroom"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fpineapple.png?alt=media&token=2b8572ba-a1b1-4600-abba-a8ce3fd3375e"
              alt="pineapple"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fpizza.png?alt=media&token=32e1a161-7544-4f05-b5e4-22da686a618d"
              alt="pizza"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fstrawberry.png?alt=media&token=6b82dcc6-28f6-4996-95fa-1dc95d576dfc"
              alt="strawberry"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/food%2Fwatermelon.png?alt=media&token=4a3d6645-a74c-4aeb-9f86-33dbf74157c9"
              alt="watermelon"
              @load="handleLoading"
            />
          </div>
        </div>
      </div>

      <div class="pb-1">
        <p>FANCY</p>
        <div class="logos-container">
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fgoku.png?alt=media&token=9a3203df-fd58-48d9-8c01-47cd4610e125"
              alt="goku"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fpikachu.png?alt=media&token=ffda2bb1-0663-4dca-83b2-6bb44b009512"
              alt="pikachu"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fmeowth.png?alt=media&token=d9a97b44-7d61-4c92-a42b-ad6651ada140"
              alt="meowth"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fpsyduck.png?alt=media&token=58fbd09b-f697-4817-a3a4-f077799640a2"
              alt="psyduck"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fsuper-mario.png?alt=media&token=08167f69-8e90-4a27-80f6-dcdb51b64ee0"
              alt="super-mario"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fturtle1.png?alt=media&token=84037327-5103-4074-809c-9ea919117961"
              alt="turtle1"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fturtle2.png?alt=media&token=8b5d6bf9-e611-4967-9dba-e660ca7a48e6"
              alt="turtle2"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fturtle3.png?alt=media&token=1d7d7fe7-282e-4d0f-bc1e-c45b2a129736"
              alt="turtle3"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fturtle4.png?alt=media&token=9494eb5b-9405-402e-b750-a7c841802ba0"
              alt="turtle4"
              @load="handleLoading"
            />
          </div>
        </div>
      </div>

      <div class="pb-1">
        <p>ALCOHOL</p>
        <div class="logos-container">
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Faba.png?alt=media&token=100bd9e9-7a6b-4f78-94a4-187b240082ce"
              alt="aba"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fhirter.png?alt=media&token=06de7879-967a-4ce8-bf88-ead616ead076"
              alt="hirter"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fkarlovacko.png?alt=media&token=cae466ec-91e3-4b27-a3c5-871e8e9295f5"
              alt="karlovacko"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fozujsko.png?alt=media&token=253708f6-d5d1-4437-9e1f-322fec0281c5"
              alt="ozujsko"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fkozel.png?alt=media&token=a5a32456-557b-46d8-b451-e0f6e7d75c36"
              alt="kozel"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fstephans-brau.png?alt=media&token=d2d516cd-4ebf-45f5-bbaf-a7a2997289b0"
              alt="stephans-brau"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fstari-lisac.png?alt=media&token=710399dd-ff3b-42ed-98b1-b8d368763ccb"
              alt="stari-lisac"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fblacky.png?alt=media&token=4190fe2d-ac3e-41ed-93c5-9a4759d0fe36"
              alt="blacky"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fchivas.png?alt=media&token=049295b7-0bea-4728-af0a-6d9ece474109"
              alt="chivas"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fjagermaister.png?alt=media&token=d69f5d05-6f89-4698-b95f-7cc5571bb859"
              alt="jagermeister"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fpelinkovac.png?alt=media&token=e575cce8-bb8c-4e20-a534-5df0c57eb7d1"
              alt="pelinkovac"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fstock.png?alt=media&token=b0a9e9cc-0f0c-4e3d-9b28-138fbdba0cf2"
              alt="stock"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fgemist.png?alt=media&token=58b7b38b-4e71-4e9d-8d2f-a3dabdf7b916"
              alt="gemist"
              @load="handleLoading"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      imgLoaded: 0,
    };
  },
  emits: ['logoSelected'],
  methods: {
    selectLogo(event) {
      this.$emit('logoSelected', event.target.src);
    },
    handleLoading() {
      this.imgLoaded++;

      if (this.imgLoaded === 21) {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  margin: 0 auto;
  display: flex;
  align-items: center;

  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #374b7b;
  }

  section {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 70vh;

    p {
      position: relative;
      top: 10px;
      margin-left: 5px;
      color: #374b7b;
    }

    .logo-container {
      margin: 0px 0px 8px 9px;
      width: 54px;
      height: 54px;
      display: flex;
      justify-content: center;
      border-radius: 8px;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }

    img {
      max-width: 54px;
      max-height: 54px;
    }

    .logos-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}

::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #cad3e7;
  border-radius: 10px;

  &:hover,
  &:active {
    background: #a7b6d7;
  }
}

@media only screen and (max-width: 600px) {
  main {
    section {
      .logo-container {
        margin: 0px 2px 8px 10px;
        width: 56px;
        height: 56px;
      }

      img {
        max-width: 56px;
        max-height: 56px;
      }
    }
  }
}
</style>
