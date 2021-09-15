<template>
  <div id="loginboard">
    <b-container>
        <b-row align-v="center" align-h="center">
            <b-col cols="12" md="8" lg="5" xl="4" xxl="4" align-self="center">
                <b-card title="로그인 / 회원가입" sub-title="아래 SNS 인증을 통해 로그인 하세요.">
                    <google-sign @sign-state="onAuthStateChanged"></google-sign>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'LoginBoard',
  data () {
    return {
        msg: 'hello world'
    }
  },
  methods: {
      onAuthStateChanged: function (state) {
          if (state) {
              this.$router.push('/')
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginboard {
    height: 100vh;
}
div.container {
    height: 100vh;
}
div.container div.row {
    height: 100vh;
}
</style>
