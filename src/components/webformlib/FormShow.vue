<template>
  <div>
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>表单实验室</span>
        <el-tooltip class="item" effect="dark" placement="top-start">
          <div slot="content">
            表单实验室：<br/>
            用于快速构建提交表单工具，前端工具不需要再自己编写代码，直接通过可视化操作构建表单，只需要关注实现后端功能。<br/>
            表单名称：用于展示<br/>
            归属模块：同一模块会在表单实验室中展示到同一table页中，可以理解为同一系统提供的功能<br/>
            接口域名：表单点击提交后呼提交到该域名的服务器上；示例：https://www.xxxx.com<br/>
            表单key：唯一值，接口path，示例：/api/test，接口会请求到https://www.xxx/api/test<br/>
            表单描述：此表单功能的介绍<br/>
            在创建表单工具中，拖拽表单组件到空白区域，然后选中表单组件可以在右侧的组件配置进行表单组件的设置，点击预览后可以查看表单的效果，确认表单制作完成之后点击保存表单按钮，则会保存此表单规则，刷新页面后，表单实验室则会展示出来此表单<br/>
            在创建表单工具中，接口key输入已经保存的表单key时，会回显相关内容，修改后提交可以更新表单数据<br/>
          </div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </div>
        <el-select v-model="module" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      <el-divider></el-divider>
      <el-tabs :tab-position="tabPosition" v-model="formkey" @tab-click="tabClick">
        <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in formList" :key="index"></el-tab-pane>
        <el-card>
          <form-create :rule="rule" v-model="fApi" :option="option" @submit="onSubmit"/>
            <el-alert
              v-if="alertInfo.isShow"
              :title="alertInfo.txt"
              :type="alertInfo.type"
              center
              show-icon></el-alert>
            <div class="jsonEditor">
                <vue-json-editor
                v-model="jsonres"
                :mode="'view'"
                lang="zh"
                aria-disabled="true"
                @json-change="onJsonChange"
                @json-save="onJsonSave"
                @has-error="onError"></vue-json-editor>
            </div>
        </el-card>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import vueJsonEditor from 'vue-json-editor'
export default {
  components: {
    vueJsonEditor
  },
  data () {
    return {
      module: '',
      options: [],
      fApi: {},
      option: {},
      rule: [],
      tabPosition: 'left',
      formList: [],
      formkey: '',
      domain: '',
      alertInfo: {isShow: false, type: 'error', txt: ''},
      loading: false,
      jsonres: {
        msg: '这里显示接口提交后返回的json数据'
      }
    }
  },
  mounted: function () {
    this.loading = true
    this.alertInfo.isShow = false
    axios.get(this.global.server + '/api/webformlib/getAllModules').then(json => {
      if (json.data.status) {
        this.options = json.data['data']
        this.module = json.data['data'][0]
        // this.formkey = this.formList[0].key
        this.loading = false
      } else {
        this.loading = false
        this.alertInfo = {isShow: true, type: 'error', txt: json.data.message}
      }
    })
  },
  methods: {
    onSubmit (formData) {
      this.loading = true
      this.alertInfo.isShow = false
      var server = ''
      if (this.domain) {
        server = this.domain
      } else {
        server = this.global.server
      }
      axios.get(server + this.formkey, {
        params: formData
      }).then(json => {
        this.loading = false
        this.jsonres = json.data
      }).catch(err => {
        console.log(err)
        this.loading = false
        this.alertInfo = {isShow: true, type: 'error', txt: err}
        this.jsonres = {msg: err}
      })
    },
    tabClick () {
      this.loading = true
      this.jsonres = { msg: '这里显示接口提交后返回的json数据' }
      this.alertInfo.isShow = false
      axios.get(this.global.server + '/api/webformlib/getWebformRules', {
        params: {
          'webformKey': this.formkey,
          user: this.$cookies.get('cstestusername')
        }
      }).then(json => {
        if (json.data.status) {
          this.rule = json.data['data']['webformRules']
          this.option = json.data['data']['webformOption']
          this.domain = json.data['data']['domain']
          this.loading = false
        } else {
          this.loading = false
          this.alertInfo = {isShow: true, type: 'error', txt: json.data.message}
        }
      })
    },
    onJsonChange (value) {
      console.log('value:', value)
    },
    onJsonSave (value) {
      console.log('value:', value)
    },
    onError (value) {
      console.log('value:', value)
    }
  },
  watch: {
    module: function () {
      this.loading = true
      this.alertInfo.isShow = false
      axios.get(this.global.server + '/api/webformlib/getAllWebform?module=' + this.module).then(json => {
        if (json.data.status) {
        // this.formList = json.data.data
          this.formList = json.data.data
          this.formkey = this.formList[0].key
          this.tabClick()
          this.loading = false
        } else {
          this.loading = false
          this.alertInfo = {isShow: true, type: 'error', txt: json.data.message}
        }
      })
      this.rule = []
    }
  }
}
</script>
