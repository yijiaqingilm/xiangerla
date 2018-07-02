<template>
    <section class="wrap">
        <el-container class="wrap">
            <ul>
                <li is="i-menu"></li>
            </ul>
            <el-header>
                <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                >
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <!--:unique-opened="true"-->
                    <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#545c64"
                            text-color="#fff"
                            :unique-opened="false"
                            active-text-color="#ffd04b">
                        <el-submenu v-for="(menu,index) in menuListByNode" :key='index' :index="index+''">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">{{menu.label}}</span>
                            </template>
                            <el-menu-item v-if='menu.children' v-for="(children,childrenIndex) in menu.children"
                                          :key="childrenIndex"
                                          :index="index+'-'+childrenIndex"
                                          @click="handleMenu(children.data)">
                                {{children.label}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <nuxt-child/>
                </el-main>
            </el-container>
            <el-footer>
                <my-footer/>
            </el-footer>
        </el-container>
    </section>
</template>

<script>
  import MyFooter from '~/components/Footer'
  import jwt from 'jsonwebtoken'
  import { mapState } from 'vuex'
  import { globalConst as native } from 'lib/const'
  import { getJsonTree } from 'lib/utils'
  import IMenu from '~/components/i-menu/IMenu'

  export default {
    name: 'home',
    async asyncData ({store, error}) {
      /* await store.dispatch({
        type: native.doSysRuleList
      }).catch((err) => {
        error({message: err})
      })*/
      let menuList = [
        {
          'rulesId': 5,
          'name': '用户管理',
          'url': 'user/userList',
          'parentNode': 6,
          'createdAt': null,
          'updatedAt': null,
          'apiUrl': 'user/list',
          'weight': null
        },
        {
          'rulesId': 6,
          'name': '权限管理',
          'url': '-1',
          'parentNode': -1,
          'createdAt': null,
          'updatedAt': null,
          'apiUrl': '-1',
          'weight': null
        },
        {
          'rulesId': 7,
          'name': '项目分类管理',
          'url': 'shop/catalogs/catalogsList',
          'parentNode': 6,
          'createdAt': null,
          'updatedAt': null,
          'apiUrl': 'shop/catalogs/list',
          'weight': null
        },
        {
          'rulesId': 8,
          'name': '项目管理',
          'url': 'shop/goods/goodsList',
          'parentNode': 6,
          'createdAt': null,
          'updatedAt': null,
          'apiUrl': 'shop/goods/list',
          'weight': null
        },
        {
          'rulesId': 9,
          'name': '产品组合管理',
          'url': 'shop/combo/comboList',
          'parentNode': 6,
          'createdAt': null,
          'updatedAt': null,
          'apiUrl': 'shop/combo/list',
          'weight': null
        },
        {
          'rulesId': 10,
          'name': '订单管理',
          'url': 'order/orderList',
          'parentNode': 6,
          'createdAt': null,
          'updatedAt': null,
          'apiUrl': 'order/list',
          'weight': null
        }]
      let menuListByNode = getJsonTree(menuList, -1)
      // let menuListByNode = getJsonTree(this.menuList, -1)
      return {menuListByNode}
    },
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
      }
    },
    async created () {
      console.log('测试')
      await setTimeout(() => {
        console.log('执行我么')
      }, 1000)
      console.log('success')
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleMenu (menu) {
        this.$router.push(`/home/${menu.url}`)
      },
      changeMain (menu) {
        if (menu === 'role') {
          this.$router.push('/home/role/roleList')
        } else if (menu === 'menu') {
          this.$router.push('/home/menu/menuList')
        } else {
          this.$router.push('/home/user/userList')
        }

      }
    },
    computed: {
      ...mapState({
        menuList: ({users}) => users.menuList
      })
    },
    components: {MyFooter, IMenu}
  }
</script>

<style scoped>
    .el-header {
        padding: 0;
        border-bottom: 1px solid #eeeeee;
    }

    .el-aside {
        background-color: #545c64;
    }

    .el-menu {
        border: 0;
    }
</style>