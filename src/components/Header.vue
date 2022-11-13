<template>
  <header class="bg-black">
    <div
      class="flex items-center justify-between py-[10px] px-2 md:px-5 md:py-[18px]"
    >
      <h1 class="w-[131px] md:w-[228px]">
        <a href="#"><logoSmall class="w-full"></logoSmall></a>
      </h1>
      <ul class="flex gap-x-3">
        <li>
          <a href="#"><IconQuestion></IconQuestion></a>
        </li>
        <li>
          <a class="text-secondary" href="#"><IconLogin></IconLogin></a>
        </li>
      </ul>
    </div>
  </header>

  <img
    class="fixed bottom-0 left-0 -z-10"
    src="@/assets/images/bg_decorate.png"
    alt="bg_decorate.png"
  />
</template>

<script>
import logoSmall from './icons/logoSmall.vue'
import IconQuestion from './icons/IconQuestion.vue'
import IconLogin from './icons/IconLogin.vue'
export default {
  components: {
    logoSmall,
    IconQuestion,
    IconLogin,
    // GoogleIcon,
  },
}
</script>
