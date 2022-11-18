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
    <div class="flex grow flex-col" v-show="step === 1">
      <div
        v-if="UploadStatus"
        class="absolute -top-3 left-1/2 flex w-[calc(100%-56px)] -translate-x-1/2 -translate-y-full items-center justify-between rounded-[50px] border-2 border-primary text-white lg:top-0 lg:w-1/3 lg:-translate-y-1/2"
        :class="[fileStatus ? 'bg-[#648d1ee6]' : 'bg-[#f93819e6]']"
      >
        <span class="ml-6">{{ fileStatus ? '檔案上傳成功' : errorText }}</span>
        <IconCancel
          class="self-end stroke-white hover:cursor-pointer"
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
        class="relative flex h-full grow flex-col flex-wrap items-center justify-center rounded-20 border border-dashed border-secondary p-4"
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
    <div
      class="flex grow flex-col tracking-wider text-secondary"
      v-show="step === 2"
    >
      <div class="relative">
        <h2
          class="mx-4 mb-1 text-center text-t20 font-medium leading-7 tracking-tighter text-secondary lg:mb-4 lg:text-[32px] lg:leading-10"
        >
          簽署文件
        </h2>
        <IconLine class="w-full hover:cursor-pointer"></IconLine>
      </div>
      <div class="flex grow font-medium">
        <div class="basis-3/12">
          <div
            class="flex h-full flex-col bg-[url(@/assets/images/line.svg)] bg-right-top bg-no-repeat pr-5 pt-5"
          >
            <ul class="mb-4 flex items-center justify-around">
              <li class="flex flex-col items-center justify-center">
                <IconSign class="stroke-secondary"></IconSign>
                簽名
              </li>
              <li class="flex flex-col items-center justify-center">
                <IconImage class="stroke-secondary"></IconImage>圖片
              </li>
              <li class="flex flex-col items-center justify-center">
                <IconText class="stroke-secondary"></IconText>文字
              </li>
              <li class="flex flex-col items-center justify-center">
                <IconPage class="stroke-secondary"></IconPage>頁數
              </li>
            </ul>
            <div
              class="flex grow flex-col items-center justify-center rounded-20 bg-secondary-light"
            >
              <ul class="flex flex-col items-center justify-center gap-3 p-5">
                <li
                  v-for="(item, index) of SignImageList"
                  :key="'sing' + index"
                  class="group relative hover:rounded-20 hover:ring-2 hover:ring-primary"
                >
                  <img
                    class="w-full rounded-20 bg-white object-cover group-hover:bg-primary/70"
                    :src="item"
                    @click="setImageonPage"
                    alt="sign.png"
                  />
                  <IconCancel
                    class="absolute top-0 left-0 stroke-secondary hover:cursor-pointer"
                    @click="delImage(index)"
                  ></IconCancel>
                </li>
              </ul>
              <IconAddFile
                @click="SignModal = true"
                class="mb-4 h-20 w-20 hover:cursor-pointer lg:h-auto lg:w-auto"
              ></IconAddFile>
              <span class="text-t24">新增簽名檔</span>
            </div>
          </div>
        </div>
        <div class="basis-9/12 py-6 px-28">
          <div class="h-full w-full py-10 px-16">
            <!-- <img src="../assets/images/contract.jpg" /> -->
            <canvas ref="can" width="600" height="600"></canvas>
          </div>
        </div>
      </div>

      <!-- 繪製簽名區 -->
      <transition>
        <div
          v-show="SignModal"
          class="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-[#222222]/[.2]"
        >
          <div class="w-1/2 rounded-[40px] bg-white py-6 px-8">
            <h2 class="mb-4 text-center text-t24">建立簽名檔</h2>
            <IconLine class="w-full"></IconLine>
            <ul class="mt-10 mb-3 flex items-center justify-center gap-4">
              <li @click="changeColor" class="hover:cursor-pointer">
                <IconSignGreen></IconSignGreen>
              </li>
              <li class="hover:cursor-pointer">
                <IconSignBlue></IconSignBlue>
              </li>
              <li class="hover:cursor-pointer"><IconSignRed></IconSignRed></li>
              <li class="hover:cursor-pointer" @click="reset">
                <IconTrash class="stroke-secondary"></IconTrash>
              </li>
            </ul>

            <canvas
              width="300"
              height="300"
              class="mx-auto rounded-20 border-2 border-gray30 bg-secondary-light"
              ref="sign"
              @mousedown="startPosition"
              @mouseup="finishedPosition"
              @mouseleave="finishedPosition"
              @mousemove="draw"
              @touchstart="startPosition"
              @touchend="finishedPosition"
              @touchcancel="finishedPosition"
              @touchmove="draw"
            ></canvas>

            <div
              class="mt-5 flex justify-between text-t18 font-bold text-secondary"
            >
              <button
                class="rounded-20 bg-white py-2 px-7 tracking-wider ring-2 ring-white"
                @click="SignModal = false"
              >
                取消
              </button>
              <button
                class="rounded-20 py-2 px-7 tracking-wider ring-2"
                @click="saveSignImage"
                :disabled="!saveSign"
                :class="[
                  saveSign
                    ? 'bg-secondary-dark text-primary ring-primary'
                    : 'bg-gray20 text-gray50 ring-gray30',
                ]"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      </transition>
      <!-- 繪製簽名end -->
    </div>

    <div
      class="mt-5 flex justify-between text-t18 font-bold text-secondary lg:absolute lg:left-8 lg:right-8 lg:-translate-y-1/2"
    >
      <button
        class="rounded-20 bg-white py-2 px-7 tracking-wider ring-2 ring-white"
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
        @click="download"
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
import IconAddFile from '../components/icons/IconAddFile.vue'
import IconSign from '../components/icons/IconSign.vue'
import IconImage from '../components/icons/IconImage.vue'
import IconText from '../components/icons/IconText.vue'
import IconPage from '../components/icons/IconPage.vue'
import IconSignBlue from '../components/icons/IconSignBlue.vue'
import IconSignRed from '../components/icons/IconSignRed.vue'
import IconSignGreen from '../components/icons/IconSignGreen.vue'
import IconTrash from '../components/icons/IconTrash.vue'

import Modal from '../components/Modal.vue'

import { fabric } from 'fabric'
// import * as PdfJs from 'pdfjs-dist'
import * as pdfjsLib from 'pdfjs-dist'
import { jsPDF } from 'jspdf'

export default {
  data() {
    return {
      jsPDF: null,
      SignModal: false,
      step: 1,
      UploadStatus: false, // 上傳是否完成狀態
      fileStatus: false,
      modalActive: false,
      isDrag: false,
      filelist: null,
      SignImageList: [],
      uploadLimit: {
        type: [
          'pdf',
          'image/jpeg',
          'image/jpg',
          'image/png',
          'application/pdf',
        ],
        size: 20 * 1024 * 1024,
      },
      errorText: '',
      cv: null,
      cvs: null,
      canvas: {
        lineWidth: 3,
        lineCap: 'round',
        strokeStyle: '#000000',
      },
      isPainting: false,
      saveSign: false,
      pdfDoc: null,
      pdfPages: null,
    }
  },
  mounted() {
    this.initCanvas()
    this.getSignImage()
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      '../../node_modules/pdfjs-dist/build/pdf.worker.js'
    this.jsPDF = new jsPDF()
  },
  methods: {
    async onFileChange() {
      // this.filelist = [...this.$refs.uploadFile.files]
      this.filelist = this.$refs.uploadFile.files
      console.log(this.filelist)
      if (this.filelist.length > 0) {
        const file = this.filelist[0]
        this.UploadStatus = true // 打開提示狀態
        if (!this.uploadLimit.type.includes(file.type)) {
          this.errorText = '僅支援 PDF、JPG、PNG 檔案'
        } else if (file.size > this.uploadLimit.size) {
          this.errorText = '容量不可超過 20MB'
        } else {
          this.step = 2
          this.fileStatus = true
          this.cv.requestRenderAll()
          const pdfData = await this.printPDF(file)
          // console.log(pdfData)
          const pdfImage = await this.pdfToImage(pdfData)
          // console.log(pdfImage)
          // 透過比例設定 canvas 尺寸
          this.cv.setWidth(pdfImage.width / window.devicePixelRatio)
          this.cv.setHeight(pdfImage.height / window.devicePixelRatio)

          // 將 PDF 畫面設定為背景
          this.cv.setBackgroundImage(pdfImage, this.cv.renderAll.bind(this.cv))
        }
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
    initCanvas() {
      const ref = this.$refs.can
      this.cv = new fabric.Canvas(ref)
      // 初始化 簽名(原生canvas)
      this.cvs = this.$refs.sign.getContext('2d')
      for (const [key, val] of Object.entries(this.canvas)) {
        this.cvs[key] = val
      }
    },
    //取得滑鼠 / 手指在畫布上的位置
    getPaintPosition(e) {
      const cvsSize = this.$refs.sign.getBoundingClientRect()
      if (e.type === 'mousemove') {
        return {
          x: e.clientX - cvsSize.left,
          y: e.clientY - cvsSize.top,
        }
      } else {
        return {
          x: e.touches[0].clientX - cvsSize.left,
          y: e.touches[0].clientY - cvsSize.top,
        }
      }
    },
    startPosition(e) {
      //設定開始繪圖狀態
      e.preventDefault()
      this.isPainting = true
      this.saveSign = true
    },
    finishedPosition() {
      // 結束繪圖，並產生新路徑
      this.isPainting = false
      this.cvs.beginPath()
    },
    draw(e) {
      // 開始簽名
      if (!this.isPainting) return false
      // 取得滑鼠 在畫布上的 XY軸
      const PaintPosition = this.getPaintPosition(e)
      console.log(this.$refs.sign.toDataURL('image/png'))
      // 移動滑鼠位置並產生圖案
      this.cvs.lineTo(PaintPosition.x, PaintPosition.y)
      this.cvs.stroke()
    },
    reset() {
      this.cvs.clearRect(0, 0, this.$refs.sign.width, this.$refs.sign.height)
      this.saveSign = false
    },
    saveSignImage() {
      const newImg = this.$refs.sign.toDataURL('image/png')
      let list = localStorage.getItem('sign')
      if (list === null) {
        list = []
      } else {
        list = JSON.parse(list)
      }
      list.push(newImg)
      list = JSON.stringify(list)
      localStorage.setItem('sign', list)
      this.reset()
      this.getSignImage()
    },
    getSignImage() {
      this.SignImageList = JSON.parse(localStorage.getItem('sign'))
    },
    changeColor(color) {
      // this.initCanvas()
      this.cvs.strokeStyle = color
      this.cvs.fillStyle = color
    },
    delImage(index) {
      if (confirm('確定刪除嗎？')) {
        this.SignImageList.splice(index, 1)
        let data = JSON.parse(localStorage.getItem('sign'))
        data.splice(index, 1)
        localStorage.setItem('sign', JSON.stringify(data))
      }
    },
    setImageonPage(e) {
      // console.log(e.target)
      if (!e.target.src) return
      const that = this
      fabric.Object.prototype.setControlsVisibility({
        bl: true, // 左下
        br: true, // 右下
        mb: false, // 下中
        ml: false, // 中左
        mr: false, // 中右
        mt: false, // 上中
        tl: true, // 上左
        tr: true, // 上右
        mtr: false, // 旋轉控制鍵
      })
      fabric.Image.fromURL(e.target.src, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 200
        image.scaleX = 0.5
        image.scaleY = 0.5
        that.cv.add(image)
      })
    },
    // 使用原生 FileReader 轉檔
    readBlob(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result))
        reader.addEventListener('error', reject)
        reader.readAsDataURL(blob)
      })
    },
    async printPDF(pdfData) {
      const Base64Prefix = 'data:application/pdf;base64,'
      // 將檔案處理成 base64
      pdfData = await this.readBlob(pdfData)

      // 將 base64 中的前綴刪去，並進行解碼
      const data = atob(pdfData.substring(Base64Prefix.length))
      // 利用解碼的檔案，載入 PDF 檔及第一頁
      const pdfDoc = await pdfjsLib.getDocument({ data }).promise
      const pdfPage = await pdfDoc.getPage(1)
      // 設定尺寸及產生 canvas
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
      // 設定 PDF 所要顯示的寬高及渲染

      canvas.height = viewport.height
      canvas.width = viewport.width
      const renderContext = {
        canvasContext: context,
        viewport,
      }
      const renderTask = pdfPage.render(renderContext)
      // 回傳做好的 PDF canvas
      return renderTask.promise.then(() => canvas)
    },
    async pdfToImage(pdfData) {
      // 設定 PDF 轉為圖片時的比例
      const scale = 1 / window.devicePixelRatio
      // 回傳圖片
      return new fabric.Image(pdfData, {
        id: 'renderPDF',
        scaleX: scale,
        scaleY: scale,
      })
    },
    download() {
      // 將 canvas 存為圖片
      const image = this.$refs.can.toDataURL('image/png')
      // 設定背景在 PDF 中的位置及大小
      const width = this.jsPDF.internal.pageSize.width
      const height = this.jsPDF.internal.pageSize.height
      this.jsPDF.addImage(image, 'png', 0, 0, width, height)
      // 將檔案取名並下載
      this.jsPDF.save('download.pdf')
    },
  },
  computed: {},
  components: {
    IconLine,
    IconImgPhoto,
    IconPencel,
    IconCancel,
    IconAddFile,
    IconSign,
    IconImage,
    IconText,
    IconPage,
    IconSignBlue,
    IconSignRed,
    IconSignGreen,
    IconTrash,
    Modal,
  },
}
</script>
