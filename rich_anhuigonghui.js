/*
[task_local]
# 安徽工会签到
10 9 * * * https://raw.githubusercontent.com/Jesn/Rich.Bento/dev/rich_anhuigonghui.js, tag=安徽工会签到, enabled=true
*/


const $ = new Env("安徽工会签到");
const notify = $.isNode() ? require("./sendNotify") : "";
let message = ''


!(async () => {
    try {
        qiandao();
        if ($.isNode()) {
            if (message != '') {
                await notify.sendNotify(`${$.name}`, message)
            }
        }


    } catch (e) {
        $.logErr(e)
        await notify.sendNotify(`${$.name}`, "执行失败:" + e)
    }
})()
    .catch((e) => {
        $.log("", `❌ ${$.name}, 失败! 原因: ${e}!`, "")
    })
    .finally(() => {
        // $.done();
    })



function options() {
    return {
        "url": "http://nwx.ahghw.org/act/api/qiandao?openId=otGxowGXb-pjuFi9XTfqKpNN8vLs",
        "method": "post",
        "headers": {
            "Host": "nwx.ahghw.org",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Origin": "http://nwx.ahghw.org",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63060012)",
            "Referer": "http://nwx.ahghw.org/act/api?code=061nEF100e45SN1I8i000OboUT3nEF1r&state=ctweixin",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
        }
    }
}
function qiandao() {
    return new Promise(resolve => {
        $.post(options(), (err, resp, data) => {
            try {
                if (err) {
                    message = JSON.stringify(err)
                } else {
                    data = JSON.parse(data)
                    message = data.msg
                }
            } catch (e) {
                $.logErr(e)
            }
            finally {
                resolve();
            }
        })
    })
}