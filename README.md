# Rich.Bento
薅羊毛


## jd 获取用户名
```
$.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
```


## 发送通知
```
const notify = $.isNode() ? require('./sendNotify') : '';
await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
```

## 获取环境变量
```
process.env.JD_DEBUG
```