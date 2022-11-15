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
    <div v-if="step === 1">
      <div
        v-if="UploadStatus"
        class="absolute -top-3 left-1/2 flex w-[calc(100%-56px)] -translate-x-1/2 -translate-y-full items-center justify-between rounded-[50px] border-2 border-primary text-white lg:top-0 lg:w-1/3 lg:-translate-y-1/2"
        :class="[fileStatus ? 'bg-[#648d1ee6]' : 'bg-[#f93819e6]']"
      >
        <span class="ml-6">{{
          fileStatus ? '檔案上傳成功' : '檔案上傳失敗'
        }}</span>
        <IconCancel
          class="self-end hover:cursor-pointer"
          @click="UploadStatus = !UploadStatus"
        ></IconCancel>
      </div>
      <div class="relative mb-5">
        <h2
          class="mx-4 mb-1 text-center text-t20 font-medium leading-7 tracking-tighter text-secondary lg:mb-4 lg:text-[32px] lg:leading-10"
        >
          上傳檔案
        </h2>
        <IconLine class="w-full hover:cursor-pointer"></IconLine>
      </div>
      <div
        v-if="!fileStatus"
        @drop.prevent="drop"
        @dragover.prevent="checkDrop"
        @dragleave.prevent="DropEnd"
        class="flex h-full grow flex-col flex-wrap items-center justify-center rounded-20 border border-dashed border-secondary p-4"
      >
        <IconImgPhoto class="mb-5"></IconImgPhoto>
        <label
          class="mb-[30px] rounded-20 bg-secondary-dark py-2 px-7 text-primary ring-2 ring-primary hover:cursor-pointer"
          for="upload"
        >
          選擇檔案
        </label>
        <input
          hidden
          type="file"
          id="upload"
          ref="uploadFile"
          @change="onFileChange"
          accept=".pdf,.jpg,.png"
        />
        <p class="text-center font-medium tracking-wider text-gray40">
          僅支援 PDF、JPG、PNG 檔案，且容量不超過 20MB。
        </p>
        <transition>
          <div
            v-show="isDrag"
            class="absolute top-0 left-0 bottom-0 right-0 rounded-20 bg-black/10"
          ></div>
        </transition>
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center font-medium tracking-wider text-secondary"
      >
        <img
          class="mb-6 w-full lg:w-[238px]"
          src="@/assets/images/contract.jpg"
          alt="contract.jpg"
        />
        <span class="mb-1 text-t24">省腎契約.pdf</span>
        <span class="mb-10 text-gray40">5頁</span>
        <div class="mb-2">專案名稱</div>
        <div
          class="mx-auto flex w-full justify-between rounded-[40px] py-2 px-6 ring ring-secondary-dark lg:w-[400px]"
        >
          <input
            class="grow rounded-20 focus:outline-none"
            type="text"
            value="省腎契約"
          />
          <IconPencel></IconPencel>
        </div>
      </div>
    </div>
    <div v-else-if="step === 2">
      <div class="relative mb-5">
        <h2
          class="mx-4 mb-1 text-center text-t20 font-medium leading-7 tracking-tighter text-secondary lg:mb-4 lg:text-[32px] lg:leading-10"
        >
          簽署文件
        </h2>
        <IconLine class="w-full hover:cursor-pointer"></IconLine>
      </div>
    </div>

    <div
      class="mt-5 flex justify-between text-t18 font-bold text-secondary lg:absolute lg:left-8 lg:right-8 lg:-translate-y-1/2"
    >
      <button
        class="rounded-20 bg-white py-2 px-7 tracking-wider ring-2 ring-white"
        @click="modalActive = true"
      >
        上一步
      </button>
      <button
        class="rounded-20 py-2 px-7 tracking-wider ring-2 hover:cursor-pointer"
        :class="[
          fileStatus
            ? 'bg-secondary-dark text-primary ring-primary'
            : 'bg-gray20 text-gray50 ring-gray30',
        ]"
      >
        下一步
      </button>
    </div>
  </div>
</template>

<script>
import IconLine from '../components/icons/IconLine.vue'
import IconImgPhoto from '../components/icons/IconImgPhoto.vue'
import IconPencel from '../components/icons/IconPencel.vue'
import IconCancel from '../components/icons/IconCancel.vue'

import Modal from '../components/Modal.vue'

export default {
  data() {
    return {
      step: 1,
      UploadStatus: false, // 上傳是否完成狀態
      fileStatus: false,
      modalActive: false,
      isDrag: false,
      filelist: null,
      uploadLimit: {
        type: [
          'pdf',
          'image/jpeg',
          'image/jpg',
          'image/png',
          'application/pdf',
        ],
        size: 20 * 1024,
      },
      errorText: [],
    }
  },
  methods: {
    onFileChange() {
      this.filelist = [...this.$refs.uploadFile.files]
      if (this.filelist.length > 0) {
        const file = this.filelist[0]
        if (!this.uploadLimit.type.includes(file.type)) {
          this.errorText.push('僅支援 PDF、JPG、PNG 檔案')
        } else if (file.size > this.uploadLimit.size) {
          this.errorText.push('容量不可超過 20MB')
        }
        this.fileStatus = true
      }
    },
    checkDrop(e) {
      e.preventDefault()
      // console.dir(e)
      // console.log(e.dataTransfer.files)
      this.isDrag = true
    },
    DropEnd(e) {
      e.preventDefault()
      // console.dir(e)
      // console.log(e.dataTransfer.files)
      this.isDrag = false
    },
    drop(e) {
      e.preventDefault()
      // console.log(e.dataTransfer.files)
      this.$refs.uploadFile.files = e.dataTransfer.files
      this.isDrag = false
      this.onFileChange()
    },
  },
  computed: {},
  components: {
    IconLine,
    IconImgPhoto,
    IconPencel,
    IconCancel,
    Modal,
  },
}
</script>
