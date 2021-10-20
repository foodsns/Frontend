<template>

  <div class="CropModalUI">
    <b-modal
      id="cropper-modal"
      ref="cropper-modal"
      title="Submit Your Name"
    >
      <vue-cropper ref="cropper" :img="option.img" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight">
      </vue-cropper>
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
    }
  }
</script>
<style scoped>
img {
  display: block;
  max-width: 100%;
}
</style>
