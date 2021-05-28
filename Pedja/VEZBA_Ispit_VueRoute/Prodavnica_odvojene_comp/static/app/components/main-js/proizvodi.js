export default {
    template:`
<div>
    <proizvod-forma v-bind:naslov="'Dodaj proizvod'" v-bind:dugme="'Dodaj'" v-on:sacuvaj="createProizvod"></proizvod-forma>

    <tabela-proizvoda v-bind:naslov="'Tabela proizvoda'" v-bind:proizvodi="proizvodi" v-on:uklanjanje="removeProizvod" v-on:izmena="setProizvodZaIzmenu"></tabela-proizvoda>
</div>
    `,
    data(){
        return {
            proizvodi:[],
        
            proizvodZaIzmenu:{},
        
        }
    },
    methods:{
        setProizvodZaIzmenu(proizvod){ //skladistenje nakon izmene//
            this.$router.push(`/proizvodi/${proizvod.id}`);
        },

        refreshProizvod(){
            axios.get("api/proizvodi").then((response) => {
               this.proizvodi = response.data;
            });
        },
        
        //dodavanje//
        createProizvod(proizvod){
            axios.post("api/proizvodi", proizvod).then((response) => {
                this.refreshProizvod();
            });
        },
        

        //izmena//
        updateProizvod(proizvod){
            axios.put(`api/proizvodi/${proizvod.id}`, proizvod).then((response) => {
                this.refreshProizvod();
            });
        },
        

        //brisanje//
        removeProizvod(id){
            axios.delete(`api/proizvodi/${id}`).then((response) => {
                this.refreshProizvod();
            });
        },

    },
    created(){
        this.refreshProizvod();
    }
}