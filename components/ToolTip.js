app.component('tool-tip', {
    template:
    /*html*/
        `<div id="borderForTooltip" class="toolbar-div" v-if="showTools">
            <toolbar-menu>  </toolbar-menu>
        </div>`,
    props: ['showTools', 'top', 'left'],
    mounted() {
        this.start();
    },
    data() {
        return {
            
        }

    },
    methods: {
        start() {
            document.getElementById("borderForTooltip").style.top = this.top - 40 + 'px';
            document.getElementById("borderForTooltip").style.left = this.left - 40 + 'px';
        }

    }
});