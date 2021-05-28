////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena turistu</b></p>
<div>
    <label>Ime: </label>
    <input type="text" v-model="turista.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="turista.prezime" required></div>
<div>
    <label>Datum rodjenja: </label>
    <input type="datetime-local" v-model="turista.datum_rodjenja" required></div>
<div>
    <label>Maticni broj: </label>
    <input type="number" v-model="turista.maticni_broj" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            turista: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/turisti/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datum_rodjenja = new Date(response.data.datum_rodjenja).toISOString().split("Z")[0];
                this.turista = response.data;
            });
        },
        update(){
            axios.put(`api/turisti/${this.$route.params['id']}`, this.turista).then((response) => {
                this.$router.push("/");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}