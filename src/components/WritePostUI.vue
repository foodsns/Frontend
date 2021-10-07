<template>
  <div id="writePostUI" style="position: relative">
    <div class="form-floating">
      <textarea class="form-control" value="inputText" id="floatingTextarea" placeholder="내용입력" @keyup.#="hashE" enctype="multipart/form-data" style="resize:none; margin-bottom:5px"></textarea>
    </div>
    <div class="Buttons">
      <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
        <label class="btn btn-primary" pill variant="primary" for="filebtn">
        사진
        </label>
        <input type="file" id="filebtn" @change="uploadPhoto" v-bind:imgList="imgtogo" style="display:none" accept="image/*" multiple/>
        <CropImg></CropImg>
      </form>
      <button type="submit" class="btn btn-success" id="postbtn">확인</button>
    </div>
  </div>
</template>
<script>
import {EventBus} from '../lib/event-bus.js'
import {CropImg} from './component/CropImg.vue'

export default {
    name: 'WritePostUI',
    components: {
      CropImg
    },
    data () {
        return {
            inputText: '',
            hashtag: [],
            hash_count: 0,
            imgList: []
        }
    },
    methods: {
        uploadPhoto: function (e) {
            console.log('uploadPhoto :', e)
            if (e.target.files) {
                var fileList = e.target.files
                var maxamount = 15
                var maxSize = 3 * 1024 * 1024
                if (fileList.length > maxamount) {
                  alert('15개 이하만 업로드 가능합니다.')
                }
                for (const file of fileList) {
                    if (file.size > maxSize) {
                        alert(file.name + ' : 3MB이하 이미지만 가능합니다.')
                        return false
                    }
                }
                EventBus.$emit('crop-eventbus', this.fileList)
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
