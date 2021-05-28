export default {
    template:`
<div>
    <kupac-forma v-bind:naslov="'Dodaj kupca'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createKupac"></kupac-forma>

    <tabela-kupaca v-bind:naslov="'Tabela kupaca'" v-bind:kupci="kupci" v-on:uklanjanje="removeKupac" v-on:izmena="setKupacZaIzmenu"></tabela-kupaca>
</div>
    `,
    data(){
        return {
            kupci:[],
           
            kupacZaIzmenu:{},

        }
    },
    methods:{
        setKupacZaIzmenu(kupac){ //skladistenje nakon izmene//
            this.$router.push(`/${kupac.id}`);
        },

        refreshKupac(){
             //saljem this van funkcije da obuhvati sve//
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
        },
        
        //dodavanje//
        createKupac(kupac){
            axios.post("api/kupci", kupac).then((response) => {
                this.refreshKupac();
            });
        },
        

        //izmena//
        updateKupac(kupac){
            axios.put(`api/kupci/${kupac.id}`, kupac).then((response) => {
                this.refreshKupac();
            });
        },

        //brisanje//
        removeKupac(id){
            axios.delete(`api/kupci/${id}`).then((response) => {
                this.refreshKupac();
            });
        },
     
    },
    created(){
        this.refreshKupac();
    }
}