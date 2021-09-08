app.component('toolbar-menu', {
    template:
    /*html*/
        `<div>
                <ul>
                 <li v-show="show" v-for="tool in tools" class="toolbar-item">
                     <a href="#" class="button" @click='setOption(tool.option)'> 
                        <i :class="tool.icon"></i>
                     </a>
                 </li>
                 <li v-show="!show" class="tool-link"><input  name="tool-link" v-model="rawLink" @keyup.enter="applyLink"></li>
                </ul>
            </div>`,
    // props: ["anchor", "focus"],
    data() {
        return {
            tools: [
                {icon: 'icon-bold', option: 'bold'},
                {icon: 'icon-italic', option: 'italic'},
                {icon: 'icon-link', option: 'createLink'}
            ],
            rawLink: 'www.pl',
            show: true,
            start: null,
            end: null,
            startOffset: 0,
            endOffset: 0,
        }
    },
    methods: {
        apply(command, value) {
            document.execCommand(command, false, value)
        },
        setOption(option) {
            if (option === 'createLink') {
                selection = document.getSelection();
                range = selection.getRangeAt(0);
                this.start = range.startContainer;
                this.end = range.endContainer;
                this.startOffset = range.startOffset;
                this.endOffset = range.endOffset;
                this.show = false;
            } else this.apply(option)
        },
        applyLink() {

            range = document.createRange();
            range.setStart(this.start, this.startOffset);
            range.setEnd(this.end, this.endOffset);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);

            this.apply('createLink', this.rawLink)
        },
    }
})