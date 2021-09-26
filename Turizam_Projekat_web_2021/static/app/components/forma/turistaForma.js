export default {
    props: ["turista", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviTurista: this.turista ? this.turista : {}
        }
    },


    watch: {
        turista: function(newValue, oldValue){
            this.noviTurista = {...this.turista};
        }
        
    },
    template:  `

<form v-on:submit.prevent="$emit('sacuvaj', {...noviTurista})"  class="w-85 p-3 container fade-in bg-image"
style="
background-image: url('./pictures/turista.png');
height: 100vh;
">
<p id="naslov"><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Ime: </label>
    <input type="text" class="form-control aler alert-primary" v-model="noviTurista.ime" required>
    <div class="form-text"><i>Uneti ime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Prezime: </label>
    <input type="text" class="form-control aler alert-primary" v-model="noviTurista.prezime" required>
    <div class="form-text"><i>Uneti prezime</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum rođenja: </label>
    <input type="datetime-local" class="form-control aler alert-primary" v-model="noviTurista.datum_rodjenja" required>
    <div class="form-text"><i>Uneti datum rođenja</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Matični broj: </label>
    <input type="number" class="form-control aler alert-primary" v-model="noviTurista.maticni_broj" required>
    <div class="form-text"><i>Uneti maticni broj</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>

</form>
    `

}