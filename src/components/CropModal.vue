<template>
  <div class="CropModalUI">
    <b-modal
      id="cropper-modal"
      ref="cropper-modal"
      title="Submit Your Name"
    >
      <div>
        File name:<span v-if="fileProp">{{fileProp.name}}</span>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {EventBus} from '../lib/event-bus.js'
// 지금 당장 소스상에 사용된 기록이 없었기 때문에 es-lint 오류가
// 나서 임시로 주석처리함, 나중에 쓸때 다시 주석 해제하고 쓰면 됨
// import VueCropper from 'vue-cropperjs'

export default {
  props: {
    fileProp: {
        type: File,
        default: function () {
            return null
        }
    }
  },
  watch: {
    fileProp: function (val) {
    }
  },
  data () {
      return {
          fileList: {}, // fileList
          active: false,
          croppedImg: [],
          beforecrop: null
      }
  },
  created () {
      EventBus.$on('crop-eventbus', function (fileList) {
          this.fileList = fileList
          this.active = true
      })
  },
  mounted () {
    this.$refs['cropper-modal'].show()
  },
  method: {
    // cropui: function(index) {
    //     if (fileList) {
    //       const reader = new Filereader()
    //       reader.readAsDataURL(fileList[index])
    //       reader.onload = function(event) {
    //         image.attr("src", e.target.result)
    //         cropper = image.cropper( {
    //           dragMode: 'move',
    //           vieMode: 1,
    //           autoCropArea: 0.7,
    //           guides: false
    //       })
    //     }
    //   }
    // }
  }
}
</script>
