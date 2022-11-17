<template>
  <div id="app">
    <el-backtop><el-button icon='el-icon-caret-top' round=true size="medium" type="info">UP</el-button></el-backtop>
    <div class="com-head">
      <nav-menu></nav-menu>
    </div>
    <div class="com-body">
      <router-view></router-view>
    </div>
    <div class="com-footer">
      <div class="com-footer-content">
        <span>&简化测试，效率至上&</span>
      </div>
    </div>
  </div>
</template>

<script>
// element--页面结构组件
import ElContainer from 'element-ui/packages/container/src/main'
import ElHeader from 'element-ui/packages/header/src/main'
import ElMain from 'element-ui/packages/main/src/main'
import ElFooter from 'element-ui/packages/footer/src/main'
// element--页面元素组件
import ElForm from 'element-ui/packages/form/src/form'
import ElInput from 'element-ui/packages/input/src/input'
import ElFormItem from 'element-ui/packages/form/src/form-item'
import ElButton from 'element-ui/packages/button/src/button'
import ElRow from 'element-ui/packages/row/src/row'
import ElCol from 'element-ui/packages/col/src/col'
import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
import ElRadio from 'element-ui/packages/radio/src/radio'
import ElCheckboxGroup from 'element-ui/packages/checkbox/src/checkbox-group'
import ElCheckbox from 'element-ui/packages/checkbox/src/checkbox'
import ElCard from 'element-ui/packages/card/src/main'
import ElDialog from 'element-ui/packages/dialog/src/component'
// cstest--导航栏组件
import NavMenu from './components/NavMenu'

export default {
  components: {
    ElContainer,
    ElMain,
    ElHeader,
    ElFooter,
    ElCol,
    ElRow,
    ElButton,
    ElFormItem,
    ElInput,
    ElForm,
    ElCheckbox,
    ElCheckboxGroup,
    ElRadio,
    ElRadioGroup,
    ElCard,
    ElDialog,
    NavMenu
  },
  mounted () {
    // this.open()
  }
}
</script>
<!--<link rel="stylesheet" href="dist/styles/iview.css">-->
