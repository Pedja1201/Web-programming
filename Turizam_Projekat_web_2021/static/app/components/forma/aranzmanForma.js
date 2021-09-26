export default {
    props: ["aranzman", "dugme", "naslov", "smestaji"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviAranzman: this.aranzman ? this.aranzman : {}
        }
    },


    watch: {
        aranzman: function(newValue, oldValue){
            this.noviAranzman = {...this.aranzman};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviAranzman})" class="w-85 p-3 container fade-in bg-image"
style="
background-image: url('./pictures/aranzmanForma.jpg');
height: 100vh;
">
<p id="naslov"><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Smeštaj: </label>
    <select class="form-select aler alert-secondary" v-model="noviAranzman.smestaj_id" required>
        <option v-for="smestaj in smestaji" :value="smestaj.id">-{{smestaj.naziv}}, {{smestaj.mesto}}</option>
    </select>
    <div class="form-text"><i>Izaberi smeštaj</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Cena: </label>
    <input type="number" class="form-control aler alert-secondary" v-model="noviAranzman.cena" required>
    <div class="form-text"><i>Uneti cenu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum polaska: </label>
    <input type="datetime-local" class="form-control aler alert-secondary" v-model="noviAranzman.datum_polaska" required>
    <div class="form-text"><i>Uneti datum polaska</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Broj dana: </label>
    <input type="number" class="form-control aler alert-secondary" v-model="noviAranzman.broj_dana" required>
    <div class="form-text"><i>Uneti broj dana</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `

}