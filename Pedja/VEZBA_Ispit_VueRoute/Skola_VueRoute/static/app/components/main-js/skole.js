export default {
    template:`
<div>
    <skola-form v-bind:naslov="'Dodaj skolu'" v-on:sacuvaj="createSkola" v-bind:dugme="'Dodaj'" v-bind:nastavnici="nastavnici" v-bind:predmeti="predmeti"></skola-form>
    
    <tabela-skole v-bind:naslov="'Tabela skole'" v-bind:skole="skole" v-on:uklanjanje="removeSkola" v-on:izmena="setSkolaZaIzmenu"></tabela-skole>
</div>
    `,
    data(){
        return {
            skole:[],
            nastavnici:[], ///select opcija
            predmeti:[], ///select opcija

            skolaZaIzmenu:{},
        }
    },
    methods:{
        setSkolaZaIzmenu(skola){ //skladistenje nakon izmene//
            this.$router.push(`/skole/${skola.id}`);   ///Rutiranje na stranicu izmene
        },


       refreshSkola(){
            axios.get("api/skole").then((response) => {
                this.skole = response.data;
            });
            //select opcija-novo
            axios.get("api/nastavnici").then((response) => {
                this.nastavnici = response.data;
            });
            axios.get("api/predmeti").then((response) => {
                this.predmeti = response.data;
            });
        },
        
        //dodavanje//
        createSkola(skola){
            axios.post("api/skole", skola).then((response) => {
                this.refreshSkola();
            });
        },

        //izmena//
        updateSkola(skola){
            axios.put(`api/skole/${skola.id}`, skola).then((response) => {
                this.refreshSkola();
            });
        },

        //brisanje//
        removeSkola(id){
            axios.delete(`api/skole/${id}`).then((response) => {
                this.refreshSkola();
            });
        },

    },
    created(){
        this.refreshSkola();
    }
}