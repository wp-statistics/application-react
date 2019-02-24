import React from 'react'
import axios from 'axios'

export const StatsService = {
  prepareUrl (url) {
    url = url.toLowerCase()
    if (url[url.length - 1] === '/') {
      return url
    } else {
      return url + '/'
    }
  },
  summary (url, code) {
    let api = this.prepareUrl(url) + 'wp-json/wpstatistics/v1/summary?token_auth=' + code
    let headers = {}
    return new Promise(
      (resolve, reject) => {
        return axios({
          method: 'get',
          url: api,
          headers: headers
        })
          .then(resp => {
            resolve(resp.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
  },
  search (url, code) {
    let api = this.prepareUrl(url) + 'wp-json/wpstatistics/v1/search_engine/summary?token_auth=' + code
    let headers = {}
    return new Promise(
      (resolve, reject) => {
        return axios({
          method: 'get',
          url: api,
          headers: headers
        })
          .then(resp => {
            resolve(resp.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
  },
  visitors (url, code, page) {
    let api = this.prepareUrl(url) + 'wp-json/wpstatistics/v1/visitors?token_auth=' + code + '&paged=' + page
    let headers = {}
    return new Promise(
      (resolve, reject) => {
        return axios({
          method: 'get',
          url: api,
          headers: headers
        })
          .then(resp => {
            resolve(resp.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
  },
  hits (url, code) {
    let api = this.prepareUrl(url) + 'wp-json/wpstatistics/v1/hits?token_auth=' + code
    let headers = {}
    return new Promise(
      (resolve, reject) => {
        return axios({
          method: 'get',
          url: api,
          headers: headers
        })
          .then(resp => {
            resolve(resp.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
  },
  referrers (url, code) {
    let api = this.prepareUrl(url) + 'wp-json/wpstatistics/v1/search_engine/referrers?token_auth=' + code
    let headers = {}
    return new Promise(
      (resolve, reject) => {
        return axios({
          method: 'get',
          url: api,
          headers: headers
        })
          .then(resp => {
            resolve(resp.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
  }
}