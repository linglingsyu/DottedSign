<template>
  <HeaderC></HeaderC>
  <main
    class="container flex h-full min-h-[650px] flex-col py-[18px] pt-2 lg:min-h-[850px] lg:flex-row lg:pt-10 lg:pb-20"
  >
    <nav
      class="ml-[30px] flex gap-1 lg:mt-[100px] lg:ml-3 lg:flex-col lg:gap-[10px]"
    >
      <div class="h-[42px] w-12 lg:-rotate-90">
        <router-link
          to="/files"
          class="flex items-center justify-center rounded-t-full border-2 border-gray70 bg-gray60"
          ><IconFiles class="w-6 lg:rotate-90"></IconFiles
        ></router-link>
      </div>
      <div class="h-[42px] w-12 lg:-rotate-90">
        <router-link
          to="/storage"
          class="flex items-center justify-center rounded-t-full border-2 border-gray70 bg-gray60"
          ><IconStorage class="w-6 lg:rotate-90"></IconStorage
        ></router-link>
      </div>
      <div class="h-[42px] w-12 lg:-rotate-90">
        <router-link
          to="/deleted"
          class="flex items-center justify-center rounded-t-full border-2 border-gray70 bg-gray60"
          ><IconTrash class="w-6 lg:rotate-90"></IconTrash
        ></router-link>
      </div>
    </nav>
    <div
      class="content_shadow relative z-10 -mt-px flex grow flex-col rounded-[20px] bg-white p-2 md:py-10 md:px-8 lg:mt-0 lg:-ml-px"
    >
      <RouterView />
    </div>
  </main>
</template>
<script>
// import { RouterLink, RouterView } from 'vue-router'
import HeaderC from '@/components/Header.vue'
import IconFiles from '@/components/icons/IconFiles.vue'
import IconStorage from '@/components/icons/IconStorage.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
export default {
  components: {
    HeaderC,
    IconFiles,
    IconStorage,
    IconTrash,
  },
}
</script>

<style>
nav a.router-link-exact-active {
  background-color: #fff;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border: 2px solid #b7ec5d;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* nav a.router-link-exact-active:hover {
  background-color: #ffa000;
} */

/* header {
  line-height: 1.5;
  max-height: 100vh;
} */

/* .logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}


nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
