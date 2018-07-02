<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/shop/goods/goodsList' }">产品列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增产品</el-breadcrumb-item>
        </el-breadcrumb>
        {{catalogsList}}
        <el-form :model="goods" status-icon :rules="rules2" ref="goods" label-width="100px"
                 class="from">
            <el-form-item label="产品分类" prop="catalogsId">
                <el-select v-model="goods.catalogsId">
                    <el-option v-for="(catalogs,index) in catalogsList" :key="index" :label="catalogs.name"
                               :value="catalogs.catalogsId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品名称" prop="name">
                <el-input type="text" v-model="goods.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="产品价格" prop="price">
                <el-input type="number" v-model="goods.price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('goods')">提交</el-button>
                <el-button @click="resetForm('goods')">重置</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: '',
    async asyncData ({store, error}) {
      store.dispatch({
        type: native.doSysCatalogsAll
      }).catch((err) => {
        error({message: err})
      })
    },
    data () {
      return {
        goods: {
          name: '',
          price: '',
          catalogsId: ''
        },
        rules2: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请输入项目价格', trigger: 'blur'},
          ],
          catalogsId: [
            {required: true, message: '请选择项目分类', trigger: 'change'},
          ],
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch({
              type: native.doSysGoodsAdd,
              ...this.goods
            }).then((data) => {
              this.$alert('创建成功', '友情提示')
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
      ...mapState({
        catalogsList: ({shop}) => shop.catalogsAll
      })
    }
  }
</script>

<style scoped>
    .from {
        margin-top: 100px;
    }
</style>