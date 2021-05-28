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
    <label>Korisnicko ime: </label>
    <input type="text" v-model="kupac.korIme" required></div>
<div>
    <label>Lozinka: </label>
    <input type="text" v-model="kupac.lozinka" required></div>

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
            axios.get(`api/kupci/${this.$route.params['id']}`).then((response) => {
                this.kupac = response.data;
            });
        },
        update(){
            axios.put(`api/kupci/${this.$route.params['id']}`, this.kupac).then((response) => {
                this.$router.push("/");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}