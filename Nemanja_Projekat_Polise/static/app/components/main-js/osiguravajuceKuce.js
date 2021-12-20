export default {
    template:`
<div class="w-50 p-3" v-if="stranicaZaPrikaz=='dodaj'">
    <kuca-forma v-bind:naslov="'Dodaj osiguravajucu kucu'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createOsiguravajucaKuca"></kuca-forma>
</div>
<div class="w-75 p-3">
    <tabela-kuca v-bind:naslov="'Tabela osiguravajucih kuca'" v-bind:osiguravajuce-kuce="osiguravajuceKuce" v-on:uklanjanje="removeOsiguravajucaKuca" v-on:izmena="setKucaZaIzmenu"></tabela-kuca>
</div>

<button v-on:click="navigate('dodaj')" type="button" class="btn btn-warning btn-lg btn-block m-3">Dodaj osiguravajucu kucu</button>

    `,
    data(){
        return {
            osiguravajuceKuce:[],

            kucaZaIzmenu:{},
            stranicaZaPrikaz:"",
        }
    },
    methods:{
        setKucaZaIzmenu(kuca){ //skladistenje nakon izmene//
            this.$router.push(`/osiguravajuceKuce/${kuca.id}`);
        },
    

        refreshOsiguravajucaKuca(){
            axios.get("api/osiguravajuceKuce").then((response) => {
               this.osiguravajuceKuce = response.data;
            });
        },
        
        //dodavanje//
        createOsiguravajucaKuca(kuca){
            axios.post("api/osiguravajuceKuce", kuca).then((response) => {
                this.refreshOsiguravajucaKuca();
            });
        },
        
        //izmena//
        updateOsiguravajucaKuca(kuca){
            axios.put(`api/osiguravajuceKuce/${kuca.id}`, kuca).then((response) => {
                this.refreshOsiguravajucaKuca();
            });
        },
        
        //brisanje//
        removeOsiguravajucaKuca(id){
            axios.delete(`api/osiguravajuceKuce/${id}`).then((response) => {
                this.refreshOsiguravajucaKuca();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    
    },
    created(){
        this.refreshOsiguravajucaKuca();
    }
}
