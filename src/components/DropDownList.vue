<template>
    <div>
        <select @change="handleOnChange($event)">
            <option value="1" selected>최신 순으로</option>
            <option value="2">좋아요 많은 순으로</option>
            <option value="3">비공개 게시물</option>
            <option value="4">지역 상관 없이 모든 게시물</option>
        </select>
        <div id="result"></div>
    </div>
</template>

<script>
export default {
    name: 'drop-down-list',
    methods: {
        handleOnChange: function (e) {
            console.log(e.target.value)

            if(e.target.value==1)
                console.log("e.target.value == 1")
            else if(e.target.value==2)
                console.log("e.target.value == 2")
            else if(e.target.value==3)
                console.log("e.target.value == 3")
            else
                console.log("e.target.value == 4")
        }
    }
}
</script>
