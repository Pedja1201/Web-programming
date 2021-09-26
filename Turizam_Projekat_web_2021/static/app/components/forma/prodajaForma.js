export default {
    props: ["prodaja", "dugme", "naslov", "aranzmani", "turisti"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaProdaja: this.prodaja ? this.prodaja : {}
        }
    },


    watch: {
        prodaja: function(newValue, oldValue){
            this.novaProdaja = {...this.prodaja};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaProdaja})" class="w-85 p-3 container fade-in bg-image"
style="
background-image: url('./pictures/prodaja.jpg');
height: 100vh;
">
<p><b>-{{naslov}}</b></p>
<div class="mb-3">
    <label class="form-label">Aranzman ID: </label>
    <select class="form-select aler alert-danger" v-model="novaProdaja.aranzman_id" required>
        <option v-for="aranzman in aranzmani" :value="aranzman.id">-{{aranzman.smestaj_id}}, {{aranzman.cena}}, {{aranzman.datum_polaska}}, {{aranzman.broj_dana}}</option>
    </select>
    <div class="form-text"><i>Izaberi aranzman</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Turista ID: </label>
    <select class="form-select aler alert-danger" v-model="novaProdaja.turista_id" required>
        <option v-for="turista in turisti" :value="turista.id">-{{turista.ime}}, {{turista.prezime}}, {{turista.datum_rodjenja}}, {{turista.maticni_broj}}</option>
    </select>
    <div class="form-text"><i>Izaberi turistu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Način plaćanja: </label>
    <input type="text" class="form-control aler alert-danger" v-model="novaProdaja.nacin_placanja" required>
    <div class="form-text"><i>Uneti način plaćanja</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum plaćanja: </label>
    <input type="datetime-local" class="form-control aler alert-danger" v-model="novaProdaja.datum_placanja" required>
    <div class="form-text"><i>Uneti datum plaćanja</i></div>
</div>
<div>
    <button type="submit" class="btn btn-success">{{dugme}}</button>
</div>
</form>
    `

}