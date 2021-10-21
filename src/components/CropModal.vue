<template>

  <div class="CropModalUI">
    <b-modal
      id="cropper-modal"
      ref="cropper-modal"
      v-bind:title="foodname"
    >
    <div slot="modal-header">
      <input type="text" id="insertfd" placeholder="어떤 이름의 음식이였나요?"/>
    </div>
      <template v-if="option.img">
        <vue-cropper ref="cropper" :src="option.img" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight">
        </vue-cropper>
        <!-- test Croppedimg> <img :src="croppedimg" /> <-->
      </template>
      <div slot="modal-footer">
        <b-button variant="primary" @click="imgsubmit">확인</b-button>
        <b-button variant="secondary" @click="$bvModal.hide('cropper-modal')">닫기</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  components: { VueCropper },
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
          foodname: '',
          croppedimg: '',
            option: {
              img: null,
              autoCrop: true,
              autoCropWidth: 500,
              autoCropHeight: 550
            }
        }
    },
    mounted () {
      this.$refs['cropper-modal'].show()
      // https://stackoverflow.com/a/16153675/7270469
      const reader = new FileReader()
      reader.onload = (event) => {
        this.option.img = event.target.result
      }
      reader.readAsDataURL(this.fileProp)
    },
    methods: {
      imgsubmit () {
        this.croppedimg = this.$refs.cropper.getCroppedCanvas().toDataURL()
      }
    }
  }
</script>
<style scoped>
#insertfd{
  border: none;
}
input:focus {
    outline: none;
}

img {
  display: block;
  max-width: 100%;
}
</style>
