export default {
    template:`
<div>
    <turista-forma v-bind:naslov="'Dodaj turistu'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createTurista"></turista-forma>

    <tabela-turista v-bind:turisti="turisti" v-on:uklanjanje="removeTurista" v-on:izmena="setTuristaZaIzmenu"></tabela-turista>
</div>
    `,
    data(){
        return {
            turisti:[],

            turistaZaIzmenu:{},

        }
    },
    methods:{
        setTuristaZaIzmenu(turista){ //skladistenje nakon izmene//
            this.$router.push(`/${turista.id}`);
        },

        refreshTurista(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/turisti").then((response) => {
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


    },
    created(){
        this.refreshTurista();
    }
}
