////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena kupovine</b></p>
<div>
    <label>Kolicina: </label>
    <input type="number" v-model="kupovina.kolicina" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="kupovina.cena" required></div>
<div>
    <label>Datum: </label>
    <input type="datetime-local" v-model="kupovina.datum" required></div>
<div>
    <label>Kupac ID: </label>
    <select v-model="kupovina.kupac_id" required>
        <option v-for="kupac in kupci" :value="kupac.id">{{kupac.ime}},{{kupac.prezime}}</option>
    </select>
</div>
<div>
    <label>Proizvod ID: </label>
    <select v-model="kupovina.proizvod_id" required>
        <option v-for="proizvod in proizvodi" :value="proizvod.id">{{proizvod.naziv}},{{proizvod.opis}},{{proizvod.cena}}-{{proizvod.dostupno}}</option>
    </select>
</div>


<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            kupovina: {},
            kupci:{},///select opcija
            proizvodi:{}, ///select opcija
            
        }
    },
    methods:{
        refresh(){
            axios.get(`api/kupovine/${this.$route.params['broj']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datum = new Date(response.data.datum).toISOString().split("Z")[0];
        
                this.kupovina = response.data;
            });
            ///Select opcija
            axios.get("api/kupci").then((response) => {
                this.kupci = response.data;
            });
            axios.get("api/proizvodi").then((response) => {
                this.proizvodi = response.data;
             });
        },
        update(){
            axios.put(`api/kupovine/${this.$route.params['broj']}`, this.kupovina).then((response) => {
                this.$router.push("/kupovine");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}