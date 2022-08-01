export default {
    props: ["korisnik", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviKorisnik: this.korisnik ? this.korisnik : {}
        }
    },

    watch: {
        korisnik: function(newValue, oldValue){
            this.noviKorisnik = {...this.korisnik};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviKorisnik})" class="w-85 p-3 container fade-in" id="boja3">
<p id="naslov"><b>-{{naslov}}</b></p>

<div class="mb-3">
    <label class="form-label">E-mail: </label>
    <input type="email" class="form-control aler alert-success" v-model="noviKorisnik.email" required>
    <div class="form-text"><i>Uneti e-mail adresu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Lozinka: </label>
    <input type="password" class="form-control aler alert-success" maxlength="20" v-model="noviKorisnik.lozinka" required>
    <div class="form-text"><i>Uneti lozinku</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `

}
