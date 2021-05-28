////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena korisnika</b></p>
<div>
    <label>Korisnicko ime: </label>
    <input type="username" v-model="korisnik.korisnicko_ime" required></div>
<div>
    <label>Ime: </label>
    <input type="text" v-model="korisnik.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="korisnik.prezime" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            korisnik: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/korisnici/${this.$route.params['id']}`).then((response) => {
                this.korisnik = response.data;
            });
        },
        update(){
            axios.put(`api/korisnici/${this.$route.params['id']}`, this.korisnik).then((response) => {
                this.$router.push("/");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}