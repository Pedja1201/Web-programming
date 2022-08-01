export default {
    template:`
<div class="w-75 p-3">
    <profesor-form v-bind:naslov="'Dodaj profesora'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createProfesor"></profesor-form>

    <tabela-profesora v-bind:naslov="'Tabela profesora'" v-bind:profesori="profesori" v-on:uklanjanje="removeProfesor" v-on:izmena="setProfesorZaIzmenu"></tabela-profesora>
</div>
    `,
    data(){
        return {
            profesori:[],
    
            profesorZaIzmenu:{},
            
        }
    },
    methods:{
        setProfesorZaIzmenu(profesor){ //skladistenje nakon izmene//
            this.$router.push(`/profesori/${profesor.id}`);
        },

        refreshProfesor(){
            axios.get("api/profesori").then((response) => {
                this.profesori = response.data;
            });
        },

        //dodavanje//
        createProfesor(profesor){
            axios.post("api/profesori", profesor).then((response) => {
                this.refreshProfesor();
            });
        },

        //izmena//
        updateProfesor(profesor){
            axios.put(`api/profesori/${profesor.id}`, profesor).then((response) => {
                this.refreshProfesor();
            });
        },

        //brisanje//
        removeProfesor(id){
            axios.delete(`api/profesori/${id}`).then((response) => {
                this.refreshProfesor();
            });
        },
    },
    created(){
        this.refreshProfesor();
    }
}