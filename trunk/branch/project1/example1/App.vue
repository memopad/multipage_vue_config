<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data(){
    return {
    }
  },
  created() {
    if(this.$route.name===null){
      this.$router.push({
        path: './index',
      })
    }
  },
  activated() {
  },
  methods: {
    
  },
  mounted() {
  },
}
</script>