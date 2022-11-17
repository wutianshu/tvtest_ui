<template>
  <div>
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
            <span>创建表单</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="表单key" prop="webformkey">
              <el-input v-model="form.webformkey" placeholder="请输表单唯一key，表单提交接口会使用该key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
          <el-form-item label="表单名称" prop="webformname">
            <el-input v-model="form.webformname" placeholder="请输表单名称，名称会做展示"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="4" offset=1>
            <el-button type="primary" icon="el-icon-circle-plus" @click="submitForm('form')">保存表单</el-button>
          </el-col>
      </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="接口域名" prop="domain">
              <el-input v-model="form.domain" placeholder="示例：https://abc.com，为空时默认请求https://xxxx.com"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="归属模块" prop="module">
              <el-input v-model="form.module" placeholder="相同表单归属模块会在一起展示"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="19">
            <el-form-item label="表单描述" prop="webformdesc">
              <el-input v-model="form.webformdesc" placeholder="表单功能描述"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      </el-form>
      <el-alert
            v-if="alertInfo.isShow"
            :title="alertInfo.txt"
            :type="alertInfo.type"
            center
            show-icon>
      </el-alert>
    <fc-designer ref="designer" height="800px"/>
    </el-card>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'formcreate',
  data () {
    return {
      form: {
        webformname: '',
        webformkey: '',
        webformdesc: '',
        webformrules: [],
        webformoption: {},
        domain: '',
        module: ''
      },
      loading: false,
      alertInfo: {isShow: false, type: 'error', txt: ''},
      interResult: 'success',
      rules: {
        webformname: [
          { required: true, message: '表单名称为必填项', trigger: 'change' }
        ],
        webformkey: [
          { required: true, message: '表单key为必填项', trigger: 'change' }
        ],
        module: [
          { required: true, message: '表单模块为必填项，建议使用英文', trigger: 'change' }
        ],
        domain: [
          { required: true, message: '接口域名为必填，建议：https://xxx.com', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.webformrules = this.$refs.designer.getRule()
          this.form.webformoption = this.$refs.designer.getOption()
          this.alertInfo = {isShow: false, type: 'error', txt: ''}
          this.loading = true
          axios({
            method: 'post',
            url: this.global.server + '/api/webformlib/saveWebform', // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
            data: this.form,
            headers: {'Content-Type': 'application/json'}
          })
            .then(response => {
              console.log(response.data.status)
              if (response.data.status) {
                this.loading = false
                this.alertInfo = {isShow: true, type: 'success', txt: response.data.message}
              } else {
                console.log(response.data)
                this.loading = false
                this.alertInfo = {isShow: true, type: 'error', txt: response.data.message}
              }
            })
            .catch((error) => {
              console.log(error)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    _webformkey: function () {
      return this.form.webformkey
    }
  },
  watch: {
    _webformkey: function () {
      axios.get(this.global.server + '/api/webformlib/getWebformRules', {
        params: {'webformKey': this._webformkey}
      }).then(json => {
        if (json.data.status) {
            this.alertInfo = {isShow: true, type: 'info', txt: json.data.message}
            this.form.webformname = json.data.data.webformName
            this.form.webformdesc = json.data.data.webformDesc
            this.form.domain = json.data.data.domain
            this.form.module = json.data.data.module
            this.$refs.designer.setOption(json.data.data.webformOption)
            this.$refs.designer.setRule(json.data.data.webformRules)

        } else {
          this.alertInfo = {isShow: true, type: 'error', txt: json.data.message}
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
