////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena kupca</b></p>
<div>
    <label>Ime: </label>
    <input type="text" v-model="kupac.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="kupac.prezime" required></div>
<div>
    <label>Datum rodjenja: </label> 
    <input type="datetime-local" v-model="kupac.datumRodjenja" required></div>
<div>
    <label>E-mail: </label> 
    <input type="email" v-model="kupac.email" required></div>
<div>
    <label>Telefon: </label> 
    <input type="text" v-model="kupac.telefon" required></div>
<div>
    <label>Mesto: </label> 
    <input type="text" v-model="kupac.mesto" required></div>
<div>
    <label>Adresa: </label> 
    <input type="text" v-model="kupac.adresa" required></div>
<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            kupac: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/kupci/${this.$route.params['IDKupac']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datumRodjenja = new Date(response.data.datumRodjenja).toISOString().split("Z")[0];
            
                this.kupac = response.data;
            });
        },
        update(){
            axios.put(`api/kupci/${this.$route.params['IDKupac']}`, this.kupac).then((response) => {
                this.$router.push("/kupci");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}