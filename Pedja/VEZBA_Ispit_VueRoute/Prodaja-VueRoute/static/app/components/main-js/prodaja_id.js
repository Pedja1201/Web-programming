////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena prodaje</b></p>
<div>
    <label>Aranzman ID: </label>
    <select v-model="prodaja.aranzman_id" required>
        <option v-for="aranzman in aranzmani" :value="aranzman.id">{{aranzman.naziv}}, {{aranzman.cena}}, {{aranzman.datum_polaska}}, {{aranzman.broj_dana}}</option>
    </select>
</div>
<div>
    <label>Turista ID: </label>
    <select v-model="prodaja.turista_id" required>
        <option v-for="turista in turisti" :value="turista.id">{{turista.ime}}, {{turista.prezime}}, {{turista.datum_rodjenja}}, {{turista.maticni_broj}}</option>
    </select>
</div>

<div>
    <label>Nacin placanja: </label>
    <input type="text" v-model="prodaja.nacin_placanja" required></div>
<div>
    <label>Datum placanja: </label>
    <input type="datetime-local" v-model="prodaja.datum_placanja" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            prodaja: {},
            aranzmani:{}, ///za select
            turisti:{},  ////za select
        }
    },
    methods:{
        refresh(){
            axios.get(`api/prodaje/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datum_placanja = new Date(response.data.datum_placanja).toISOString().split("Z")[0];
                this.prodaja = response.data;
            });
            ///Select opcija-novo
            axios.get("api/aranzmani").then((response) => {
                this.aranzmani = response.data;
            });
            axios.get("api/turisti").then((response) => {
                this.turisti = response.data;
            });
        },

        update(){
            axios.put(`api/prodaje/${this.$route.params['id']}`, this.prodaja).then((response) => {
                this.$router.push("/prodaje");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}