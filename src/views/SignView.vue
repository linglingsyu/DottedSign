<template>
  <Modal @close="modalActive = false" v-if="modalActive"></Modal>

  <div
    class="mt-4 mb-8 lg:absolute lg:left-1/2 lg:top-5 lg:m-0 lg:w-[474px] lg:-translate-x-1/4"
  >
    <ol class="flex justify-between text-primary">
      <li
        class="relative ml-[23%] w-1/3 after:absolute after:top-1/2 after:left-0 after:-z-10 after:block after:h-[2px] after:w-full after:-translate-y-1/2 after:bg-gray40 lg:ml-0"
      >
        <div
          class="h-4 w-4 rounded-full border-2 border-primary bg-black ring-4 ring-primary-dark"
        ></div>
        <span
          class="absolute left-0 top-full hidden -translate-x-1/2 translate-y-1/2 lg:block"
          >上傳檔案</span
        >
      </li>
      <li
        class="relative w-1/3 after:absolute after:top-1/2 after:left-0 after:-z-10 after:block after:h-[2px] after:w-full after:-translate-y-1/2 after:bg-gray40"
      >
        <div
          class="h-4 w-4 rounded-full border-2 border-primary bg-black ring-4 ring-primary-dark"
        ></div>
        <span
          class="absolute left-0 top-full hidden -translate-x-1/2 translate-y-1/2 lg:block"
          >簽署文件</span
        >
      </li>
      <li class="relative w-1/3">
        <div
          class="h-4 w-4 rounded-full border-2 border-primary bg-black ring-4 ring-primary-dark"
        ></div>
        <span
          class="absolute left-0 top-full hidden -translate-x-1/2 translate-y-1/2 lg:block"
          >簽署完成</span
        >
      </li>
    </ol>
  </div>
  <div
    class="content_shadow relative z-10 -mt-px flex grow flex-col rounded-20 bg-white p-5 md:py-10 md:px-8 lg:mt-0 lg:-ml-px"
  >
    <div class="relative mb-5">
      <h2
        class="mx-4 mb-1 text-center text-t20 font-medium leading-7 tracking-tighter text-secondary lg:mb-4 lg:text-[32px] lg:leading-10"
      >
        上傳檔案
      </h2>
      <IconLine class="w-full"></IconLine>
    </div>
    <div
      class="flex h-full grow flex-col flex-wrap items-center justify-center rounded-20 border border-dashed border-secondary p-4"
    >
      <IconImgPhoto class="mb-5"></IconImgPhoto>
      <label
        class="mb-[30px] rounded-20 bg-secondary-dark py-2 px-7 text-primary ring-2 ring-primary hover:cursor-pointer"
        for="upload"
      >
        選擇檔案
      </label>
      <input hidden type="file" id="upload" @change="onFileChange" />
      <p class="text-center font-medium tracking-wider text-gray40">
        僅支援 PDF、JPG、PNG 檔案，且容量不超過 20MB。
      </p>
    </div>
    <div class="mt-5 flex justify-between text-t18 font-bold text-secondary">
      <button
        class="rounded-20 bg-white py-2 px-7 tracking-wider ring-2 ring-white"
        @click="modalActive = true"
      >
        上一步
      </button>
      <button
        class="rounded-20 bg-white py-2 px-7 tracking-wider ring-2 ring-white"
        :class="[fileStatus ? '' : 'bg-gray20 ring-gray30 ']"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import IconLine from '../components/icons/IconLine.vue'
import IconImgPhoto from '../components/icons/IconImgPhoto.vue'

import Modal from '../components/Modal.vue'

export default {
  data() {
    return {
      fileStatus: false,
      modalActive: false,
    }
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files
      console.log(files)
      if (!files.length) return false
      this.fileStatus = true
    },
  },
  computed: {},
  components: {
    IconLine,
    IconImgPhoto,
    Modal,
  },
}
</script>
