<template>
  <div>
    <div class="previewModal">
      <b-modal
        id="preview-modal"
        ref="preview-modal"
        scrollable
        centered
        :no-close-on-backdrop="true"
        title="이대로 업로드하시겠습니까?"
      >
      <b-container fluid>
        <b-row>
          <b-col class="modal-content-size">
            <template>
              <img id="previewimg" :src="croppedimg">
            </template>
          </b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer">
          <b-button variant="warning" v-b-modal.cropper-modal>편집</b-button>
          <b-button variant="primary" @click="imgsubmit">업로드</b-button>
          <b-button variant="secondary" @click="$bvModal.hide('preview-modal')">닫기</b-button>
      </div>
      </b-modal>
    </div>
  <div class="CropModalUI">
    <b-modal
      id="cropper-modal"
      ref="cropper-modal"
      scrollable
      v-bind:title="foodname"
      centered
      :no-close-on-backdrop="true"
      hide-footer
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
            </template>
          </b-col>
        </b-row>
      </b-container>
      <div class="modal-footer justify-content-between">
        <div>
          <b-button pill variant="outline-warning" @click="leftrotate"><b-icon icon="arrow-counterclockwise"></b-icon></b-button>
          <b-button pill variant="outline-warning" @click="rightrotate"><b-icon icon="arrow-clockwise">오른쪽</b-icon></b-button>
        </div>
      <div>
        <b-button variant="primary" v-b-modal.preview-modal @click="completedEdit">확인</b-button>
        <b-button variant="secondary" @click="$bvModal.hide('cropper-modal')">닫기</b-button>
      </div>
      </div>
    </b-modal>
  </div>
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
            aspectRatio: 2
          }
        }
    },
    mounted () {
      this.$refs['preview-modal'].show()
      // https://stackoverflow.com/a/16153675/7270469
      const reader = new FileReader()
      reader.onload = (event) => {
        this.option.img = event.target.result
        this.croppedimg = event.target.result
      }
      reader.readAsDataURL(this.fileProp)
    },
    methods: {
      imgsubmit () {
        this.$emit('updatefileProp', this.croppedimg)
        console.log('사진 업로드')
      },
      completedEdit () {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
          this.croppedimg = URL.createObjectURL(blob)
          this.$bvModal.hide('cropper-modal')
          console.log('편집성공')
        })
      },
      leftrotate () {
        this.$refs.cropper.rotate(-90)
      },
      rightrotate () {
        this.$refs.cropper.rotate(90)
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
