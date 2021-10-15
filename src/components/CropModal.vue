<template>

  <div class="CropModalUI">
    <b-modal
      id="cropper-modal"
      ref="cropper-modal"
      title="Submit Your Name"
    >
      <div>
        File name:<span v-if="fileProp">{{fileProp.name}}</span>
        <img v-if="img" v-bind:src="img" />
      </div>
    </b-modal>
  </div>
</template>

<script>
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
            fileList: [],
            active: false,
            croppedImg: [],
            beforecrop: null,
            img: null
        }
    },
    mounted () {
      this.$refs['cropper-modal'].show()
      // https://stackoverflow.com/a/16153675/7270469
      const reader = new FileReader()
      reader.onload = (event) => {
        this.img = event.target.result
      }
      reader.readAsDataURL(this.fileProp)
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
