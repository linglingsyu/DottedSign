<template>
  <transition>
    <div
      id="myModal"
      class="fixed left-0 top-0 z-20 h-full w-full overflow-auto bg-black/40"
    >
      <!-- Modal content -->
      <div
        class="modal_shadow mx-auto my-[15%] w-full max-w-[530px] rounded-20 bg-white px-8 py-6 font-medium tracking-wider text-secondary"
      >
        <div class="mb-4 text-center text-t24">警告</div>
        <IconLine class="w-full"></IconLine>
        <div class="flex items-center justify-center py-[72px]">
          <p>確定要放棄編輯文件？</p>
        </div>
        <div class="mb-6 flex justify-between gap-5 text-center">
          <button
            class="grow rounded-20 bg-white py-2 text-gray50 ring-2 ring-gray50 hover:cursor-pointer"
            @click="close"
          >
            先不要
          </button>
          <a
            href="/files"
            class="grow rounded-20 bg-secondary-dark py-2 text-primary ring-2 ring-primary hover:cursor-pointer"
          >
            放棄
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import IconLine from '../components/icons/IconLine.vue'
export default {
  methods: {
    close() {
      this.$emit('close')
    },
  },
  components: {
    IconLine,
  },
}
</script>
