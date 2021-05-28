////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena aranzman</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="aranzman.naziv" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="aranzman.cena" required></div>
<div>
    <label>Datum polaska: </label>
    <input type="datetime-local" v-model="aranzman.datum_polaska" required></div>
<div>
    <label>Broj dana: </label>
    <input type="number" v-model="aranzman.broj_dana" required></div>
<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            aranzman: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/aranzmani/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datum_polaska = new Date(response.data.datum_polaska).toISOString().split("Z")[0];
                this.aranzman = response.data;
            });
        },
        update(){
            axios.put(`api/aranzmani/${this.$route.params['id']}`, this.aranzman).then((response) => {
                this.$router.push("/aranzmani");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}