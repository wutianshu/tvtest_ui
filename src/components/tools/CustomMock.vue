<template>
  <div class="cs-model">
    <el-card class="box-card el-menu-demo"
             shadow="hover">
      <div slot="header">
        <span>自定义mock</span>
        <el-tooltip class="item" effect="dark" content="提交数据后" placement="top-start">
              <i class="el-icon-question"></i>
        </el-tooltip>
      </div>

      <el-form v-loading="loading"
               ref="form"
               :model="form"
               size="small"
               :label-width="this.global.labelWidth"
               :rules="rules">
        <el-form-item label="KEY" prop="key">
          <!--<el-input-->
            <!--placeholder="接口KEY（唯一标识），限制英文"-->
            <!--v-model="form.key">-->
          <!--</el-input>-->
          <el-select v-model="form.key" placeholder="接口KEY（唯一标识），限制英文" filterable allow-create>
            <el-option v-for="item in options" :key="item.key" :label="item.key" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="mock描述" prop="desc">
          <el-input
            placeholder="该key值对应的mock的描述"
            v-model="form.desc">
          </el-input>
        </el-form-item>
        <el-form-item label="响应头"  prop="head">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入mock接口返回的请求头（json格式）"
            v-model="form.head">
          </el-input>
        </el-form-item>
        <el-form-item label="响应内容"  prop="body">
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入mock接口返回的请求内容（json格式）"
            v-model="form.body">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('form')">提交</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>

      <el-alert title="提交失败！"
                type="error"
                v-show="errorflag"
                :description="errorinfo"
                @close="errorflag=false"
                show-icon>
      </el-alert>
      <el-card v-if="resultFlag">
        <el-row :gutter=20>
          <el-col :span="24">
            <el-input size="small"
                      :value="result"
                      :readonly="true">
              <template slot="prepend">mock接口</template>
            </el-input>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {},
  name: 'App',

  data () {
    return {
      form: this.formInit(),
      loading: false,
      errorflag: false,
      errorinfo: '',
      resultFlag: false,
      result: '',
      options: [],
      rules: {
        key: [{required: true, message: '必填', trigger: 'blur'}],
        head: [{required: true, message: '必填', trigger: 'blur'}],
        body: [{required: true, message: '必填', trigger: 'blur'}]
      }
    }
  },
  mounted: function () {
    axios.get(this.global.server + '/api/tools/queryMock').then(json => {
      console.log(json.data)
      if (json.data['status'] === 0) {
        this.options = json.data['data']
      }
    })
  },
  computed: {
    ukey: function () {
      return this.form.key
    }
  },
  watch: {
    ukey: function () {
      var flag = 0
      for (let i in this.options) {
        if (this.options[i].key === this.ukey) {
          flag = 1
          this.form.head = this.options[i].head
          this.form.body = this.options[i].body
          this.form.desc = this.options[i].desc
        }
      }
      if (flag === 0) {
        this.form.head = '{"Access-Control-Allow-Origin": "*","Access-Control-Allow-Credentials": "true"}'
        this.form.body = '{"data":"","message":"ok","status":0}'
        this.form.desc = ''
      }
    }
  },
  methods: {
    formInit () {
      var formInit = {
        key: '',
        desc: '',
        head: '{"Access-Control-Allow-Origin": "*","Access-Control-Allow-Credentials": "true"}',
        body: '{"data":"","message":"ok","status":0}'
      }
      return formInit
    },
    reset () {
      this.form = this.formInit()
      this.resultFlag = false
    },
    submit (formName) {
      let self = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          self.loading = true
          self.errorflag = false
          self.resultFlag = false
          // var params = this.commonJS.cleanObjNullProperty(self.form)
          // console.log(this.form)
          axios({
            url: this.global.server + '/api/tools/setMock',
            method: 'post',
            data: {'head': this.form.head, 'body': this.form.body, 'key': this.form.key, 'desc': this.form.desc, 'owner': this.$cookies.get('cstestusername')},
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
          })
            .then(response => {
              self.loading = false
              // 请求成功时
              console.log(response)
              if (response.data.status === 0) {
                this.resultFlag = true
                this.result = response.data.data
                this.$message({
                  showClose: true,
                  message: '提交成功！',
                  type: 'success'
                })
              } else {
                self.errorflag = true
                self.errorinfo = response.data.message
              }
            })
            .catch((error) => {
              console.log(error)
              self.loading = false
              return false
            })
        }
      })
    }
  }
}
</script>
