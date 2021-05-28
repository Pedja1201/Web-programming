export default {
    template:`
<div>
    <polisa-forma v-bind:naslov="'Dodaj polisu'" v-bind:dugme="'Dodaj'" v-bind:automobili="automobili" v-bind:osiguravajuce-kuce="osiguravajuceKuce" v-on:sacuvaj="createPolisa"></polisa-forma>

    <tabela-polise v-bind:naslov="'Tabela polisa'" v-bind:polise="polise" v-on:uklanjanje="removePolisa" v-on:izmena="setPolisaZaIzmenu"></tabela-polise>
</div>
    `,
    data(){
        return {
            polise:[],
            automobili:[],  //za select
            osiguravajuceKuce:[],  ///za select

            polisaZaIzmenu:{},
        }
    },
    methods:{
        setPolisaZaIzmenu(polisa){ //skladistenje nakon izmene//
            this.$router.push(`/polise/${polisa.id}`);
        },
        
        refreshPolisa(){
            axios.get("api/polise").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                // for(let d of response.data) {
                //     d.datum_pocetka = new Date(d.datum_pocetka).toISOString().split("Z")[0];
                //     d.datum_kraja = new Date(d.datum_kraja).toISOString().split("Z")[0];
                // }
                this.polise = response.data;
            });
            //Select opcija-novoo
            axios.get("api/automobili").then((response) => {
                this.automobili = response.data;
            });
            axios.get("api/osiguravajuceKuce").then((response) => {
                this.osiguravajuceKuce = response.data;
             });
        },
        
        //dodavanje//
        createPolisa(polisa){
            axios.post("api/polise", polisa).then((response) => {
                this.refreshPolisa();
            });
        },
        
        //izmena//
        updatePolisa(polisa){
            axios.put(`api/polise/${polisa.id}`, polisa).then((response) => {
                this.refreshPolisa();
            });
        },
        
        //brisanje//
        removePolisa(id){
            axios.delete(`api/polise/${id}`).then((response) => {
                this.refreshPolisa();
            });
        },
      
    },
    created(){
        this.refreshPolisa();
    }
}
