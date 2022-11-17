<template>
  <div>
    <formshow></formshow>
    <formcreate></formcreate>
  </div>
</template>

<script>

import formcreate from '../components/webformlib/FormCreate'
import formshow from '../components/webformlib/FormShow'
// import axios from 'axios'

export default {
  components: {
    formcreate,
    formshow,
  }
}
</script>
