import $ from 'jquery'
import RtlGroup from './rtlGroup'


function attachToToolbar() {
	const toolbars = $('markdown-toolbar')

	console.log('[RTL-MARKDOWN] attaching to %s toolbar', toolbars.length)
	toolbars.each(function() {
		const toolbar = $(this)

		console.log('[RTL-MARKDOWN] toolbar', toolbar)

		const parent = toolbar.parent().parent()
		const content = parent.find('.write-content')
		const textArea = content.find('textarea')

		const rtlGroup = new RtlGroup(textArea)
		toolbar.append(rtlGroup.getGroup())
	})

}

$(document).ready(() => {
	attachToToolbar()

	// after ajax call
	$('#js-repo-pjax-container').on('pjax:end', attachToToolbar)
})

