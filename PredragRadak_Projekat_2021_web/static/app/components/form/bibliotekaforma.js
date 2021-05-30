export default {
    props: ["biblioteka", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaBiblioteka: this.biblioteka ? this.biblioteka : {}
        }
    },

    watch: {
        biblioteka: function(newValue, oldValue){
            this.novaBiblioteka = {...this.biblioteka};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaBiblioteka})">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="novaBiblioteka.naziv" required>
    <div class="form-text"><i>Uneti naziv</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Adresa: </label>
    <input type="text" class="form-control" v-model="novaBiblioteka.adresa" required>
    <div class="form-text"><i>Uneti adresu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Telefon: </label>
    <input type="tel" class="form-control" v-model="novaBiblioteka.telefon" required>
    <div class="form-text"><i>Uneti kontakt-telefon</i></div>
</div>
<div class="mb-3">
    <label class="form-label">E-mail: </label>
    <input type="email" class="form-control" v-model="novaBiblioteka.email" required>
    <div class="form-text"><i>Uneti e-mail adresu</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `

}