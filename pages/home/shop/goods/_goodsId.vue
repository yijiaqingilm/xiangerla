<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/shop/goods/goodsList' }">产品列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑产品</el-breadcrumb-item>
        </el-breadcrumb>
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
                <el-input type="text" v-model="goods.price" auto-complete="off"></el-input>
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
    async asyncData ({store, error, params}) {
      let goodsId = params.goodsId
      store.dispatch({
        type: native.doSysCatalogsAll
      }).catch((err) => {
        error({message: err})
      })
      store.dispatch({
        type: native.doSysGoodsInfo,
        goodsId
      }).catch((err) => {
        error({message: err})
      })
      return {goodsId}
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
    created () {
      this.goods = Object.assign({}, this.goodsInfo)
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch({
              type: native.doSysGoodsEdit,
              ...this.goods
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
      ...mapState({
        catalogsList: ({shop}) => shop.catalogsAll
      }),
      goodsInfo () {
        console.log(this.$store.state.shop, 'this.$store.state.shop')
        return this.$store.state.shop.goods[this.goodsId]
      }
    }
  }
</script>

<style scoped>
    .from {
        margin-top: 100px;
    }
</style>