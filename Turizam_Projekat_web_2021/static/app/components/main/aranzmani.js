export default {
    template:`
<div class="w-75 p-3" v-if="stranicaZaPrikaz=='dodaj'">
    <aranzman-forma v-bind:naslov="'Dodaj aranžman'" v-bind:smestaji="smestaji" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createAranzman"></aranzman-forma>
</div>

    <button v-on:click="navigate('dodaj')" type="button" class="btn btn-outline-dark btn-lg btn-block m-3">Dodaj aranžman</button>

<div class="w-75 p-3">
    <tabela-aranzmana v-bind:naslov="'Tabela aranžmana'" v-bind:aranzmani="aranzmani" v-on:uklanjanje="removeAranzman" v-on:izmena="setAranzmanZaIzmenu"></tabela-aranzmana>
</div>

`,
    data(){
        return {
            aranzmani:[],
            smestaji:[],
            aranzmanZaIzmenu:{},
    
          
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setAranzmanZaIzmenu(aranzman){ //skladistenje nakon izmene//
            this.$router.push(`/aranzmani/${aranzman.id}`);
        },


        refreshAranzman(){
            axios.get("api/aranzmani").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum_polaska = new Date(d.datum_polaska).toISOString().split("Z")[0];
                }
                this.aranzmani = response.data;
            });
            ///smestaj
            axios.get("api/smestaji").then((response) => {
                this.smestaji = response.data;
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
        


        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshAranzman();
    }
}
