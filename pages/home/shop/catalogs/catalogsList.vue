<template>
    <section>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="formInline.name" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="catalogsAdd">新增项目分类</el-button>
            </el-form-item>
        </el-form>
        <el-table class="c-table"
                  ref="multipleTable"
                  :data="catalogsList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="catalogsId"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    prop="remark"
                    label="备注"
                    width="120">
            </el-table-column>

            </el-table-column>
            <el-table-column
                    label="操作" width="250">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
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
                       :total="catalogsTotal">
        </el-pagination>
    </section>
</template>

<script>
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'

  export default {
    name: 'catalogsList',
    async asyncData ({error, store}) {
      let page = 1
      let pageSize = 2
      await store.dispatch({
        type: native.doSysCatalogsList,
        page,
        size: pageSize
      }).catch((err) => {
        error({message: err})
      })
      return {page, pageSize}
    },
    data () {
      return {
        formInline: {
          name: '',
          roleId: ''
        },
        multipleSelection: []
      }
    },
    created () {},
    methods: {
      prevPage () {
        this.page -= 1
        this.$store.dispatch({
          type: native.doSysCatalogsList,
          page: this.page,
          size: this.pageSize
        })
      },
      nextPage () {
        this.page += 1
        this.$store.dispatch({
          type: native.doSysCatalogsList,
          page: this.page,
          size: this.pageSize
        })
      },
      currentPage (page) {
        this.page = page
        this.$store.dispatch({
          type: native.doSysCatalogsList,
          page: this.page,
          size: this.pageSize
        })
      },
      onSubmit () {
        this.page = 1
        this.$store.dispatch({
          type: native.doSysUserSeach,
          page: this.page,
          size: this.pageSize,
          ...this.formInline
        })
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
        this.$router.push(`/home/shop/catalogs/${row.catalogsId}`)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      catalogsAdd () {
        this.$router.push('/home/shop/catalogs/catalogsAdd')
      }
    },
    computed: {
      ...mapState({
        catalogsList: ({shop}) => shop.catalogsList.data,
        catalogsTotal: ({shop}) => shop.catalogsList.total
      })
    }
  }
</script>

<style scoped>
    .pagination {
        margin-top: 20px;
    }
</style>