<template>
  <main>
    <BaseLoader v-if="isLoading" />

    <h1>CHOOSE LOGO</h1>
    <div id="logo-selection" ref="logoSelection">
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
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Faliexpress.png?alt=media&token=766884e3-c1c6-4ea9-b9ec-4ca393ff717e"
              alt="amazon"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcompanies%2Famazon.png?alt=media&token=33199418-7902-4926-944a-c84ffc524ce3"
              alt="amazon"
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
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fhomer.png?alt=media&token=e8c3546a-d04f-48cc-a6db-2b23f425ae89"
              alt="homer"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fbart.png?alt=media&token=a23d8340-5af0-4cda-805c-ec67095b0b18"
              alt="bart"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fjohnny-bravo.png?alt=media&token=f6529aac-9cbd-42d7-a635-5a3ce6cc99d9"
              alt="johnny-bravo"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fspongebob.png?alt=media&token=200736ed-a91e-4a3b-914e-306bfda2a2f3"
              alt="spongebob"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fpatrick.png?alt=media&token=90e32e27-54c1-4c1f-b9e5-1ae45f606662"
              alt="patrick"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fpink-panther.png?alt=media&token=04a6d6f5-8115-457a-a2d0-fece1fa5d909"
              alt="pink-panther"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Ffancy%2Fbugs-bunny.png?alt=media&token=a4b51885-f18e-422d-bfdc-9b368666e4b8"
              alt="bugs-bunny"
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
        <p>CARS</p>
        <div class="logos-container">
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Falfa-romeo.png?alt=media&token=4279d4cb-5425-4ae9-b036-62da14dcdc92"
              alt="alfa-romeo"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Fcitroen.png?alt=media&token=1a810ba7-0e72-4740-9bf7-d9557cb46214"
              alt="citroen"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Fferrari.png?alt=media&token=9b093ab1-7f63-4c9a-959c-804e7be3cdaf"
              alt="ferrari"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Fford.png?alt=media&token=0f5fc126-effe-4987-a2d3-5121a39df332"
              alt="ford"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Fhyundai.png?alt=media&token=f43fca72-a0db-41b1-895e-4a1cc9ed25ca"
              alt="hyundai"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Flamborghini.png?alt=media&token=141a72be-e57a-42d8-a24d-1aa80507f07e"
              alt="lamborghini"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Fopel.png?alt=media&token=9643eb7b-d64e-4707-98eb-105723eda612"
              alt="opel"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Frenault.png?alt=media&token=994cadb3-5b38-4dcf-abd5-16f83d527824"
              alt="renault"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Frimac.png?alt=media&token=368954ed-5a5b-4c1e-8041-6c6a0fcd7491"
              alt="rimac"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Fskoda.png?alt=media&token=61882f7a-e629-47f5-b08c-01381dc88eb0"
              alt="skoda"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Ftesla.png?alt=media&token=04429a59-1610-4ec8-a848-fb599f206b3a"
              alt="tesla"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fcars%2Fvolkswagen.png?alt=media&token=0d968e86-77d3-4c85-a976-9ce24069f3d1"
              alt="volkswagen"
              @load="handleLoading"
            />
          </div>
        </div>
      </div>

      <div class="pb-1">
        <p>TECH</p>
        <div class="logos-container">
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fapple.png?alt=media&token=36d6ef1b-3b56-4421-ad2c-5b0b3f6fa63a"
              alt="apple"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Flinux.png?alt=media&token=fb538aab-f27b-4a2e-a758-48ce7a103287"
              alt="linux"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fwindows.png?alt=media&token=9547228d-0192-40e5-9ff2-bc7550301560"
              alt="windows"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fandroid.png?alt=media&token=56b98231-3430-41f0-8322-65df79759074"
              alt="android"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fhtml.png?alt=media&token=11ac2390-cb78-4b55-85d7-75a3e02ef767"
              alt="html"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fcss.png?alt=media&token=aea6d7be-7899-4deb-9cd2-fa76a83d9a31"
              alt="css"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fjavascript.png?alt=media&token=991433bd-efbb-4753-840c-c98aa052bc3c"
              alt="javascript"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Ftypescript.png?alt=media&token=eede36ed-7508-4303-942b-aaf9ca6fff02"
              alt="typescript"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fangular.png?alt=media&token=ba59a0cd-8ec7-4f5d-b7d4-df85c4d92fbe"
              alt="angular"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Freact.png?alt=media&token=609ccfcd-3626-460d-80cc-4342774f5e08"
              alt="react"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fvue.png?alt=media&token=20b7f478-ad59-4c84-a3f6-bb4b2ca9cd6e"
              alt="vue"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fnuxt.png?alt=media&token=06e7a2b3-4ac2-4283-b11b-07f423f3b428"
              alt="nuxt"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fjava.png?alt=media&token=e7eae2e9-d116-4e88-994b-a305ed4d625b"
              alt="java"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fcpp.png?alt=media&token=4fbff1c5-7032-492b-a409-3086cf3d6b84"
              alt="cpp"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fcs.png?alt=media&token=b2e3e573-1008-4a3d-872d-1b06d1cf24b7"
              alt="c-sharp"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fpython.png?alt=media&token=9a897678-92ec-42ad-83d4-bdb2cc19d0b6"
              alt="python"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fgo.png?alt=media&token=f7c0f2b7-ce60-4d70-a688-0ec8b5739e86"
              alt="go"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fmysql.png?alt=media&token=d958d461-f105-4b3d-ad62-20de6cf93868"
              alt="mysql"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Fpostgre.png?alt=media&token=c2d935f2-a618-4315-8b28-b5ef13a7cf87"
              alt="postgre"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Ffirebase.png?alt=media&token=4b4d6950-4913-4006-b9d8-055f0e6599a3"
              alt="firebase"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Funity.jpg?alt=media&token=13c1eb20-2333-4c92-be3b-37dde9dd12a5"
              alt="unity"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Fit%2Funreal.png?alt=media&token=4a93cccb-8f86-4c67-99fc-2ec7239dcb3c"
              alt="unreal"
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
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fhirter.png?alt=media&token=652a4e91-17e4-4b41-8aeb-afd767b1655d"
              alt="hirter"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fkarlovacko.png?alt=media&token=58a9a752-8462-49fe-b0b3-b03fdd56457d"
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
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fkozel.png?alt=media&token=fc60349c-65ff-486a-9abd-522986cf779a"
              alt="kozel"
              @load="handleLoading"
            />
          </div>
          <div class="logo-container" @click="selectLogo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fstephans-brau.png?alt=media&token=e4c5ee7a-6a87-48e8-9525-d6ad7066b6f2"
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
              src="https://firebasestorage.googleapis.com/v0/b/alias-game-24cb4.appspot.com/o/logos%2Falcohol%2Fblacky.png?alt=media&token=acd54b81-cd2e-4cd4-ab66-9b790c41f16a"
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
    </div>
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
      if (event.target.src) {
        this.$emit('logoSelected', event.target.src);
      }
    },
    handleLoading() {
      this.imgLoaded++;

      if (
        this.imgLoaded ===
        this.$refs.logoSelection.getElementsByTagName('img').length
      ) {
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

  #logo-selection {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 70vh;

    p {
      position: relative;
      top: 10px;
      margin-left: 5px;
      color: #374b7b;
    }

    .logo-container {
      margin: 0px 0px 8px 9px;
      width: 56px;
      height: 56px;
      display: flex;
      justify-content: center;
      border-radius: 8px;

      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }

    img {
      max-width: 56px;
      max-height: 56px;
      user-select: none;
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

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cad3e7;
  border-radius: 10px;

  &:hover,
  &:active {
    background: #a7b6d7;
  }
}

@media only screen and (min-width: 600px) {
  .logos-container {
    position: relative;
    right: 5px;
  }
}

@media only screen and (max-width: 600px) {
  main {
    #logo-selection {
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
