<template>
<div class="CropModalUI">
<!--first modal-->
  <div class="modal fade" id="firstModalToggle" aria-labelledby="firstModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="firstModalToggle"></h5>
        <button type="button" class="btn-close" @click="$emit('close-modal')" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="img-container">
          <img v-bind:src="img">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button>
      </div>
    </div>
  </div>
</div>

<!--mid modals-->
<div class="modal fade" id="midModalToggle" aria-hidden="true" aria-labelledby="midModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="firstModalToggle">{{fileProp.name}}</h5>
        <button type="button" class="btn-close" @click="$emit('close-modal')" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Show a second modal and hide this one with the button below.
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button>
      </div>
    </div>
  </div>
</div>
<!--last modal-->
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
        <button type="button" class="btn-close" @click="$emit('close-modal')" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Hide this modal and show the first with the button below.
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to first</button>
      </div>
    </div>
  </div>
</div>
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
      this.$refs['crop-modal'].show()
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
