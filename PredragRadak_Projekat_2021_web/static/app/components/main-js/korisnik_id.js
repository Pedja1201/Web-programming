////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena korisnika</b></p>
<div>
    <label>Ime: </label>
    <input type="text" v-model="korisnik.ime" required></div>
<div>
    <label>E-mail: </label>
    <input type="email" v-model="korisnik.email" required></div>
<div>
    <label>Lozinka: </label> 
    <input type="text" v-model="korisnik.lozinka" maxlength="20" required></div>
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
            axios.get(`api/korisnici/${this.$route.params['IDKorisnik']}`).then((response) => {
                this.korisnik = response.data;
            });
        },
        update(){
            axios.put(`api/korisnici/${this.$route.params['IDKorisnik']}`, this.korisnik).then((response) => {
                this.$router.push("/");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}