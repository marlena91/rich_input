app.component('selection-border', {
    template:
    /*html*/
        `<div id="borderForToolbar" class="toolbar-div" v-if="showTools">
            <toolbar-menu>  </toolbar-menu>
        </div>`,
    props: ['showTools', 'top', 'left'],
    mounted() {
        this.start();
    },
    data() {
        return {}
    },
    methods: {
        start() {
            document.getElementById("borderForToolbar").style.top = this.top - 40 + 'px';
            document.getElementById("borderForToolbar").style.left = this.left - 20 + 'px';
        }

    }
});