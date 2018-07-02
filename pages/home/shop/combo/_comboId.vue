<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/shop/combo/comboList' }">组合列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑组合</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="combo" status-icon :rules="rules2" ref="combo" label-width="100px"
                 class="from">
            </el-form-item>
            <el-form-item label="组合名称" prop="name">
                <el-input type="text" v-model="combo.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目选择">
                <el-transfer
                        filterable
                        :titles="['可选项目','已选项目']"
                        filter-placeholder="请输入项目名称"
                        v-model="combo.goods"
                        :data="goodsList">
                </el-transfer>
            </el-form-item>
            <el-form-item label="已选项目">
                <el-tag v-for="(goods,index) in combo.goods" :key="index">{{findGoodsById(goods).name}}</el-tag>
            </el-form-item>
            <el-form-item label="组合原价" prop="price">
                <el-input type="text" readonly :value="comboPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="组合价格设置" prop="price">
                <el-input type="text" v-model="combo.price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="combo.remark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('combo')">提交</el-button>
                <el-button @click="resetForm('combo')">重置</el-button>
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
      let comboId = params.comboId
      store.dispatch({
        type: native.doSysGoodsAll
      }).catch((err) => {
        error({message: err})
      })
      store.dispatch({
        type: native.doSysComboInfo,
        comboId
      }).catch((err) => {
        error({message: err})
      })
      return {comboId}
    },
    data () {
      return {
        combo: {
          name: '',
          oprice: '',
          remark: '',
          goods: [],
        },
        rules2: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
          ],
          oprice: [
            {required: true, message: '请输入项目价格', trigger: 'blur'},
          ],
        }
      }
    },
    created () {
      this.combo = Object.assign({}, this.comboInfo)
      this.combo.goods = this.combo.goods.map((goods) => goods.goodsId)
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.combo.oprice = this.comboPrice
            this.$store.dispatch({
              type: native.doSysComboEdit,
              ...this.combo
            }).then((data) => {
              this.$alert('编辑成功', '友情提示')
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      findGoodsById (goodId) {
        for (let i = 0; i < this.goodsAll.length; i++) {
          if (goodId >>> 0 === this.goodsAll[i].goodsId) {
            return this.goodsAll[i]
          }
        }
        return {}
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    computed: {
      ...mapState({
        goodsAll: ({shop}) => shop.goodsAll,
        goodsList: ({shop}) => {
          if (!shop.goodsAll) {
            return
          }
          let goodsList = shop.goodsAll.map((goods) => ({label: goods.name, key: goods.goodsId}))
          return goodsList
        },
      }),
      comboPrice () {
        if (!this.combo.goods) {
          return 0
        }
        let priceArr = this.combo.goods.map((goodsId) => {
          let goods = this.findGoodsById(goodsId)
          return goods.price ? goods.price : 0
        })
        return priceArr.reduce((a, b) => a + b, 0)
      },
      comboInfo () {
        console.log(this.$store.state.shop.combo, 'this.$store.state.shop.combo')
        return this.$store.state.shop.combo[this.comboId]
      }
    }
  }
</script>

<style scoped>
    .from {
        margin-top: 100px;
    }

    span.el-tag {
        margin-right: 10px;
    }
</style>