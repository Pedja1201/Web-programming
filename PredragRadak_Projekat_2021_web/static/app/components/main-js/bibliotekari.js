export default {
    template:`
<div class="w-50 p-3">
    <bibliotekar-form v-on:sacuvaj="createBibliotekar" v-bind:naslov="'Dodaj bibliotekara'" v-bind:dugme="'Dodaj'"></bibliotekar-form>
</div>
<button v-on:click="navigate('bibliotekari')" type="button" class="btn btn-primary btn-lg btn-block">Prijavljeni bibliotekari</button>

<div class="w-75 p-3" v-if="stranicaZaPrikaz=='bibliotekari'">
    <tabela-bibliotekara v-bind:naslov="'Prijavljeni bibliotekari'" v-bind:bibliotekari="bibliotekari" v-on:uklanjanje="removeBibliotekar" v-on:izmena="setBibliotekarZaIzmenu"></tabela-bibliotekara>
</div>
    `,
    data(){
        return {
            bibliotekari:[],

            bibliotekarZaIzmenu:{},
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setBibliotekarZaIzmenu(bibliotekar){ //skladistenje nakon izmene//
            this.$router.push(`/bibliotekari/${bibliotekar.id}`);
        },

        refreshBibliotekar(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/bibliotekari").then((response) => {
                this.bibliotekari = response.data;
            });
        },

        //dodavanje//
        createBibliotekar(bibliotekar){
            axios.post("api/bibliotekari", bibliotekar).then((response) => {
                this.refreshBibliotekar();
            });
        },

        //izmena//
        updateBibliotekar(bibliotekar){
            axios.put(`api/bibliotekari/${bibliotekar.id}`, bibliotekar).then((response) => {
                this.refreshBibliotekar();
            });
        },

        //brisanje//
        removeBibliotekar(id){
            axios.delete(`api/bibliotekari/${id}`).then((response) => {
                this.refreshBibliotekar();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }

    },
    created(){
        this.refreshBibliotekar();
    }
}