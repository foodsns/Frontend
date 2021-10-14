<template>
<div class="CropModalUI" v-if="active">
<!--first modal-->
    <div class="modal fade" v-if="active" id="firstModalToggle" aria-hidden="true" aria-labelledby="firstModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="firstModalToggle">{{fileList[0].name}}</h5>
        <button type="button" class="btn-close" @click="$emit('close-modal')" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="img-container">
          <img v-bind:class="image" v-bind:src="img">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Open second modal</button>
      </div>
    </div>
  </div>
</div>

<!--mid modals-->
<div class="modal fade" v-if="active" id="midModalToggle" aria-hidden="true" aria-labelledby="midModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="firstModalToggle">{{fileList[0].name}}</h5>
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
import {EventBus} from '../lib/event-bus.js'

export default {
    data () {
        return {
            fileList: [],
            active: false,
            croppedImg: [],
            beforecrop: null,
            image: null 
        }
    },
    created () {
        EventBus.$on('crop-eventbus', function (fileList) {
            this.fileList = fileList
            this.active = true
            cropui()
        })
    },
    method: {
      cropui: function (index) {
          if (this.fileList) {
            const reader = new FileReader()
            reader.readAsDataURL(fileList[index])
            reader.onload = function (event) {
              this.image.attr("src", event.target.result)

          }
        }
      }
    }
}
</script>
