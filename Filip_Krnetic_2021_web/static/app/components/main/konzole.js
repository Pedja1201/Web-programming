export default {
    template:`
    <button v-on:click="navigate('konzole')" type="button" class="btn btn-primary btn-lg btn-block m-3">Dodaj u konzolu</button>

<div class="w-75 p-3" v-if="stranicaZaPrikaz=='konzole'">
    <konzola-forma  v-bind:naslov="'Dodaj konzolu'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createKonzola"></konzola-forma>
</div>
<div class="w-75 p-3">
    <tabela-konzole v-bind:naslov="'Tabela konzole'" v-bind:konzole="konzole" v-on:uklanjanje="removeKonzola" v-on:izmena="setKonzolaZaIzmenu"></tabela-konzole>
</div>
        `,
    data(){
        return {
            konzole:[],
         
            konzolaZaIzmenu:{},
           
          
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setKonzolaZaIzmenu(konzola){ //skladistenje nakon izmene//
            this.$router.push(`/konzole/${konzola.id}`);
        },
        

        refreshKonzola(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/konzole").then((response) => {
                this.konzole = response.data;
            });
        },
       
        
        //dodavanje//
        createKonzola(konzola){
            axios.post("api/konzole", konzola).then((response) => {
                this.refreshKonzola();
            });
        },
        
        //izmena//
        updateKonzola(konzola){
            axios.put(`api/konzole/${konzola.id}`, konzola).then((response) => {
                this.refreshKonzola();
            });
        },
        
        //brisanje//
        removeKonzola(id){
            axios.delete(`api/konzole/${id}`).then((response) => {
                this.refreshKonzola();
            });
        },


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshKonzola();
    }
}
