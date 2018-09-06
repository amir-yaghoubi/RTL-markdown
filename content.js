
// ----------- common components ------------
var icon = `<svg version="1.1" id="rtl_md_icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="16px" height="16px" viewBox="0 -80 511.624 511.623">
	<g>
		<path fill="#586069" d="M9.135,200.996h392.862v54.818c0,2.475,0.9,4.613,2.707,6.424c1.811,1.81,3.953,2.713,6.427,2.713
			c2.666,0,4.856-0.855,6.563-2.569l91.365-91.362c1.707-1.713,2.563-3.903,2.563-6.565c0-2.667-0.856-4.858-2.57-6.567
			l-91.07-91.078c-2.286-1.906-4.572-2.856-6.858-2.856c-2.662,0-4.853,0.856-6.563,2.568c-1.711,1.715-2.566,3.901-2.566,6.567
			v54.818H9.135c-2.474,0-4.615,0.903-6.423,2.712S0,134.568,0,137.042v54.818c0,2.474,0.903,4.615,2.712,6.423
			S6.661,200.996,9.135,200.996z"/>
		<path fill="#586069" d="M502.49,310.637H109.632v-54.82c0-2.474-0.905-4.615-2.712-6.423c-1.809-1.809-3.951-2.712-6.424-2.712
			c-2.667,0-4.854,0.856-6.567,2.568L2.568,340.607C0.859,342.325,0,344.509,0,347.179c0,2.471,0.855,4.568,2.568,6.275
			l91.077,91.365c2.285,1.902,4.569,2.851,6.854,2.851c2.473,0,4.615-0.903,6.423-2.707c1.807-1.813,2.712-3.949,2.712-6.427V383.72
			H502.49c2.478,0,4.613-0.899,6.427-2.71c1.807-1.811,2.707-3.949,2.707-6.427v-54.816c0-2.475-0.903-4.613-2.707-6.42
			C507.103,311.54,504.967,310.637,502.49,310.637z"/>
	</g>
</svg>
`
var button = `<md-rtl tabindex="-1" class="toolbar-item tooltipped tooltipped-n"
aria-label="to RTL markdown" role="button">${icon}</md-rtl>`

var group = `<div class="toolbar-group" style="margin-left: 5px;"></div>`

// -----------------------------------------------------


function attachToToolbar() {
    var toolbars = $('markdown-toolbar')

    toolbars.each(function () {
        var toolbar = $(this)

        var parent = toolbar.parent().parent()
        var writeElement = parent.find('.write-content')
        var textArea = writeElement.find('textarea')

        var tbButton = $(button)
        var tbGroup = $(group)
        tbGroup.append(tbButton)
        toolbar.append(tbGroup)

        tbButton.click(function() {
            var markdown = textArea.val()
            if (markdown) {
                var html = marked(textArea.val())
                textArea.val(html)
            }
            tbButton.blur()
        })
    })

}

$(document).ready(function() {
    attachToToolbar()

    // after ajax call
    $('#js-repo-pjax-container').on('pjax:end', attachToToolbar);
})

