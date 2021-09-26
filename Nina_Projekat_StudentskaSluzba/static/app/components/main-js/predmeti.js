export default {
    template:`
<div class="w-75 p-3">
    <predmet-form v-bind:naslov="'Dodaj Predmet'" v-bind:profesori="profesori" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createPredmet"></predmet-form>

    <tabela-predmeta v-bind:naslov="'Tabela predmeta'" v-bind:predmeti="predmeti" v-on:uklanjanje="removePredmet" v-on:izmena="setPredmetZaIzmenu"></tabela-predmeta>
</div>
    `,
    data(){
        return {
            predmeti:[],
            profesori:[],
            predmetZaIzmenu:{},

        }
    },
    methods:{
        setPredmetZaIzmenu(predmet){ //skladistenje nakon izmene//
            this.$router.push(`/predmeti/${predmet.id}`);
        },
     

        refreshPredmet(){
            //saljem this van funkcije da obuhvata sve//
            axios.get("api/predmeti").then((response) => {
               this.predmeti = response.data;
            });

            axios.get("api/profesori").then((response) => {
                this.profesori = response.data;
            });
        },

        //dodavanje//
        createPredmet(predmet){
            axios.post("api/predmeti", predmet).then((response) => {
                this.refreshPredmet();
            });
        },

        //izmena//
        updatePredmet(predmet){
            axios.put(`api/predmeti/${predmet.id}`, predmet).then((response) => {
                this.refreshPredmet();
            });
        },

        //brisanje//
        removePredmet(id){
            axios.delete(`api/predmeti/${id}`).then((response) => {
                this.refreshPredmet();
            });
        },
    
    },
    created(){
        this.refreshPredmet();
    }
}