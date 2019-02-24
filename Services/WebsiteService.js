import { StorageService } from './StorageService'
import _ from 'lodash'
import axios from 'axios'
import { StatsService } from './StatsService'

export const WebsiteService = {

  isURL (str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
    return pattern.test(str)
  },
  async validateCode (url, code) {
    let api = StatsService.prepareUrl(url) + 'wp-json/wpstatistics/v1/validate?token_auth=' + code
    let result
    try {
      result = await axios.get(api)
      return true
    }
    catch (err) {
      return false
    }
  },
  async isRegistered (url) {
    let websites = await StorageService.get('websites')
    url = StatsService.prepareUrl(url)
    if (_.findIndex(websites, {url: url}) > -1) {
      return true
    }
    return false
  },
  async add (url, code) {
    if (!this.isURL(url)) {
      return {status: false, code: -3, msg: 'Invalid URL'}
    }
    if (await this.isRegistered(url)) {
      return {status: false, code: -1, msg: 'URL is Already Registered'}
    }
    let isValid = await this.validateCode(url, code)
    if (isValid) {
      let websites = await StorageService.get('websites')
      websites = websites === false ? [] : websites
      websites.push({
        url: url,
        code: code
      })
      StorageService.set('websites', websites)
      return {status: true, code: 1}
    }
    return {status: false, code: -2, msg: 'Invalid URL or Auth Code'}
  },
  async remove (site) {
    let websites = await StorageService.get('websites')
    let newWebsites = _.reject(websites, site)
    StorageService.set('websites', newWebsites)
    return newWebsites

  }
}