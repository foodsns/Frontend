<template>
    <div>
        <b-container fluid="fluid" style="margin-top:1%; position:relative; left:30% ">
            <b-row>
                <b-col sm="10" style="width:30%;">
                    <b-form-textarea id="textarea" v-model="text" no-resize="no-resize"></b-form-textarea>
                </b-col>
                <b-col>
                    <span>
                        <b-row>
                        <b-button type="submit" variant="outline-dark" style="width:7.3%;  margin:auto">입력</b-button>
                        </b-row>
                        <b-row>
                        <form method="post" enctype="multipart/form-data" style="display:inline; margin-left:-10px" >
                            <input
                                type="file"
                                id="imgupload"
                                name="imgupload"
                                accept="image/*"
                                multiple="multiple"
                                @click="PhotoUp(this)"/>
                        </form>
                        </b-row>
                    </span>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
    data() {
        return {context: '', images: ''};
    },
    method: {
        PhotoUp(input) {
            var file = input.files[0];
            var name = document.getElementById('fileName');
            name.textContent = file.name;
            var newImage = document.createElement("img");
            newImage.setAttribute("class", 'img');
            newImage.src = URL.createObjectURL(file);

            newImage.style.width = "70%";
            newImage.style.height = "70%";
            newImage.style.visibility = "hidden"; //버튼을 누르기 전까지는 이미지를 숨긴다
            newImage.style.objectFit = "contain";

            //이미지를 image-show div에 추가
            var container = document.getElementById('image-show');
            container.appendChild(newImage);
        }
    }
}
</script>
