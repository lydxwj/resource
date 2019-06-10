# lydxwj-resource

资源加载插件。。。

#### 安装

```
npm install @lydxwj/resource --save
```

#### 使用

```
import Resource from '@lydxwj/resource';

Resource.load({
	srcList: [
		require('./assets/demo.jpg'),
		'https://timgsa.baidu.com/demo.png',
	],
	percentCb(percent) {
		console.log(percent);
	},
	completeCb(res) {
		console.log(res);
	},
	failCb(e, src, idx) {
		console.log(e, src, idx);
	},
	time: 2000,
});
```

#### 方法

- load

  - srcList资源数组

    静态资源需要使用require处理

    支持格式`.png .jpg .jpeg .gif`， `.css`，`.js`

  - percentCb百分比更新回调，参数percent：当前百分数0~100
  - completeCb完成回调，加载完或者加载失败或者加载时间结束等情况下执行，参数res:加载过的资源对象
  - failCb失败回调，参数e：失败对象，src：失败的资源地址，idx：当前失败是第几项
  - time自定义时间，毫秒，定义时间时不会等待资源加载完

**参数都是可选的**