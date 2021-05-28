export default {
    template:`
<div>
    <kupovina-forma v-bind:naslov="'Dodaj kupovinu'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createKupovina" v-bind:kupci="kupci" v-bind:proizvodi="proizvodi"></kupovina-forma>

    <tabela-kupovine v-bind:naslov="'Tabela kupovine'" v-bind:kupovine="kupovine" v-on:uklanjanje="removeKupovina" v-on:izmena="setKupovinaZaIzmenu" v-on:pretraga="searchKupovina"></tabela-kupovine>
</div>
    `,
    data(){
        return {
            kupovine:[],
            kupci:[],///za select
            proizvodi:[],///za select
        
            kupovinaZaIzmenu:{},

        }
    },
    methods:{
        setKupovinaZaIzmenu(kupovina){ //skladistenje nakon izmene//
            this.$router.push(`/kupovine/${kupovina.broj}`);
        },

        refreshKupovina(){
            axios.get("api/kupovine").then((response) => {
                this.kupovine = response.data;
            });
            ///Select opcija
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
            axios.get("api/proizvodi").then((response) => {
                this.proizvodi = response.data;
             });
        },
        
        //dodavanje//
        createKupovina(kupovina){
            axios.post("api/kupovine", kupovina).then((response) => {
                this.refreshKupovina();
            });
        },
        

        //izmena//
        updateKupovina(kupovina){
            axios.put(`api/kupovine/${kupovina.broj}`, kupovina).then((response) => {
                this.refreshKupovina();
            });
        },
        

        //brisanje//
        removeKupovina(broj){
            axios.delete(`api/kupovine/${broj}`).then((response) => {
                this.refreshKupovina();
            });
        },

    },
    created(){
        this.refreshKupovina();
    }
}