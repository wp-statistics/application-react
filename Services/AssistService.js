import React from 'react'
import _ from 'lodash'

export const AssistService = {
	checkEmal(email) {
		return new Promise(
			(resolve, reject) => {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (re.test(email)) {
					resolve(true)
				} else {
					reject({status: 701, msg: 'bad email'})
				}
			})
	},
	renderIf(condition, content) {
		if (condition) {
			return content;
		} else {
			return null;
		}
	},
	getJalaliMonthesNamesArray() {
		var m = [];
		m.push('فروردین');
		m.push('اردیبهشت');
		m.push('خرداد');
		m.push('تیر');
		m.push('مرداد');
		m.push('شهرویور');
		m.push('مهر');
		m.push('آبان');
		m.push('آذر');
		m.push('دی');
		m.push('بهمن');
		m.push('اسفند');
		return m
	},
	getJalaliMonthIndex(month) {
		var monthes = this.getJalaliMonthesNamesArray()
		var index = _.indexOf(monthes, month)
		return index + 1
	},
	strip_tags(input, allowed) {
		allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
		var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
		var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
		return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
			return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
		})
	},
	str_replace(search, replace, subject, countObj) {
		var i = 0
		var j = 0
		var temp = ''
		var repl = ''
		var sl = 0
		var fl = 0
		var f = [].concat(search)
		var r = [].concat(replace)
		var s = subject
		var ra = Object.prototype.toString.call(r) === '[object Array]'
		var sa = Object.prototype.toString.call(s) === '[object Array]'
		s = [].concat(s)
		var $global = (typeof window !== 'undefined' ? window : global)
		$global.$locutus = $global.$locutus || {}
		var $locutus = $global.$locutus
		$locutus.php = $locutus.php || {}
		if (typeof (search) === 'object' && typeof (replace) === 'string') {
			temp = replace
			replace = []
			for (i = 0; i < search.length; i += 1) {
				replace[i] = temp
			}
			temp = ''
			r = [].concat(replace)
			ra = Object.prototype.toString.call(r) === '[object Array]'
		}
		if (typeof countObj !== 'undefined') {
			countObj.value = 0
		}
		for (i = 0, sl = s.length; i < sl; i++) {
			if (s[i] === '') {
				continue
			}
			for (j = 0, fl = f.length; j < fl; j++) {
				temp = s[i] + ''
				repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
				s[i] = (temp).split(f[j]).join(repl)
				if (typeof countObj !== 'undefined') {
					countObj.value += ((temp.split(f[j])).length - 1)
				}
			}
		}
		return sa ? s : s[0]
	},
	getTimestamp() {
		return Math.floor(_.now() / 1000)
	},
	secondsToTimeObj(seconds) {
		let days = Math.floor(seconds / (24 * 3600));
		seconds %= (24 * 3600);
		let hours = Math.floor(seconds / 3600);
		seconds %= 3600;
		let minutes = Math.floor(seconds / 60);
		seconds = seconds % 60;
		return {
			days: days,
			hours: this.pad(hours, 2),
			minutes: this.pad(minutes, 2),
			seconds: this.pad(seconds, 2)
		}
	},
	pad(num, size) {
		var s = num + "";
		while (s.length < size) s = "0" + s;
		return s;
	},
}