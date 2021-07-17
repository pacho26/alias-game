<template>
  <div>
    <header>
      <nuxt-link to="/" id="logoLink">Alias<span>Game</span> </nuxt-link>
    </header>
    <Nuxt />
  </div>
</template>

<style lang="scss" scoped>
* {
  font-family: 'Poppins', sans-serif;
}

#logoLink {
  text-decoration: none;
  font-family: 'Poppins Bold', sans-serif;
  color: #3c5186;
  font-size: 40px;
  font-weight: 800;
  padding: 8px;
  user-select: none;

  span {
    font-family: 'Poppins Extra Bold', sans-serif;
    color: #9b72aa;
    font-size: 20px;
    font-weight: 800;
  }
}

header {
  margin: 0;
  padding: 0;
  background: #fff5de;
}
</style>
