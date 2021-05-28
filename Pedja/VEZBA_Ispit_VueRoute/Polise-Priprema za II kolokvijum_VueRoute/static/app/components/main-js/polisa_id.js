////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena automobila</b></p>
<div>
    <label>Automobil ID: </label>
    <select v-model="polisa.automobil_id" required>
        <option v-for="auto in automobili" :value="auto.id">{{auto.registarski_broj}}, {{auto.marka}},{{auto.model}},{{auto.zapremina_motora}}</option>
    </select>
</div>
<div>
    <label>Osiguravajuca kuca ID: </label>
    <select v-model="polisa.osiguravajuca_kuca_id" required>
        <option v-for="kuca in osiguravajuceKuce" :value="kuca.id">{{kuca.naziv}}</option>
    </select>
</div>
<div>
    <label>Datum pocetka: </label>
    <input type="datetime-local" v-model="polisa.datum_pocetka" required></div>
<div>
    <label>Datum kraja: </label>
    <input type="datetime-local" v-model="polisa.datum_kraja" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="polisa.cena" required></div>
<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            polisa: {},
            automobili:{}, ///za select
            osiguravajuceKuce:{},///za select
        }
    },
    methods:{
        refresh(){
            axios.get(`api/polise/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datum_pocetka = new Date(response.data.datum_pocetka).toISOString().split("Z")[0];
                response.data.datum_kraja = new Date(response.data.datum_kraja).toISOString().split("Z")[0];
            
                this.polisa = response.data;
            });
            //Select opcija-novoo
            axios.get("api/automobili").then((response) => {
                this.automobili = response.data;
            });
            axios.get("api/osiguravajuceKuce").then((response) => {
                this.osiguravajuceKuce = response.data;
             });
        },
        update(){
            axios.put(`api/polise/${this.$route.params['id']}`, this.polisa).then((response) => {
                this.$router.push("/polise");
            });
        },
    },

    
    created(){
        this.refresh();

    }
}