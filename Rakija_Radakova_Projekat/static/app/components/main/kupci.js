export default {
    template:`
    <button v-on:click="navigate('kupci')" type="button" class="btn btn-primary btn-lg btn-block m-3">Prijavi se kao kupac</button>

<div class="w-75 p-3" v-if="stranicaZaPrikaz=='kupci'">
    <kupac-forma v-bind:korisnici="korisnici" v-bind:naslov="'Dodaj kupca'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createKupac"></kupac-forma>
</div>
<div class="w-75 p-3">
    <tabela-kupaca v-bind:naslov="'Tabela kupaca'" v-bind:kupci="kupci" v-on:uklanjanje="removeKupac" v-on:izmena="setKupacZaIzmenu"></tabela-kupaca>
</div>
        `,
    data(){
        return {
            kupci:[],
            korisnici:[],
         
            turistaZaIzmenu:{},
           
          
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setKupacZaIzmenu(kupac){ //skladistenje nakon izmene//
            this.$router.push(`/kupci/${kupac.id}`);
        },
        

        refreshKupac(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
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


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshKupac();
    }
}
