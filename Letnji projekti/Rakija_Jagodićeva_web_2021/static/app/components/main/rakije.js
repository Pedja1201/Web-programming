export default {
    template:`
<div class="w-75 p-3" v-if="stranicaZaPrikaz=='dodaj'">
    <rakija-forma v-bind:naslov="'Dodaj rakiju'"  v-bind:dugme="'Dodaj'" v-on:sacuvaj="createRakija"></rakija-forma>
</div>

<div class="w-75 p-3">
    <tabela-rakije v-bind:naslov="'Tabela rakije'" v-bind:rakije="rakije" v-on:uklanjanje="removeRakija" v-on:izmena="setRakijaZaIzmenu"></tabela-rakije>
</div>
<button v-on:click="navigate('dodaj')" type="button" class="btn btn-dark btn-lg btn-block m-3">Dodaj rakiju</button>


`,
    data(){
        return {
            rakije:[],
            rakijaZaIzmenu:{},
    
          
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setRakijaZaIzmenu(rakija){ //skladistenje nakon izmene//
            this.$router.push(`/rakije/${rakija.id}`);
        },


        refreshRakija(){
            axios.get("api/rakije").then((response) => {
                this.rakije = response.data;
            });
            
        },
        
        //dodavanje//
        createRakija(rakija){
            axios.post("api/rakije", rakija).then((response) => {
                this.refreshRakija();
            });
        },
        
        //izmena//
        updateRakija(rakija){
            axios.put(`api/rakije/${rakija.id}`, rakija).then((response) => {
                this.refreshRakija();
            });
        },

        
        //brisanje//
        removeRakija(id){
            axios.delete(`api/rakije/${id}`).then((response) => {
                this.refreshRakija();
            });
        },
        


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshRakija();
    }
}
