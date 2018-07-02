<template>
    <section>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="formInline.name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="userAdd">新增用户</el-button>
            </el-form-item>
        </el-form>
        <el-table class="c-table"
                  ref="multipleTable"
                  :data="userList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="userId"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="mobile"
                    label="手机号"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    prop="cardId"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    label="操作" width="400">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleAddOrder(scope.$index, scope.row)">下订单
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleFinishOrder(scope.$index, scope.row)">已完成订单
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleGoodsDetail(scope.$index, scope.row)">查看培训项目
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
                       :total="userTotal">
        </el-pagination>
    </section>
</template>

<script>
  import { globalConst as native, pageSize, orderStatus, modalTitle } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: 'userList',
    data () {
      return {
        page: 1,
        pageSize,
        formInline: {
          name: '',
          roleId: ''
        },
        multipleSelection: []
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$store.dispatch({
          type: native.doUserList,
          page: this.page,
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
      handleAddOrder (index, row) {
        console.log('row', row)
        let {userId, name} = row
        this.$router.push({path: '/home/order/orderAdd', query: {userId, name}})

      },
      handleFinishOrder (index, row) {

      },
      handleGoodsDetail (index, row) {

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
      handleEdit (index, row) {
        console.log(index, row)
        this.$router.push(`/home/user/${row.userId}`)
      },
      userAdd () {
        this.$router.push('/home/user/userAdd')
      }
    },
    computed: {
      ...mapState({
        userList: ({users}) => users.userList.data,
        userTotal: ({users}) => users.userList.total
      })
    }
  }
</script>

<style scoped>
    .pagination {
        margin-top: 20px;
    }
</style>