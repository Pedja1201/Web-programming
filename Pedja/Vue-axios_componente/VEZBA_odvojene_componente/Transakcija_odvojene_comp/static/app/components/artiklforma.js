export default {
    props: ["artikl", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviArtikl: this.artikl ? this.artikl : {}
        }
    },


    watch: {
        artikl: function(newValue, oldValue){
            this.noviArtikl = {...this.artikl};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviArtikl})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="noviArtikl.naziv" required></div>
<div>
    <label>Proizvodjac: </label>
    <input type="text" v-model="noviArtikl.proizvodjac" required></div>
<div>
    <label>Robna marka: </label>
    <input type="text" v-model="noviArtikl.robna_marka" required></div>
<div>
    <label>Dobavljac: </label>
    <input type="text" v-model="noviArtikl.dobavljac" required></div>
<div>
    <label>Cena: </label>
    <input type="numbar" v-model="noviArtikl.cena" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}