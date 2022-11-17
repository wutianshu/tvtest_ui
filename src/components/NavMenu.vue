<template>
  <div class="nav-div">
    <el-menu mode="horizontal"
             :router="true"
             :defaultActive="initPath"
             class="el-menu-demo"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">

       <el-menu-item index="/hello">欢迎</el-menu-item>
<!--      <el-menu-item index="">-->
<!--        <a href="http://xxxx.com/APP_Order/create_order/" target="_blank">tmp</a>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/worker">商家</el-menu-item>
      <el-submenu index="3">
        <template slot="title">工具</template>
        <el-menu-item index="/tools">工具</el-menu-item>
        <el-menu-item index="/webformlib">表单实验室</el-menu-item>
      </el-submenu>
      <el-menu-item index="/envmanage">环境管理</el-menu-item>
      <el-menu-item index="/enumerate">枚举</el-menu-item>
      <el-menu-item index="/jzcloud">云</el-menu-item>
      <el-submenu index="2">
        <template slot="title">bztest</template>
        <el-menu-item index="/bztools">小工具集合</el-menu-item>
        <el-menu-item index="/checklist">CkeckList</el-menu-item>
        <el-menu-item index="/website">站点管理</el-menu-item>
        <el-menu-item index="/longtask">脚本任务</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">钉钉提醒管理</template>
          <el-menu-item index="/menbers">用户列表</el-menu-item>
          <el-menu-item index="/dingtoken">群列表</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/about"
                    :disabled="true">关于我们</el-menu-item>
      <el-menu-item index=""><a style="text-decoration:none"
           href="https://xxx.com/api/docs"
           target="_blank">apidoc</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'App',
  data () {
    return {
      initPath: this.setInitPath()
    }
  },
  methods: {
    setInitPath () {
      var initPath = this.$route.path
      if (initPath === '/') {
        initPath = '/jzso_new'
      }
      return initPath
    }
  }
}
</script>
