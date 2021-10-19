<template>
  <div id="writePostUI" style="position: relative">
    <crop-modal v-if="cropModal.show" v-bind:fileProp="cropModal.file" @close-modal="cropModal.show=false"></crop-modal>
    <div class="form-floating">
      <textarea class="form-control" value="inputText" id="floatingTextarea" placeholder="내용입력" @keyup.#="hashE" enctype="multipart/form-data" style="resize:none; margin-bottom:5px"></textarea>
    </div>
    <div class="Buttons">
      <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
        <label class="btn btn-primary" pill variant="primary" for="filebtn">
        사진
        </label>
        <input type="file" ref="fileInput" id="filebtn" @change="uploadOnePhoto" style="display:none" accept="image/*" multiple/>
      </form>
      <button type="submit" class="btn btn-success" id="postbtn">확인</button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'WritePostUI',
  data () {
    return {
      inputText: '',
      isCropModal: false,
      hashTag: [],
      cropModal: {
        show: false,
        file: null
      }
    }
  },
  methods: {
    uploadOnePhoto: function (e) {
      this.cropModal.show = false
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        const maxSize = 3 * 1024 * 1024
        if (file.size <= maxSize) {
          this.$nextTick(() => {
            this.cropModal.show = true
            this.cropModal.file = file
            e.target.value = ''
          })
        } else {
          console.warn(`Maximum file size: ${maxSize}, current: ${file.size}`)
        }
      } else {
        console.warn('Empty file detected')
      }
    }
  }
}
</script>
<style>
#form-control{
    resize : none;
    margin-bottom : 5px;
    height:50%;
    position : relative;
}

.postbtn{
  padding: 6px 25px;
  background-color:#FF6600;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

</style>
