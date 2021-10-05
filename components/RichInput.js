app.component('rich-input', {
    template:
    /*html*/
        ` 
    <div class="container" >
               
         <div id="borderForTooltip" class="toolbar-div" v-show="showTools">
            <toolbar-menu v-if="toolbar"></toolbar-menu>
        </div>
        
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
            toolbar: false,
            showTools: false,
            value: '',
        }
    },
    methods: {
        checkSelection() {
            selection = document.getSelection();
            if(selection.toString() !== '') {
                range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                this.showTools = true;
                this.toolbar = true;
                this.drawToolTip(rect.top,rect.left, rect.right);
            } else {
                this.toolbar = false;
                this.showTools = false;
            }
        },
        drawToolTip(top,left,right){
            document.getElementById("borderForTooltip").style.top = top - 40 + 'px';
            document.getElementById("borderForTooltip").style.left = left + (right-left)/2 - 80 + 'px';
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
