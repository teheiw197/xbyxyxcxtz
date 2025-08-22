
## 云函数说明

此云函数用于生成小程序的 URL Scheme，支持外部跳转到小程序指定页面。

### 调用方式

```javascript
// 在小程序中调用
wx.cloud.callFunction({
  name: 'get-url-scheme',
  data: {
    action: 'getUrlScheme',
    appId: '你的小程序AppID',
    path: 'pages/map/map.html'  // 可选，默认跳转到地图页
  }
}).then(res => {
  if (res.result.code === 0) {
    console.log('生成的URL Scheme:', res.result.data.openlink);
  } else {
    console.error('生成失败:', res.result.message);
  }
});

// 在H5页面中调用
const result = await fetch('/api/get-url-scheme', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'getUrlScheme',
    appId: '你的小程序AppID',
    path: 'pages/index/index'
  })
});
```

### 返回格式

成功时：
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "openlink": "weixin://dl/business/?t=xxx",
    "expireTime": 1234567890,
    "ghId": "gh_xxx"
  }
}
```

失败时：
```json
{
  "code": 400,
  "message": "错误信息",
  "data": null
}
```
  