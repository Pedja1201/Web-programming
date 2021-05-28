export default {
    template:`
<div>
    <kupac-form v-on:sacuvaj="createKupac" v-bind:naslov="'Dodaj kupca'" v-bind:dugme="'Dodaj'"></kupac-form>

    <tabela-kupca v-bind:naslov="'Tabela kupca'" v-bind:kupci="kupci" v-on:uklanjanje="removeKupac" v-on:izmena="setKupacZaIzmenu"></tabela-kupca>
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
            this.$router.push(`/kupci/${kupac.IDKupac}`);
        },

        refreshKupac(){
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
            axios.put(`api/kupci/${kupac.IDKupac}`, kupac).then((response) => {
                this.refreshKupac();
            });
        },

        //brisanje//
        removeKupac(IDKupac){
            axios.delete(`api/kupci/${IDKupac}`).then((response) => {
                this.refreshKupac();
            });
        },

    },
    created(){
        this.refreshKupac();
    }
}