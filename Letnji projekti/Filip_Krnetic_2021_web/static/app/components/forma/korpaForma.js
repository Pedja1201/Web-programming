export default {
    props: ["korpa", "dugme", "naslov","igrice"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaKorpa: this.korpa ? this.korpa : {}
        }
    },


    watch: {
        korpa: function(newValue, oldValue){
            this.novaKorpa = {...this.korpa};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaKorpa})" class="p-3">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Igrica ID: </label>
    <select class="form-select" v-model="novaKorpa.igrica_id" required>
        <option v-for="igrica in igrice" :value="igrica.id">-{{igrica.naziv}}, {{igrica.cena}}, {{igrica.zanr}},{{igrica.konzola_id}}</option>
    </select>
    <div class="form-text"><i>Izaberi igricu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Količina: </label>
    <input type="text" class="form-control" v-model="novaKorpa.kolicina" required>
    <div class="form-text"><i>Uneti količina</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum: </label>
    <input type="datetime-local" class="form-control" v-model="novaKorpa.datum" required>
    <div class="form-text"><i>Uneti datum</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `

}