/* eslint-disable */
import qiniu from 'qiniu'
var accessKey = 'aVAZnrOFNacZPmjePoG07OhqiPjx49l6wEAEA7N3'
var secretKey = 'J6pfPcxD4ln6ubuGtZn3fieNt3TXfvWOIvqQI2y8'
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
var config = new qiniu.conf.Config()
var bucketManager = new qiniu.rs.BucketManager(mac, config)
var publicBucketDomain = 'http://pg2grsejr.bkt.clouddn.com'
    // 公开空间访问链接
    // var publicDownloadUrl =
function getImg(key) {
    // debugger
    return bucketManager.publicDownloadUrl(publicBucketDomain, key)
}
export default {
    getImg
}