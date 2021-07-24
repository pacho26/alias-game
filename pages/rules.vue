<template>
  <main>
    <h2>Rules</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ab autem
      voluptatibus sequi quam distinctio harum. Aut aperiam dignissimos
      exercitationem accusantium a quod ratione eum quis sint, aspernatur
      similique voluptas commodi, et quia numquam reprehenderit? Maxime sed
      porro aliquid, expedita tempora minima non eum doloribus aperiam possimus
      qui repudiandae sunt iure sapiente cumque iusto magnam tempore culpa! Enim
      est corporis autem error praesentium molestias consectetur accusantium
      accusamus. Iure repellendus corporis reiciendis nihil quas repudiandae
      quia qui esse. Obcaecati, dolore nesciunt et veniam aut recusandae laborum
      consequatur rerum mollitia modi pariatur blanditiis voluptates minus
      quisquam doloremque? Error laudantium voluptatum dolorem adipisci.
    </p>
    <BaseButton class="btn" :to="'/'" :buttonText="'Return to menu'" />
  </main>
</template>

<script>
export default {};
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

  h2 {
    font-family: 'Poppins Extra Bold', sans-serif;
    font-weight: 800;
    color: #374b7b;
    text-transform: uppercase;
    cursor: default;
    user-select: none;
  }

  p {
    font-size: 20px;
  }

  .btn {
    transform: scale(0.8, 0.8);
  }
}
</style>
