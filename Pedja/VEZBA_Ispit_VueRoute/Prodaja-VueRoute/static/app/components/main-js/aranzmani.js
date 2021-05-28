export default {
    template:`
<div>
    <aranzman-forma v-bind:naslov="'Dodaj aranzman'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createAranzman"></aranzman-forma>

    <tabela-aranzmana v-bind:aranzmani="aranzmani" v-on:uklanjanje="removeAranzman" v-on:izmena="setAranzmanZaIzmenu"></tabela-aranzmana>
</div>
    `,
    data(){
        return {
            aranzmani:[],
        
            aranzmanZaIzmenu:{},
        }
    },
    methods:{
        setAranzmanZaIzmenu(aranzman){ //skladistenje nakon izmene//
            this.$router.push(`/aranzmani/${aranzman.id}`);
        },

        refreshAranzman(){
            axios.get("api/aranzmani").then((response) => {
                this.aranzmani = response.data;
            });
        },
        
        //dodavanje//
        createAranzman(aranzman){
            axios.post("api/aranzmani", aranzman).then((response) => {
                this.refreshAranzman();
            });
        },
        
        //izmena//
        updateAranzman(aranzman){
            axios.put(`api/aranzmani/${aranzman.id}`, aranzman).then((response) => {
                this.refreshAranzman();
            });
        },
        
        //brisanje//
        removeAranzman(id){
            axios.delete(`api/aranzmani/${id}`).then((response) => {
                this.refreshAranzman();
            });
        },
       
    },
    created(){
        this.refreshAranzman();
    }
}
