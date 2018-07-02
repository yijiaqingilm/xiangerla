<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/shop/catalogs/catalogsList' }">产品分类列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑产品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="catalogs" status-icon :rules="rules2" ref="catalogs" label-width="100px"
                 class="from">
            <el-form-item label="分类名称" prop="name">
                <el-input type="text" v-model="catalogs.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="text" v-model="catalogs.remark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('catalogs')">提交</el-button>
                <el-button @click="resetForm('catalogs')">重置</el-button>
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
      let catalogsId = params.catalogsId
      store.dispatch({
        type: native.doSysCatalogsInfo,
        catalogsId
      }).catch((err) => {
        error({message: err})
      })
      return {catalogsId}
    },
    data () {
      return {
        catalogs: {
          name: '',
          remark: ''
        },
        rules2: {
          name: [
            {required: true, message: '请输入项目分类名称', trigger: 'blur'}
          ],
        }
      }
    },
    created () {
      this.catalogs = Object.assign({}, this.catalogsInfo)
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch({
              type: native.doSysCatalogsEdit,
              ...this.catalogs
            }).then((data) => {
              this.$alert('修改成功', '友情提示')
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
      ...mapState({}),
      catalogsInfo () {
        return this.$store.state.shop.catalogs[this.catalogsId]
      }
    }
  }
</script>

<style scoped>
    .from {
        margin-top: 100px;
    }
</style>