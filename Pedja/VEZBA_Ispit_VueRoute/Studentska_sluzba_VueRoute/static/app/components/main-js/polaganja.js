export default {
    template:`
<div>
    <polaganje-form v-bind:naslov="'Dodaj polaganje'" v-bind:dugme="'Dodaj'" v-bind:studenti="studenti" v-bind:predmeti="predmeti" v-on:sacuvaj="createPolaganje"></polaganje-form>

    <tabela-polaganja v-bind:naslov="'Tabela polaganja'" v-bind:polaganja="polaganja" v-on:uklanjanje="removePolaganje" v-on:izmena="setPolaganjeZaIzmenu"></tabela-polaganja>
</div>
    `,
    data(){
        return {
            polaganja:[],
            studenti:[],
            predmeti:[],
          
            polaganjeZaIzmenu:{},

        }
    },
    methods:{
        setPolaganjeZaIzmenu(polaganje){ //skladistenje nakon izmene//
            this.$router.push(`/polaganja/${polaganje.id}`);
        },

        refreshPolaganje(){
            axios.get("api/polaganja").then((response) => {
                this.polaganja = response.data;
            });
            ///Select opcija-novo!!!!
            axios.get("api/studenti").then((response) => {
                this.studenti = response.data;
            });
            axios.get("api/predmeti").then((response) => {
                this.predmeti = response.data;
            });
        },

        //dodavanje//
        createPolaganje(polaganje){
            axios.post("api/polaganja", polaganje).then((response) => {
                this.refreshPolaganje();
            });
        },

        //izmena//
        updatePolaganje(polaganje){
            axios.put(`api/polaganja/${polaganje.id}`, polaganje).then((response) => {
                this.refreshPolaganje();
            });
        },

        //brisanje//
        removePolaganje(id){
            axios.delete(`api/polaganja/${id}`).then((response) => {
                this.refreshPolaganje();
            });
        },

    },
    created(){
        this.refreshPolaganje();
    }
}