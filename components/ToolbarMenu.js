app.component('toolbar-menu', {
    template:
    /*html*/
        `<div>
            <ul>
             <li v-show="show" v-for="tool in tools" class="toolbar-item" >
                 <a href="#" class="button" @click='setOption(tool.option)'> 
                    <i :class="tool.icon"></i>
                 </a>
             </li>
             <li v-show="!show" class="tool-link"><input  name="tool-link" v-model="link" placeholder="https://www.typeform.com" @keyup.enter="applyLink"></li>
            </ul>
        </div>`,
    data() {
        return {
            tools: [
                {icon: 'icon-bold', option: 'bold'},
                {icon: 'icon-italic', option: 'italic'},
                {icon: 'icon-link', option: 'createLink'}
            ],
            link: '',
            show: true,
            start: null,
            end: null,
            startOffset: 0,
            endOffset: 0,
        }
    },
    mounted() {
        if((range.startContainer.parentNode.tagName === 'A') || (range.endContainer.parentNode.tagName === 'A')) {
            link = document.getElementsByClassName("button")[2];
            link.classList.add("sel-btn");
        }
    },
    methods: {
        apply(command, value) {
            document.execCommand(command, false, value)
        },
        setOption(option) {

            if (option === 'createLink') {
                if((range.startContainer.parentNode.tagName === 'A') || (range.endContainer.parentNode.tagName === 'A')) {
                    document.getElementsByClassName("button")[2].classList.remove("sel-btn");
                    this.apply('unlink');
                } else {
                    this.getSelection();
                    this.show = false;
                }
            } else this.apply(option)
        },
        getSelection() {
            selection = document.getSelection();
            range = selection.getRangeAt(0);
            this.start = range.startContainer;
            this.end = range.endContainer;
            this.startOffset = range.startOffset;
            this.endOffset = range.endOffset;
        },
        applyLink() {
            this.doSelection();
            this.checkLink();
        },
        doSelection() {
            range = document.createRange();
            range.setStart(this.start, this.startOffset);
            range.setEnd(this.end, this.endOffset);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        },
        checkLink() {
            if ((this.link.substring(0, 7) === 'http://') || (this.link.substring(0, 8) === 'https://')) {
                this.apply('createLink', this.link)
            } else {
                this.link = 'http://' + this.link;
                this.apply('createLink', this.link);
            }

            div = document.getElementById('editor')
            allA = div.querySelectorAll('a');
            allA.forEach(a => {
                if (a.title === '') a.setAttribute('title', this.link)
            });
        }
    }
})