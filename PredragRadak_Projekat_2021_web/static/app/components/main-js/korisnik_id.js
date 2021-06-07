////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-50 p-3">
<p><b>-Izmena korisnika</b></p>

<div class="mb-3">
    <label class="form-label">E-mail: </label>
    <input type="email" class="form-control" v-model="korisnik.email" required>
    <div class="form-text"><i>Izmeni e-mail adresu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Lozinka: </label>
    <input type="text" class="form-control" maxlength="20" v-model="korisnik.lozinka" required>
    <div class="form-text"><i>Izmeni lozinku</i></div>
</div>

<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
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
                this.$router.push("/korisnici");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}