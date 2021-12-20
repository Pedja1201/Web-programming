export default {
    props: ["polisa", "dugme", "naslov", "automobili", "osiguravajuceKuce"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaPolisa: this.polisa ? this.polisa : {}
        }
    },


    watch: {
        polisa: function(newValue, oldValue){
            this.novaPolisa = {...this.polisa};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaPolisa})" class="w-85 p-3 container fade-in bg-image"
style="
background-image: url('./pictures/prodaja.jpg');
height: 100vh;
">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Automobil ID: </label>
    <select class="form-select aler alert-danger" v-model="novaPolisa.automobil_id" required>
        <option v-for="auto in automobili" :value="auto.id">-{{auto.registarski_broj}}, {{auto.marka}},{{auto.model}},{{auto.zapremina_motora}}}</option>
    </select>
    <div class="form-text"><i>Izaberi automobil</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Osiguravajuca kuca ID: </label>
    <select class="form-select aler alert-danger" v-model="novaPolisa.osiguravajuca_kuca_id" required>
        <option v-for="kuca in osiguravajuceKuce" :value="kuca.id">-{{kuca.naziv}}</option>
    </select>
    <div class="form-text"><i>Izaberi osiguravajucu kucu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum pocetka: </label>
    <input type="datetime-local" class="form-control aler alert-danger" v-model="novaPolisa.datum_pocetka" required>
    <div class="form-text"><i>Uneti datum pocetka</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Datum kraja: </label>
    <input type="datetime-local" class="form-control aler alert-danger" v-model="novaPolisa.datum_kraja" required>
    <div class="form-text"><i>Uneti datum kraja</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Cena: </label>
    <input type="number" class="form-control aler alert-secondary" v-model="novaPolisa.cena" required>
    <div class="form-text"><i>Uneti cenu</i></div>
</div>

<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `

}