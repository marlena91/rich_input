app.component('toolbar-menu', {
    template:
    /*html*/
        `<div>
            <ul>
             <li v-if="show" v-for="tool in tools" class="toolbar-item" >
                 <a href="#" class="button" @click='setOption(tool.option)'> 
                    <i :class="tool.icon"></i>
                 </a>
             </li>
             <li   v-if="!show" class="tool-link">
                <input id="focus" name="tool-link" v-model="link" placeholder="https://www.typeform.com" @keyup.enter="applyLink">
             </li>
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
        start = range.startContainer.parentNode;
        end = range.endContainer.parentNode;
        do {
            if ((start.tagName === 'B') && (end.tagName === 'B')) {
                document.getElementsByClassName("button")[0].classList.add("sel-btn");
            }
            if ((start.tagName === 'I') && (end.tagName === 'I')) {
                document.getElementsByClassName("button")[1].classList.add("sel-btn");
            }
            if ((start.tagName === 'A') && (end.tagName === 'A')) {
                document.getElementsByClassName("button")[2].classList.add("sel-btn");
            }

            start = start.parentNode;
            end = end.parentNode;
        }
        while (start.tagName !== 'DIV' || end.tagName !== 'DIV')
    },
    methods: {
        apply(command, value) {
            document.execCommand(command, false, value)
        },
        setOption(option) {
            if (option === 'createLink') {
                if(document.getElementsByClassName("button")[2].className === "button sel-btn") {
                    document.getElementsByClassName("button")[2].classList.remove("sel-btn");

                    spanForTooltip = document.getElementById('editor').querySelectorAll('a');
                    spanForTooltip.forEach(a => {
                        if(a.children[0].innerHTML === getSelection().focusNode.nextElementSibling.innerHTML)
                            a.removeChild(a.lastChild)
                    })

                    this.apply('unlink');
                }

                else {
                    document.getElementsByClassName("button")[2].classList.add("sel-btn");
                    this.getSelection();
                    this.show = false;

                }
            } else if (option === 'bold') {
                if(document.getElementsByClassName("button")[0].className === "button sel-btn")
                    document.getElementsByClassName("button")[0].classList.remove("sel-btn");
                else document.getElementsByClassName("button")[0].classList.add("sel-btn");

                this.apply(option)
            } else if (option === 'italic') {
                if(document.getElementsByClassName("button")[1].className === "button sel-btn")
                    document.getElementsByClassName("button")[1].classList.remove("sel-btn");
                else document.getElementsByClassName("button")[1].classList.add("sel-btn");

                this.apply(option)
            }
        },
        getSelection() {
            selection = document.getSelection();
            range = selection.getRangeAt(0);
            this.start = range.startContainer;
            this.end = range.endContainer;
            this.startOffset = range.startOffset;
            this.endOffset = range.endOffset;
            window.setTimeout(function ()  {
                document.getElementById('focus').focus();
            }, 100);
        },
        applyLink() {
            this.doSelection();
            this.checkLink();
            this.show = true;

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
                if (a.title === '') {
                    a.setAttribute('title', this.link);
                    a.classList.add('tooltip');
                    a.innerHTML = a.text + "<span class='tooltiptext'>" + a.title + "</span>"
                }
            });
        }
    }
})