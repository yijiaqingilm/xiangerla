<template>
    <section>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户信息">
                <el-input v-model="formInline.userInfo" placeholder="用户名或手机号或身份证号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="orderAdd">新增订单</el-button>
            </el-form-item>
        </el-form>
        <el-table class="c-table"
                  ref="multipleTable"
                  :data="orderList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="orderId"
                    width="160"
                    label="订单号">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    prop="discount"
                    label="价格减免">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    prop="total"
                    label="价格总计">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="120">
                <template slot-scope="scope">
                    <el-tag :type="orderStatusInfo[scope.row.status].status">
                        {{orderStatusInfo[scope.row.status].name}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作" width="250">
                <template slot-scope="scope">
                    <el-button
                            v-if="scope.row.source===0 && scope.row.status===0"
                            size="mini"
                            type="danger"
                            @click="handlePay(scope.$index, scope.row)">去支付
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="showOrderDetail(scope.$index, scope.row)">订单详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination"
                       layout="prev, pager, next"
                       @current-change="currentPage"
                       @prev-click="prevPage"
                       @next-click="nextPage"
                       :page-size="pageSize"
                       :total="orderTotal">
        </el-pagination>
    </section>
</template>

<script>
  import { globalConst as native, pageSize, orderStatus, orderStatusInfo, modalTitle } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: 'orderList',
    async asyncData ({error, store}) {
      let page = 1
      await store.dispatch({
        type: native.doSysOrderList,
        page,
      }).catch((err, code) => {
        error({message: err, statusCode: code})
      })
      return {page}
    },
    data () {
      return {
        orderStatusInfo,
        orderStatus,
        pageSize,
        formInline: {
          userInfo: '',
        },
        multipleSelection: []
      }
    },
    created () {},
    methods: {
      loadData () {
        this.$store.dispatch({
          type: native.doSysOrderList,
          page: this.page,
          userInfo: this.formInline.userInfo
        })
      },
      prevPage () {
        this.page -= 1
        this.loadData()
      },
      nextPage () {
        this.page += 1
        this.loadData()
      },
      currentPage (page) {
        this.page = page
        this.loadData()
      },
      onSubmit () {
        this.page = 1
        this.loadData()
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach((row) => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handlePay (index, row) {
        this.$confirm(`${row.userId}需支付${row.total}元，确定已支付？`, modalTitle).then(() => {
          console.log('yes')
          this.$store.dispatch({
            type: native.doSysOrderOfflinePay,
            orderId: row.orderId
          }).then((data) => {
            row.status = orderStatus.pay
          })
        })
        console.log(index, row)
      },
      showOrderDetail (index, row) {
        console.log('showorderDetail')
      },
      orderAdd () {
        this.$router.push('/home/order/orderAdd')
      }
    },
    computed: {
      ...mapState({
        orderList: ({order}) => order.orderList.data,
        orderTotal: ({order}) => order.orderList.total
      })
    }
  }
</script>

<style scoped>
    .pagination {
        margin-top: 20px;
    }
</style>