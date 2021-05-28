export default {
    template:`
<div>
    <radno-mesto-form v-bind:naslov="'Dodaj radno mesto'"  v-on:sacuvaj="createRadnoMesto" v-bind:dugme="'Dodaj'"></radno-mesto-form>

    <tabela-radnog-mesta v-bind:naslov="'Tabela radnog mesta'" v-bind:radna-mesta="radnaMesta" v-on:uklanjanje="removeRadnoMesto" v-on:izmena="setMestoZaIzmenu"></tabela-radnog-mesta>
</div>
    `,
    data(){
        return {
            radnaMesta:[],
            mestoZaIzmenu:{},

        }
    },
    methods:{
        setMestoZaIzmenu(mesto){ //skladistenje nakon izmene//
            this.$router.push(`/radnaMesta/${mesto.id}`);
        },
       
        refreshRadnoMesto(){
           axios.get("api/radnaMesta").then((response) => {
               this.radnaMesta = response.data;
           });
       },
        //dodavanje//
        createRadnoMesto(mesto){
            axios.post("api/radnaMesta", mesto).then((response) => {
                this.refreshRadnoMesto();
            });
        },
        
        //izmena//
        updateRadnoMesto(mesto){
            axios.put(`api/radnaMesta/${mesto.id}`, mesto).then((response) => {
                this.refreshRadnoMesto();
            });
        },

        //brisanje//
        removeRadnoMesto(id){
            axios.delete(`api/radnaMesta/${id}`).then((response) => {
                this.refreshRadnoMesto();
            });
        },
        
    },
    created(){
        this.refreshRadnoMesto();

    }
}