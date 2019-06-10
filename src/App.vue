<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{percent}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Res from './plugin/index'
export default {
  name: 'app',
  data() {
    return {
      percent: 0,
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    // [
    //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559738559098&di=c8c212941da82e85fdc49f06272da023&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F32fa828ba61ea8d3fcd2e9ce9e0a304e241f5803.jpg',
    //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559738559098&di=fcfa50a3fed4b01438ac9d93ee644039&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F4610b912c8fcc3cef70d70409845d688d53f20f7.jpg',
    //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559738611985&di=0ae86438a02251608815440051ad2eba&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb21c8701a18b87d6f383aaef0a0828381e30fd79.jpg',
    //     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559738611984&di=0280848fb5f98ea501179ce68b3f4d37&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff7246b600c338744acb2ecf35c0fd9f9d62aa0ce.jpg'
    //   ]
    const _this = this;
    const time = new Date();
    Res.load({
      srcList: [
        require('./assets/timg (1).jpg'),
        require('./assets/timg (2).jpg'),
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559738611984&di=0280848fb5f98ea501179ce68b3f4d37&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ff7246b600c338744acb2ecf35c0fd9f9d62aa0ce.jp',
        require('./assets/timg (4).jpg')
      ],
      percentCb(percent) {
        _this.percent = percent;
      },
      completeCb() {
        console.log(new Date() - time);
      },
      failCb(e, src, idx) {
        console.log(e, src, idx);
      },
      time: 1500,
    });
  },
  methods: {
  }
}
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
