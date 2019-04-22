<template>
  <div class="about">
    <h1>中文简体转中文繁体</h1>
    <div
      class="file-block"
    >
      <div
        class="file"
        :class="{
          'is-dragover': dragover
        }"
        @drop.prevent="onDrop"
        @dragover.prevent="onDragover"
        @dragleave.prevent="dragover = false"
      >
        <div class="file-tip">请拖拽文件到此处</div>
        <input type="file" @change="handleChange" multiple="multiple" ref="input"/>
      </div>
    </div>
    <ul class="button-list">
      <li @click="upload" class="button-upload">上传</li>
      <li @click="downloadFile" class="button-download" :class="{'blue-bg': download}">下载</li>
    </ul>
    <div class="modal" @click="cancalModal">
      <div class="modal-text">文件加入成功，请点击上传按钮，进行上传</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { POST, GET } from '../tools/tools'
import FileSaver from 'file-saver'
interface fileType {
  status: string,
  name: string,
  size: number,
  percentage: number,
  uid: number,
  raw: any
}
interface progress {
  uploadProgress: any
}
@Component
export default class Home extends Vue {
  private dragover: boolean = false
  private tempIndex: number = 1
  private accept: string = 'srt, zip'
  private fileList: Array<fileType> = []
  private download: boolean = false
  private modal: boolean = false
  $refs!: {
    input: any
  }
  private onDragover (): void {
    this.dragover = true
  }
  private onDrop (e: any): void {
    const files = e.dataTransfer.files
    this.dragover = false
    this.modal = true
    this.uploadFiles(files)
  }
  private handleChange (e: any): any {
    const files = e.target.files
    this.modal = true
    if (e.target.files.length <= 0) {
      // console.log('文件上传失败')
      return false
    }
    this.uploadFiles(files)
    this.$refs.input.value = null
  }
  private type (file: File): boolean {
    const name: string = file.name
    const extension: string = name.indexOf('.') > -1 ? `.${name.split('.').pop()}` : ''
    return this.accept.split(',').map(x => x.trim()).some(v => '.' + v === extension)
  }
  private uploadFiles (files: any):void {
    let postFiles = Array.prototype.slice.call(files)
    postFiles.forEach(rawFile => {
      this.type(rawFile) && this.onStart(rawFile)
    })
  }
  private async upload () {
    const formData = new FormData()
    const config = {
      onUploadProgress: (progress: any) => {}
    }
    if (this.fileList.length <= 0) {
      // console.log('请上传文件')
      this.download = false
      return false
    }
    this.fileList.forEach((value: fileType) => {
      formData.append('files', value.raw, value.name)
    })
    const result: any = await POST('/file', formData, config)
    if (result && result.data.status === 'ok') {
      this.download = true
    } else {
      // console.log('上传失败')
    }
    this.$refs.input.value = null
    this.fileList = []
  }
  private onStart (rawFile: any): void {
    rawFile.uid = Date.now() + this.tempIndex++
    let file: fileType = {
      status: 'ready',
      name: rawFile.name,
      size: rawFile.size,
      percentage: 0,
      uid: rawFile.uid,
      raw: rawFile
    }
    this.fileList.push(file)
  }
  private async downloadFile () {
    const file: any = await GET('/download')
    const blob: Blob = new Blob([file.data], {
      type: 'application/zip'
    })
    FileSaver.saveAs(blob, 'title.zip')
  }
  private cancalModal () {
    this.modal = false
  }
}
</script>
<style lang="scss" scoped>
  .file-block {
    width: 100%;
  }
  .file {
    width: 500px;
    height: 300px;
    border: 1px dashed #d9d9d9;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &-tip {
      font-size: 30px;
      letter-spacing: 5px;
      font-weight: bold;
    }
    input[type='file'] {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
    &:hover {
      border-color: #409eff;
    }
  }
  .is-dragover {
    background-color: rgba(32, 159, 255, .6);
    border: 2px dashed #409eff;
  }
  .button-list {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    .button-upload, .button-download {
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: white;
      background-color: #409eff;
      border-radius: 5px;
      cursor: pointer;
    }
    .button-download {
      margin-left: 6px;
      background-color: #d9d9d9;
    }
    .blue-bg {
      background-color: #409eff;
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .6);
    .modal-text {
      color: white;
    }
  }
</style>
