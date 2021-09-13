app.component('rich-input', {
    template:
    /*html*/
        `
    <pre>{{$data}}</pre>    
    <div id="editorContainer" class='text-editor'>
               
        <selection-border v-if="showTools" 
        :show-tools="showTools" 
        :top="top" :left="left"
        >
        </selection-border>
        
        
        
        <div contenteditable="true" 
             id="editor" 
             class='editor-field' 
             @input="onInput" 
             @mousedown="showTools=false"
             @mouseup="checkSelection()">
        </div>
    </div>
    `,
    data() {
        return {
            showTools: false,
            top: 0,
            left: 0,
            value: '',
        }
    },
    methods: {
        checkSelection() {
            selection = document.getSelection();
            if (selection.toString() !== '') {
                range = selection.getRangeAt(0);
                this.showTools = true;
                rect = range.getBoundingClientRect();
                this.top = rect.top;
                this.left = rect.left;
            } else {
                this.showTools = false;
            }
        },
        onInput(e) {
            let text = e.target.innerHTML
            text = text.replaceAll('&nbsp;', ' ');
            text = text.replaceAll('<b>', '*');
            text = text.replaceAll('</b>', '*');
            text = text.replaceAll('<div>', '');
            text = text.replaceAll('</div>', '');
            text = text.replaceAll('<br>', '\n');
            text = text.replaceAll('<i>', '_');
            text = text.replaceAll('</i>', '_');
            text = text.replaceAll('<a href="', '(')
            text = text.replaceAll('">', ')[')
            text = text.replaceAll('</a>', ']')
            this.value = text
        },
    }
})
