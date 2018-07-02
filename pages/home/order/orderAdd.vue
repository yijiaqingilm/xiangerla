<template>
    <section>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/order/orderList' }">订单列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增订单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="order" status-icon :rules="rules2" ref="order" label-width="100px"
                 class="from">
            <el-form-item label="用户信息查询">
                <el-col :span="18">
                    <el-input v-model="userInfo" placeholder="输入用户姓名或手机号或身份证号"></el-input>
                </el-col>
                <el-col :span="4" class="btn-search">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="用户选择">
                <el-table
                        :data="userList"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            label="编号"
                            prop="userId"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="姓名"
                            prop="name"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="昵称"
                            prop="nickName"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="手机号"
                            prop="mobile"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="身份证号"
                            prop="cardId">
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="所选用户信息" v-if="currentUser">
                <div>姓名：{{currentUser.name}}</div>
                <div>手机号：{{currentUser.mobile}}</div>
                <div>身份证号：{{currentUser.cardId}}</div>
            </el-form-item>
            <el-form-item label="项目选择" prop="goods">
                <div v-for="(catalogs) in catalogsList">
                    <el-checkbox v-model="catalogs.checkAll" @change="handleCheckAllChange(catalogs)">
                        全选{{catalogs.name}}
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group class="checkbox-group" v-model="catalogs.checkedItems"
                                       @change="handleCheckedItemsChange(catalogs)">
                        <el-checkbox border v-for="(goods,index) in catalogs.goods" :label="goods" :key="index">
                            {{goods.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-form-item>
            <el-form-item label="套餐选择" prop="combo">
                <el-checkbox-group class="checkbox-group" v-model="combo">
                    <el-checkbox border v-for="(combo,index) in comboList" :label="combo" :key="index">
                        {{combo.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="总价格" prop="total">
                <el-input type="text" readonly :value="totalPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格优惠" prop="discount">
                <el-input type="text" v-model="order.discount" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="合计" prop="total">
                <el-input type="text" readonly :value="orderTotal" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="order.remark" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('order')">提交</el-button>
                <el-button @click="resetForm('order')">重置</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
  import { globalConst as native, modalTitle } from 'lib/const'
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import flatten from 'lodash/flatten'

  export default {
    name: '',
    async asyncData ({store, error}) {
      store.dispatch({
        type: native.doSysCatalogsAllJoinGoods
      })
      store.dispatch({
        type: native.doSysComboListAll
      })
    },
    data () {
      return {
        userList: [],
        userInfo: '',
        currentUser: {},
        order: {
          userId: '',
          combo: [],
          remark: '',
          goods: [],
          priceTotal: 0,
          discount: 0,
          total: 0,
        },
        combo: [],
        rules2: {
          userId: [
            {required: true, message: '请选择用户名', trigger: 'blur'}
          ],
        }
      }
    },
    created () {
      /* let userId = this.$route.query.userId
      let userName = this.$route.query.name
      if (userId) {
        this.userId = userId
      }*/
    },
    methods: {
      onSubmit () {
        this.$store.dispatch({
          type: native.doUserSearch,
          key: this.userInfo
        }).then((data) => {
          this.userList = data.data
        })
      },
      handleCurrentChange (user) {
        this.currentUser = user
      },
      handleCheckAllChange (catalogs) {
        catalogs.checkedItems = catalogs.checkAll ? catalogs.goods : []
      },
      handleCheckedItemsChange (catalogs) {
        catalogs.checkAll = catalogs.checkedItems.length === catalogs.goods.length
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.currentUser.userId) {
              this.$alert('请选择学员', modalTitle)
              return
            }
            if (this.checkedGoodsItems.length === 0 && this.combo.length === 0) {
              this.$alert('请选择培训项目或项目套餐', modalTitle)
              return
            }
            console.log('order', this.order)
            this.order.userId = this.currentUser.userId
            this.order.userName = this.currentUser.name
            this.order.priceTotal = this.totalPrice
            this.order.total = this.orderTotal
            this.order.goods = this.checkedGoodsItems.map((goods) => goods.goodsId)
            this.order.combo = this.combo.map((combo) => combo.comboId)
            this.$store.dispatch({
              type: native.doSysOrderAdd,
              ...this.order
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
      checkedGoodsItems () {
        let goodsItems = this.catalogsList.map((catalogs) => catalogs.checkedItems)
        return flatten(goodsItems)
      },
      totalPrice () {
        let goodsPrice = this.checkedGoodsItems.reduce((a, b) => a + b.price, 0)
        let comboPrice = this.combo.reduce((a, b) => a + b.price, 0)
        return Number(goodsPrice + comboPrice).toFixed(2)
      },
      orderTotal () {
        let discount = parseFloat(this.order.discount)
        if (!discount) {
          discount = 0
        }
        return this.totalPrice - discount
      },
      ...mapState({
        catalogsList: ({shop}) => {
          if (!shop.catalogsAllJoinGoods) {
            return []
          }
          let catalogsList = shop.catalogsAllJoinGoods.map((catalogs) => {
            Vue.set(catalogs, 'checkAll', false)
            Vue.set(catalogs, 'checkedItems', [])
            return catalogs
          })
          return catalogsList
        },
        comboList: ({shop}) => shop.comboListAll
      })
    },
  }
</script>

<style scoped>
    .from {
        margin-top: 100px;
    }

    .checkbox-group {
        margin-left: 25px;
    }

    .btn-search {
        margin-left: 20px;
    }

</style>