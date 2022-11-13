<template>
  <section>
    <div class="relative">
      <h2
        class="mx-4 mb-1 text-t20 font-medium leading-7 tracking-tighter text-secondary lg:mb-4 lg:text-[32px] lg:leading-10"
      >
        我的文件
      </h2>
      <div class="lg:relative lg:-mr-8">
        <IconLine class="w-full"></IconLine>
        <IconAddFile_green
          class="absolute right-0 top-0 h-[60px] w-[60px] -translate-y-1/2 lg:h-20 lg:w-20 lg:translate-x-1/2"
        ></IconAddFile_green>
      </div>
    </div>
    <div
      v-if="filedata.length === 0"
      class="flex grow flex-col items-center justify-center gap-5 text-secondary"
    >
      <input hidden type="file" id="uploadFile" />
      <label for="uploadFile"
        ><IconAddFile class="h-20 w-20 lg:h-auto lg:w-auto"></IconAddFile
      ></label>
      <p class="text-[28px] font-medium lg:text-[44px]">快來建立新檔吧</p>
    </div>
    <div v-else class="flex grow flex-col items-center pt-3 text-secondary">
      <label
        class="mb-4 flex w-full items-center justify-between rounded-l-full rounded-r-full border-2 border-gray20 lg:absolute lg:top-10 lg:w-[400px]"
      >
        <IconSearch></IconSearch>
        <input
          type="text"
          class="mr-2 grow tracking-wider focus:outline-none"
          placeholder="請輸入關鍵字"
          v-model="keyword"
          @input="searchHandler"
        />
      </label>

      <div class="mb-6 hidden w-full items-center justify-end lg:flex">
        <transition>
          <div
            class="flex w-full pl-4 pt-4 text-t14 font-medium leading-5 tracking-wider"
            v-if="nowShow === 'list'"
          >
            <div class="w-10"></div>
            <div class="w-[240px]">建立名稱</div>
            <div class="grow">專案名稱</div>
          </div>
        </transition>
        <div class="flex">
          <IconList
            class="hover:cursor-pointer"
            @click="nowShow = 'list'"
          ></IconList>
          <IconTable
            class="hover:cursor-pointer"
            @click="nowShow = 'item'"
          ></IconTable>
        </div>
      </div>
      <transition>
        <ul
          class="flex w-full flex-col flex-wrap gap-y-5 overflow-auto lg:flex-row lg:gap-0"
          v-if="nowShow === 'item'"
        >
          <li
            class="rounded-[20px] bg-white lg:basis-1/3 lg:px-4 lg:py-3"
            v-for="item of SearchData"
            :key="item.id"
          >
            <input
              :id="item.id"
              type="checkbox"
              class="peer"
              name="file"
              hidden
            />
            <label
              class="file_shadow peer-checked:file_checked_status relative flex flex-col items-center border border-secondary-light p-2 font-medium lg:p-6"
              :for="item.id"
            >
              <img
                class="mb-[18px] h-[120px] lg:h-[124px]"
                :src="item.url"
                alt=""
              />
              <h3 class="mb-1 text-secondary">{{ item.name }}</h3>
              <span class="text-gray40">{{ item.Date }}</span>
              <div
                class="absolute right-3 top-4 lg:hidden"
                @click="toggleDropdown(item.id)"
              >
                <IconDot class="fill-[#2d2d2d] hover:fill-primary"></IconDot>
              </div>
              <div
                class="absolute right-3 top-4 bottom-4 flex flex-col items-center justify-between gap-6 rounded-full border-2 border-primary bg-white px-3 py-5 ring-4 ring-primary/30 lg:static"
                :class="[item.isShow ? 'flex' : 'hidden']"
              >
                <IconDelfile @click="toggleDropdown(item.id)"></IconDelfile>
                <IconDownload @click="toggleDropdown(item.id)"></IconDownload>
                <IconReview @click="toggleDropdown(item.id)"></IconReview>
              </div>
              <div
                class="hidden items-center justify-between gap-2 pt-4 lg:flex"
              >
                <IconDelfile></IconDelfile>
                <IconDownload></IconDownload>
                <IconReview></IconReview>
              </div>
            </label>
          </li>
        </ul>
      </transition>
      <transition>
        <ul
          class="hidden w-full flex-col gap-3 lg:flex"
          v-if="nowShow === 'list'"
        >
          <li
            class="task_shadow rounded-[20px] border border-secondary-light p-4"
            v-for="item of SearchData"
            :key="item.id"
          >
            <div class="flex w-full items-center text-secondary">
              <IconTaskItem></IconTaskItem>
              <span class="w-[240px]">{{ item.Date }}</span>
              <h3 class="grow">{{ item.name }}</h3>
              <div class="flex">
                <IconDownload></IconDownload>
                <IconReview></IconReview>
                <IconDelfile></IconDelfile>
              </div>
            </div>
          </li>
        </ul>
      </transition>
    </div>
  </section>
</template>

<script>
import IconLine from '../components/icons/IconLine.vue'
import IconAddFile from '../components/icons/IconAddFile.vue'
import IconSearch from '../components/icons/IconSearch.vue'
import IconDot from '../components/icons/IconDot.vue'
import IconDelfile from '../components/icons/IconDelfile.vue'
import IconDownload from '../components/icons/IconDownload.vue'
import IconReview from '../components/icons/IconReview.vue'
import IconList from '../components/icons/IconList.vue'
import IconTable from '../components/icons/IconTable.vue'
import IconTaskItem from '../components/icons/IconTaskItem.vue'
import IconAddFile_green from '../components/icons/IconAddFile_green.vue'

export default {
  data() {
    return {
      filedata: [
        {
          id: 'file1',
          Date: '2022-11-07  12:34:56',
          name: '合約finalfinalfinal',
          url: './src/assets/images/contract.jpg',
          isShow: false,
        },
        {
          id: 'file2',
          Date: '2022-11-07  12:34:56',
          name: '爸爸的簽名照final',
          url: './src/assets/images/contract.jpg',
          isShow: false,
        },
        {
          id: 'file3',
          Date: '2022-11-07  12:34:56',
          name: '周杰倫簽名照',
          url: './src/assets/images/contract.jpg',
          isShow: false,
        },
        {
          id: 'file4',
          Date: '2022-11-07  12:34:56',
          name: 'final',
          url: './src/assets/images/contract.jpg',
          isShow: false,
        },
        {
          id: 'file5',
          Date: '2022-11-07  12:34:56',
          name: '合約5',
          url: './src/assets/images/contract.jpg',
          isShow: false,
        },
      ],
      nowShow: 'item',
      keyword: '',
    }
  },
  created() {
    window.addEventListener('resize', this.resizeHandler)
  },
  unmounted() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    findIndex(id) {
      return this.filedata.map((item) => item.id).indexOf(id)
    },
    toggleDropdown(id) {
      const index = this.findIndex(id)
      if (index === -1) return false
      this.filedata[index].isShow = !this.filedata[index].isShow
    },
    searchHandler() {
      if (this.keyword.length === 0) return false
      console.log(this.keyword)
    },
    resizeHandler(e) {
      if (e.target.innerHeight < 992) {
        this.nowShow = 'item'
      }
    },
  },
  computed: {
    SearchData() {
      if (this.keyword.length === 0) {
        return this.filedata
      } else {
        return this.filedata.filter(
          (item) => item.name.indexOf(this.keyword) !== -1
        )
      }
    },
  },
  components: {
    IconLine,
    IconAddFile,
    IconSearch,
    IconDot,
    IconDelfile,
    IconDownload,
    IconReview,
    IconList,
    IconTable,
    IconTaskItem,
    IconAddFile_green,
  },
}
</script>
