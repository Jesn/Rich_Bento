/*
[task_local]
# 中国石油个人账户
cron "*\/5 * * * *" rich_cnpc.js, tag:中国石油账户查询

curl  -H "Origin: http://wx.95504.net"  -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63060012)" -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -H "Cookie: acw_tc=b461fb1b16500022748372018e43eb847c500f7ce2d7d149f960230319; ASP.NET_SessionId=hnq0oet2th4xaunxrvf4mw5e; RedisSessionCookiesId=03183d22-de8e-435a-b329-99654244469e"  --data-binary "methodflag=GCardInfo&cardasn=9020220000873495" --compressed "http://wx.95504.net/Micro/MicroHandler.ashx"
*/

const $ = new Env('中国石油个人账户');
const notify = $.isNode() ? require('./sendNotify') : '';

let cookies=[]




if ($.isNode()){
    if(process.env.cnpc_cookies.length>0){
        cookies=process.env.cnpc_cookies.split(',')
    }
}
