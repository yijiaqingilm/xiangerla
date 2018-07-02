<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/user/userList' }">用户列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增用户</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="user" status-icon :rules="rules2" ref="user" label-width="100px"
                 class="from">
            <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="user.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input type="text" v-model="user.mobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="cardId">
                <el-input type="text" v-model="user.cardId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('user')">提交</el-button>
                <el-button @click="resetForm('user')">重置</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: '',
    async asyncData ({store, error, params}) {
      let userId = params.userId
      await store.dispatch({
        type: native.doUserInfo,
        userId
      }).catch((err) => {
        error({message: err})
      })
      return {userId}
    },
    data () {
      return {
        user: {
          name: '',
          mobile: '',
          cardId: ''
        },
        rules2: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          cardId: [
            {required: true, message: '请输入身份证号', trigger: 'blur'}
          ],
        }
      }
    },
    created () {
      this.user = Object.assign({}, this.userInfo)
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('user', this.user, native.doUserEdit)
            this.$store.dispatch({
              type: native.doUserEdit,
              ...this.user
            }).then((data) => {
              this.$alert('编辑成功', '友情提示')
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.users.user[`${this.userId}`]
      }
    }
  }
</script>

<style scoped>
    .from {
        margin-top: 100px;
    }
</style>