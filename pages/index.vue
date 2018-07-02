<template>
    <section class="container">
        <el-button type="danger">危险按钮</el-button>
        <nuxt-link :to="{ name: 'login'}">
            login
        </nuxt-link>
    </section>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import { Layout } from 'lib/base'

  export default {
    data () {
      return {
        user: {
          id: 1,
          name: 'yi',
          sex: '男'
        }
      }
    },
    head () {
      return {
        title: 'Users',
      }
    },
    created () {
      console.log('ces', new Layout())
      this.$store.dispatch({
        type: native.doSysUserList
      })
    },
    methods: {}
  }
</script>

<style scoped>
    .title {
        margin: 30px 0;
    }

    .users {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .user {
        margin: 10px 0;
    }
</style>
