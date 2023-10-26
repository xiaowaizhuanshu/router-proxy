<template>
    <div>
        12111113
        {{ result }}
    </div>
</template>

<script>
import { getAdressInfo } from '@/apis/index'
export default {
  name: 'index',
  data() {
      return {
        result:null
      }
    },
    created() {
      this.handInt()
    },
    methods: {
      handInt(){
        getAdressInfo(
      {channelId:'1712724737253191682'}).then((res) => {
          this.result = res.data
        })
      }
    }
}
</script>