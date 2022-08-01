export default {
    template:`
<div class="w-75 p-3" v-if="stranicaZaPrikaz=='dodaj'">
    <automobil-forma v-bind:naslov="'Dodaj automobil'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createAutomobil"></automobil-forma>
</div>
    <button v-on:click="navigate('dodaj')" type="button" class="btn btn-outline-dark btn-lg btn-block m-3">Dodaj auto</button>
<div class="w-75 p-3">
    <tabela-automobila v-bind:naslov="'Tabela automobila'" v-bind:automobili="automobili" v-on:uklanjanje="removeAutomobil" v-on:izmena="setAutoZaIzmenu"></tabela-automobila>
</div>
    `,
    data(){
        return {
            automobili:[],

            autoZaIzmenu:{},

            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setAutoZaIzmenu(auto){ //skladistenje nakon izmene//
            this.$router.push(`/automobili/${auto.id}`);
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

        navigate(page){
            this.stranicaZaPrikaz = page;
        }

    },
    created(){
        this.refreshAutomobil();
    }
}
