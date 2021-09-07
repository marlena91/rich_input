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
             <li v-show="!show" class="tool-link"><input name="tool-link" v-model="link" ></li>
            </ul>
        </div>`,
    data() {
        return {
            tools: [
                {icon: 'icon-bold', option: 'bold'},
                {icon: 'icon-italic', option: 'italic'},
                {icon: 'icon-link', option: 'createLink'}
            ],
            link: 'www.pl',
            show: true,

        }
    },
    methods: {
        apply(command, value) {
            document.execCommand(command, false, value)
        },
        setOption(option) {
            if (option === 'createLink') {
                this.show = false;
                this.apply(option, this.link)
            } else this.apply(option)
        },

    }
})