export default {
    props: ["bibliotekar", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviBibliotekar: this.bibliotekar ? this.bibliotekar : {}
        }
    },

    watch: {
        bibliotekar: function(newValue, oldValue){
            this.noviBibliotekar = {...this.bibliotekar};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviBibliotekar})">
<p><b>-{{naslov}}</b></p>

<div class="mb-3">
    <label class="form-label">Korisnicko ime: </label>
    <input type="username" class="form-control" v-model="noviBibliotekar.korisnicko_ime" required>
    <div class="form-text"><i>Uneti korisnicko ime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Lozinka: </label>
    <input type="password" class="form-control" maxlength="20" v-model="noviBibliotekar.lozinka" required>
    <div class="form-text"><i>Uneti lozinku</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `
    

}
