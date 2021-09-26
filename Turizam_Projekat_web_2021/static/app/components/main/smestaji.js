export default {
    template:`
<div class="w-50 p-3" v-if="stranicaZaPrikaz=='dodaj'">
    <smestaj-forma v-on:sacuvaj="createSmestaj" v-bind:naslov="'Dodaj smeštaj'" v-bind:dugme="'Dodaj'"></smestaj-forma>
</div>

<div class="w-75 p-3">
    <tabela-smestaja v-bind:naslov="'Tabela smeštaja'" v-bind:smestaji="smestaji" v-on:uklanjanje="removeSmestaj" v-on:izmena="setSmestajZaIzmenu"></tabela-smestaja>
</div>

<button v-on:click="navigate('dodaj')" type="button" class="btn btn-warning btn-lg btn-block m-3">Dodaj smeštaj</button>
    `,
    data(){
        return {
            smestaji:[],

            smestajZaIzmenu:{},
            stranicaZaPrikaz:"",
          
        }
    },
    methods:{
        setSmestajZaIzmenu(smestaj){ //skladistenje nakon izmene//
            this.$router.push(`/smestaji/${smestaj.id}`);
        },

        refreshSmestaj(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/smestaji").then((response) => {
                this.smestaji = response.data;
            });
        },

        //dodavanje//
        createSmestaj(smestaj){
            axios.post("api/smestaji", smestaj).then((response) => {
                this.refreshSmestaj();
            });
        },

        //izmena//
        updateSmestaj(smestaj){
            axios.put(`api/smestaji/${smestaj.id}`, smestaj).then((response) => {
                this.refreshSmestaj();
            });
        },

        //brisanje//
        removeSmestaj(id){
            axios.delete(`api/smestaji/${id}`).then((response) => {
                this.refreshSmestaj();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }

    },
    created(){
        this.refreshSmestaj();
    }
}