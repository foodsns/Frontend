<template>

  <div class="CropModalUI">
    <b-modal
      id="cropper-modal"
      ref="cropper-modal"
      scrollable
      v-bind:title="foodname"
      centered
      :no-close-on-backdrop="true"
    >
    <!--<div slot="modal-header">
      <input type="text" id="insertfd" placeholder="음식이 잘 보일 수 있게 편집해주세요"/>
    </div>-->
      <b-container fluid>
        <b-row>
          <b-col class="modal-content-size">
            <template v-if="option.img">
              <vue-cropper ref="cropper" :src="option.img" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight" :aspectRatio="option.aspectRatio" :viewMode="option.viewMode">
              </vue-cropper>
              <!-- test Croppedimg> <img :src="croppedimg" /> <-->
            </template>
          </b-col>
        </b-row>
      </b-container>
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
          foodname: '음식이 잘 보일 수 있게 편집해주세요',
          croppedimg: '',
          option: {
            img: null,
            autoCrop: true,
            autoCropWidth: 500,
            autoCropHeight: 500,
            aspectRatio: 2,
            viewMode: 3
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
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
          this.croppedimg = URL.createObjectURL(blob)
          this.$bvModal.hide('cropper-modal')
          this.$emit('updatefileProp', this.croppedimg)
        })
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
.modal-content-size {
  height: 60vh;
  max-height: 60vh;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
