export default {
    template:`
<div>
    <automobil-forma v-bind:naslov="'Dodaj automobil'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createAutomobil"></automobil-forma>

    <tabela-automobila v-bind:naslov="'Tabela automobila'" v-bind:automobili="automobili" v-on:uklanjanje="removeAutomobil" v-on:izmena="setAutoZaIzmenu"></tabela-automobila>
</div>
    `,
    data(){
        return {
            automobili:[],

            autoZaIzmenu:{},
        }
    },
    methods:{
        setAutoZaIzmenu(auto){ //skladistenje nakon izmene//
            this.$router.push(`/${auto.id}`);
        },

        refreshAutomobil(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/automobili").then((response) => {
                this.automobili = response.data;
            });
        },
        
        //dodavanje//
        createAutomobil(auto){
            axios.post("api/automobili", auto).then((response) => {
                this.refreshAutomobil();
            });
        },
        
        //izmena//
        updateAutomobil(auto){
            axios.put(`api/automobili/${auto.id}`, auto).then((response) => {
                this.refreshAutomobil();
            });
        },
        
        //brisanje//
        removeAutomobil(id){
            axios.delete(`api/automobili/${id}`).then((response) => {
                this.refreshAutomobil();
            });
        },

    },
    created(){
        this.refreshAutomobil();
    }
}
