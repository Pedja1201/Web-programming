export default {
    template:`
    <button v-on:click="navigate('turisti')" type="button" class="btn btn-outline-light btn-lg btn-block m-3">Dodaj turistu</button>

<div class="w-75 p-3" v-if="stranicaZaPrikaz=='turisti'">
    <turista-forma v-bind:naslov="'Dodaj turistu'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createTurista"></turista-forma>
</div>
<div class="w-75 p-3">
    <tabela-turista v-bind:naslov="'Tabela turista'" v-bind:turisti="turisti" v-on:uklanjanje="removeTurista" v-on:izmena="setTuristaZaIzmenu"></tabela-turista>
</div>
        `,
    data(){
        return {
            turisti:[],
         
            turistaZaIzmenu:{},
           
          
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setTuristaZaIzmenu(turista){ //skladistenje nakon izmene//
            this.$router.push(`/turisti/${turista.id}`);
        },
        

        refreshTurista(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/turisti").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum_rodjenja = new Date(d.datum_rodjenja).toDateString().split("Z")[0];
                }
                this.turisti = response.data;
            });
        },
       
        
        //dodavanje//
        createTurista(turista){
            axios.post("api/turisti", turista).then((response) => {
                this.refreshTurista();
            });
        },
        
        //izmena//
        updateTurista(turista){
            axios.put(`api/turisti/${turista.id}`, turista).then((response) => {
                this.refreshTurista();
            });
        },
        
        //brisanje//
        removeTurista(id){
            axios.delete(`api/turisti/${id}`).then((response) => {
                this.refreshTurista();
            });
        },


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshTurista();
    }
}
