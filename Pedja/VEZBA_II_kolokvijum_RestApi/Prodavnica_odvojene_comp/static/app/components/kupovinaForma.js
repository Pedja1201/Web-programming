export default {
    props: ["kupovina", "dugme", "naslov", "kupci", "proizvodi"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaKupovina: this.kupovina ? this.kupovina : {}
        }
    },


    watch: {
        kupovina: function(newValue, oldValue){
            this.novaKupovina = {...this.kupovina};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaKupovina})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Kolicina: </label>
    <input type="number" v-model="novaKupovina.kolicina" required></div>
<div>
    <label>Cena: </label>
    <input type="number" v-model="novaKupovina.cena" required></div>
<div>
    <label>Datum: </label>
    <input type="datetime-local" v-model="novaKupovina.datum" required></div>
<div>
    <label>Kupac ID: </label>
    <select v-model="novaKupovina.kupac_id" required>
        <option v-for="kupac in kupci" :value="kupac.id">{{kupac.ime}},{{kupac.prezime}}</option>
    </select>
</div>
<div>
    <label>Proizvod ID: </label>
    <select v-model="novaKupovina.proizvod_id" required>
        <option v-for="proizvod in proizvodi" :value="proizvod.id">{{proizvod.naziv}},{{proizvod.opis}},{{proizvod.cena}}-{{proizvod.dostupno}}</option>
    </select>
</div>


<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}