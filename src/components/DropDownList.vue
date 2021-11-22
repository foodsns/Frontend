<template>
    <div>
        <select @change="handleOnChange($event)">
            <option value="1" selected>최신 순으로</option>
            <option value="2">좋아요 많은 순으로</option>
            <option value="3">비공개 게시물</option>
            <option value="4">지역 상관 없이 모든 게시물</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'drop-down-list',
    methods: {
        handleOnChange: function (e) {
            console.log(e.target.value)
        }
    }
}
</script>
