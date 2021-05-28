export default {
    template:`
<div>
    <kuca-forma v-bind:naslov="'Dodaj osiguravajucu kucu'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createOsiguravajucaKuca"></kuca-forma>

    <tabela-kuca v-bind:naslov="'Tabela osiguravajucih kuca'" v-bind:osiguravajuce-kuce="osiguravajuceKuce" v-on:uklanjanje="removeOsiguravajucaKuca" v-on:izmena="setKucaZaIzmenu"></tabela-kuca>
</div>
    `,
    data(){
        return {
            osiguravajuceKuce:[],

            kucaZaIzmenu:{},

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
    
    },
    created(){
        this.refreshOsiguravajucaKuca();
    }
}
