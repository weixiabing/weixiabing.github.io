---
title: 白嫖cloudflare搭建属于自己的git加速站
date: 2022-01-20 22:31:40
tags: [cf]
authors : niko

---

**不想自己动手的话，文末也有搭建好的，可以直接去白嫖！**

------

基于开源项目gh-proxy地址：-->[点击访问](https://github.com/hunshcn/gh-proxy.git)<--

cloudflare地址:-->[点击访问](https://dash.cloudflare.com/)<--

首先访问cloudflare注册一个你自己的账户

然后点击workers

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/1504f17bc1e7dfec6_1_post.png)

之后弹出来这个界面，你需要在输入框中输入你自己的workers的名字

**请注意！一定要方便记忆，不要乱输，这个会出现在你的网址中！！！**

**请注意！一定要方便记忆，不要乱输，这个会出现在你的网址中！！！**

**请注意！一定要方便记忆，不要乱输，这个会出现在你的网址中！！！**

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/1504fd81a68c1d92e_1_post.png)

输入好后点set up

然后选择订阅模式，白嫖怪直接free！

免费版本每天的访问次数是10w次，应该是远远够用的！

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/15046fd13cea89037_1_post.png)

然后要验证邮箱！

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/1504c9de6511f79d4_1_post.png)

去你邮箱完成验证

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/1504fac1a4f064e16_1_post.png)

验证完成后刷新，点击创建

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/150478a6d17e91fc1_1_post.png)

然后按下图填写，之后点创建

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/15042c59fbe8811a6_1_post.png)



然后点击快速编辑

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/1504601c1eeb22b4f_1_post.png)

将下面的代码复制 --->[点击查看源码](https://github.com/hunshcn/gh-proxy/blob/master/index.js)<--

```
'use strict'
/**
 * static files (404.html, sw.js, conf.js)
 */
const ASSET_URL = 'https://hunshcn.github.io/gh-proxy/'
// 前缀，如果自定义路由为example.com/gh/*，将PREFIX改为 '/gh/'，注意，少一个杠都会错！
const PREFIX = '/'
// git使用cnpmjs镜像、分支文件使用jsDelivr镜像的开关，0为关闭，默认开启
const Config = {
    jsdelivr: 1,
    cnpmjs: 1
}
/** @type {RequestInit} */
const PREFLIGHT_INIT = {
    status: 204,
    headers: new Headers({
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
        'access-control-max-age': '1728000',
    }),
}
const exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i
const exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i
const exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i
const exp4 = /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i
const exp5 = /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i
const exp6 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i
/**
 * @param {any} body
 * @param {number} status
 * @param {Object<string, string>} headers
 */
function makeRes(body, status = 200, headers = {}) {
    headers['access-control-allow-origin'] = '*'
    return new Response(body, {status, headers})
}
/**
 * @param {string} urlStr
 */
function newUrl(urlStr) {
    try {
        return new URL(urlStr)
    } catch (err) {
        return null
    }
}
addEventListener('fetch', e => {
    const ret = fetchHandler(e)
        .catch(err => makeRes('cfworker error:\n' + err.stack, 502))
    e.respondWith(ret)
})
function checkUrl(u) {
    for (let i of [exp1, exp2, exp3, exp4, exp5, exp6 ]) {
        if (u.search(i) === 0) {
            return true
        }
    }
    return false
}
/**
 * @param {FetchEvent} e
 */
async function fetchHandler(e) {
    const req = e.request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    let path = urlObj.searchParams.get('q')
    if (path) {
        return Response.redirect('https://' + urlObj.host + PREFIX + path, 301)
    }
    // cfworker 会把路径中的 `//` 合并成 `/`
    path = urlObj.href.substr(urlObj.origin.length + PREFIX.length).replace(/^https?:\/+/, 'https://')
    if (path.search(exp1) === 0 || path.search(exp5) === 0 || path.search(exp6) === 0 || !Config.cnpmjs && (path.search(exp3) === 0 || path.search(exp4) === 0)) {
        return httpHandler(req, path)
    } else if (path.search(exp2) === 0) {
        if (Config.jsdelivr) {
            const newUrl = path.replace('/blob/', '@').replace(/^(?:https?:\/\/)?github\.com/, 'https://cdn.jsdelivr.net/gh')
            return Response.redirect(newUrl, 302)
        } else {
            path = path.replace('/blob/', '/raw/')
            return httpHandler(req, path)
        }
    } else if (path.search(exp3) === 0) {
        const newUrl = path.replace(/^(?:https?:\/\/)?github\.com/, 'https://github.com.cnpmjs.org')
        return Response.redirect(newUrl, 302)
    } else if (path.search(exp4) === 0) {
        const newUrl = path.replace(/(?<=com\/.+?\/.+?)\/(.+?\/)/, '@$1').replace(/^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com/, 'https://cdn.jsdelivr.net/gh')
        return Response.redirect(newUrl, 302)
    } else {
        return fetch(ASSET_URL + path)
    }
}
/**
 * @param {Request} req
 * @param {string} pathname
 */
function httpHandler(req, pathname) {
    const reqHdrRaw = req.headers
    // preflight
    if (req.method === 'OPTIONS' &&
        reqHdrRaw.has('access-control-request-headers')
    ) {
        return new Response(null, PREFLIGHT_INIT)
    }
    const reqHdrNew = new Headers(reqHdrRaw)
    let urlStr = pathname
    if (urlStr.startsWith('github')) {
        urlStr = 'https://' + urlStr
    }
    const urlObj = newUrl(urlStr)
    /** @type {RequestInit} */
    const reqInit = {
        method: req.method,
        headers: reqHdrNew,
        redirect: 'manual',
        body: req.body
    }
    return proxy(urlObj, reqInit)
}
/**
 *
 * @param {URL} urlObj
 * @param {RequestInit} reqInit
 */
async function proxy(urlObj, reqInit) {
    const res = await fetch(urlObj.href, reqInit)
    const resHdrOld = res.headers
    const resHdrNew = new Headers(resHdrOld)
    const status = res.status
    if (resHdrNew.has('location')) {
        let _location = resHdrNew.get('location')
        if (checkUrl(_location))
            resHdrNew.set('location', PREFIX + _location)
        else {
            reqInit.redirect = 'follow'
            return proxy(newUrl(_location), reqInit)
        }
    }
    resHdrNew.set('access-control-expose-headers', '*')
    resHdrNew.set('access-control-allow-origin', '*')
    resHdrNew.delete('content-security-policy')
    resHdrNew.delete('content-security-policy-report-only')
    resHdrNew.delete('clear-site-data')
    return new Response(res.body, {
        status,
        headers: resHdrNew,
    })
}
```

替换掉原来所有代码，先点下面的保存，等待保存成功后，再点发送

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/15041d8fdeceac16b_1_post.png)

显示如下就成功了

![img](https://gh.136699.xyz/https://github.com/weixiabing/wordpress/blob/main/pic/2022/1/26/15046ce831dde2fe4_1_post.png)

到此教程结束，喜欢的点个赞再走吧！
