export default {
    props: ["kupac", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviKupac: this.kupac ? this.kupac : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     kupacZaIzmenu: {
    //         get : function(){
    //             return {...this.kupac};
    //         },
    //         set: function(novi){
    //             this.noviKupac = {...novi};
    //         }
    //     }
    // },

    watch: {
        kupac: function(newValue, oldValue){
            this.noviKupac = {...this.kupac};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviKupac})">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control" v-model="noviKupac.ime" required>
    <div class="form-text"><i>Uneti ime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control" v-model="noviKupac.prezime" required>
    <div class="form-text"><i>Uneti prezime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum rođenja: </label>
    <input type="datetime-local" class="form-control" v-model="noviKupac.datumRodjenja" required>
    <div class="form-text"><i>Uneti datum rođenja</i></div>
</div>
<div class="mb-3">
    <label class="form-label">E-mail: </label>
    <input type="email" class="form-control" v-model="noviKupac.email" required>
    <div class="form-text"><i>Uneti e-mail adresu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Telefon: </label>
    <input type="tel" class="form-control" v-model="noviKupac.telefon" required>
    <div class="form-text"><i>Uneti broj telefona<i></div>
</div>
<div class="mb-3">
    <label class="form-label">Mesto: </label>
    <input type="text" class="form-control" v-model="noviKupac.mesto" required>
    <div class="form-text"><i>Uneti mesto stanovanja</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Adresa: </label>
    <input type="text" class="form-control" v-model="noviKupac.adresa" required>
    <div class="form-text"><i>Uneti adresu stanovanja</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `

}