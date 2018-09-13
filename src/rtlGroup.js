import $ from 'jquery'
import marked from 'marked'

const _undoButton = `<md-rtl tabindex="-1" class="toolbar-item tooltipped tooltipped-n" style="padding: 0 5px;"
aria-label="Undo" role="button"><svg version="1.1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 width="16px" height="16px" viewBox="0 -70 436.48 436.48">
	<g>
		<path d="M224,143.573c-56.427,0-107.84,21.013-147.2,55.467L0,122.24v192h192l-77.12-77.12    c29.547-24.853,67.413-40.213,109.12-40.213c75.627,0,139.627,49.173,162.027,117.333l50.453-16.64    C407.147,208.213,323.2,143.573,224,143.573z" fill="#586069"/>
	</g>
</svg></md-rtl>`

const _toHtmlButton = `<md-rtl tabindex="-1" class="toolbar-item tooltipped tooltipped-n" style="padding: 0 5px;"
aria-label="To RTL Html" role="button"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
width="14pt" height="16pt" viewBox="0 -2 14 16" version="1.1">
	<g id="surface1">
		<path style=" stroke:none;fill-rule:evenodd;fill:#586069;fill-opacity:1;" 
			d="M 4.707031 11.21875 C 4.707031 11.21875 4.707031 10.464844 4.707031 9.890625 C 4.707031 9.785156 4.648438 9.691406
				4.5625 9.648438 C 4.480469 9.609375 4.378906 9.632812 4.316406 9.707031 C 3.804688 10.289062 2.9375 11.28125 
				2.582031 11.6875 C 2.539062 11.738281 2.515625 11.804688 2.515625 11.875 C 2.515625 11.941406 2.539062 12.007812
				2.582031 12.058594 C 2.9375 12.46875 3.804688 13.457031 4.316406 14.039062 C 4.378906 14.113281 4.480469 14.136719 
				4.5625 14.097656 C 4.648438 14.054688 4.707031 13.960938 4.707031 13.855469 C 4.707031 13.28125 4.707031 12.527344 
				4.707031 12.527344 C 4.707031 12.527344 9.34375 12.527344 10.992188 12.527344 C 11.140625 12.527344 11.289062 12.457031 
				11.394531 12.335938 C 11.503906 12.210938 11.5625 12.046875 11.5625 11.875 C 11.5625 11.699219 11.503906 11.535156 11.394531
				11.410156 C 11.289062 11.289062 11.140625 11.21875 10.992188 11.21875 C 9.34375 11.21875 4.707031 11.21875 4.707031 11.21875
				Z M 9.847656 1.425781 C 10.164062 1.425781 10.417969 1.71875 10.417969 2.078125 C 10.417969 2.4375 10.164062 2.730469 9.847656
				2.730469 C 9.5625 2.730469 9.277344 2.730469 9.277344 2.730469 C 9.277344 2.730469 9.277344 7.492188 9.277344 9.261719 C 9.277344
				9.433594 9.214844 9.601562 9.109375 9.722656 C 9.003906 9.84375 8.855469 9.914062 8.707031 9.914062 C 8.554688 9.914062 8.410156 
				9.84375 8.300781 9.722656 C 8.195312 9.601562 8.132812 9.433594 8.132812 9.261719 C 8.132812 7.492188 8.132812 2.730469 8.132812
				2.730469 L 6.992188 2.730469 C 6.992188 2.730469 6.992188 7.492188 6.992188 9.261719 C 6.992188 9.433594 6.929688 9.601562 6.824219
				9.722656 C 6.714844 9.84375 6.570312 9.914062 6.417969 9.914062 C 6.269531 9.914062 6.121094 9.84375 6.015625 9.722656 C 5.910156
				9.601562 5.847656 9.433594 5.847656 9.261719 C 5.847656 8.308594 5.847656 6.648438 5.847656 6.648438 C 4.585938 6.648438 3.5625 
				5.480469 3.5625 4.035156 C 3.5625 2.59375 4.585938 1.425781 5.847656 1.425781 C 5.847656 1.425781 8.621094 1.425781 9.847656
				1.425781 Z M 9.847656 1.425781 "/>
	</g>
</svg>
</md-rtl>`

const _group = '<div class="toolbar-group" style="margin-left: 5px;"></div>'



String.prototype.replaceWithText = function(start, end, text) {
	return this.substring(0, start) + text + this.substring(end, this.length)
}


export default class RtlGroup {
	constructor(bindTo, storeLimit = 10) {
		this.bindTo = bindTo
		this.prev = []
		this.storeLimit = storeLimit

		this.toHtml = $(_toHtmlButton)
		this.undo = $(_undoButton)
		this.group = $(_group)


		this.group.append(this.undo)
		this.group.append(this.toHtml)

		const toHtmlClick = () => {
			const text = this.bindTo.val()
			const start = this.bindTo[0].selectionStart
			const end = this.bindTo[0].selectionEnd

			this.cache(text)

			const selected = text.substring(start, end)

			if(selected) {
				const rtlHtml = marked(selected)
				this.bindTo.val(text.replaceWithText(start, end, rtlHtml))
			} else if (text) {
				const rtlHtml = marked(this.bindTo.val())
				this.bindTo.val(rtlHtml)
			}

			this.toHtml.blur()
		}
		const undoClick = () => {
			this.bindTo.val(this.prev.pop())
			this.undo.blur()
		}

		this.toHtml.click(toHtmlClick)
		this.undo.click(undoClick)

		console.log('[RTL-Group] binded to', bindTo)
	}

	getGroup() {
		return this.group
	}

	cache(value) {
		this.prev.push(value)
		if (this.prev.length > this.storeLimit) {
			this.prev.splice(0,1)
		}
	}
}