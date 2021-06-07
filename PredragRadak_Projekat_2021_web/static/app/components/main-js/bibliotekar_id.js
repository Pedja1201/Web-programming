////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-50 p-3">
<p><b>-Izmena bibliotekara</b></p>

<div class="mb-3">
    <label class="form-label">Korisničko ime: </label>
    <input type="username" class="form-control" v-model="bibliotekar.korisnicko_ime" required>
    <div class="form-text"><i>Izmeni korisničko ime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Lozinka: </label>
    <input type="text" class="form-control" maxlength="20" v-model="bibliotekar.lozinka" required>
    <div class="form-text"><i>Izmeni lozinku</i></div>
</div>

<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>

</form>
    `,
    data(){
        return {
            bibliotekar: {},
        }
    },
    methods:{
        refresh(){
            axios.get(`api/bibliotekari/${this.$route.params['id']}`).then((response) => {
                this.bibliotekar = response.data;
            });
        },
        update(){
            axios.put(`api/korisnici/${this.$route.params['id']}`, this.korisnik).then((response) => {
                this.$router.push("/bibliotekari");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}