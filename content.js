chrome.runtime.sendMessage({todo: 'showPageAction'})


function toHtml(text) {
    console.log('received text:', text)
    return 'transformed'
}

$(function() {
    console.log('amir loaded')
    $('markdown-toolbar').each(function () {
        var toolbar = $(this)

        var parent = toolbar.parent().parent()
        var writeElement = parent.find('.write-content')
        var textArea = writeElement.find('textarea')

        var icon = `<svg class="octicon octicon-bold" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1 2h3.83c2.48 0 4.3.75 4.3 2.95 0 1.14-.63 2.23-1.67 2.61v.06c1.33.3 2.3 1.23 2.3 2.86 0 2.39-1.97 3.52-4.61 3.52H1V2zm3.66 4.95c1.67 0 2.38-.66 2.38-1.69 0-1.17-.78-1.61-2.34-1.61H3.13v3.3h1.53zm.27 5.39c1.77 0 2.75-.64 2.75-1.98 0-1.27-.95-1.81-2.75-1.81h-1.8v3.8h1.8v-.01z"></path></svg>`
        var button = `<md-rtl tabindex="-1" class="toolbar-item tooltipped tooltipped-n"
aria-label="to RTL markdown" role="button">${icon}</md-rtl>`
        var group = `<div class="toolbar-group"></div>`

        button = $(button)
        group = $(group)
        group.append(button)
        toolbar.append(group)

        button.click(function() {
            var html = toHtml(textArea.val())
            if (html) {
                textArea.text(html)
            }
            button.blur()
        })
    })

})

