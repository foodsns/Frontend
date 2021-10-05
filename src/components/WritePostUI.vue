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
        <input type="file" id="filebtn" @change="uploadPhoto" style="display:none" accept="image/*" multiple/>
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
            hashtag: [],
            hash_count: 0
        }
    },
    methods: {
        uploadPhoto: function (e) {
            console.log('uploadPhoto :', e)
            if (e.target.files) {
                var fileList = e.target.files
                var maxSize = 3 * 1024 * 1024
                for (const file of fileList) {
                    if (file.size > maxSize) {
                        alert(file.name + ' : 3MB이하 이미지만 가능합니다.')
                        return false
                    }
                }
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
