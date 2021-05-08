export default {
    props: ["skola", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaSkola: this.skola ? this.skola : {}
        }
    },

    watch: {
        skola: function(newValue, oldValue){
            this.novaSkola = {...this.skola};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaSkola})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>ID: </label>
    <input type="number" v-model="novaSkola.id" required></div>
<div>
<div>
    <label>Ime skole: </label>
    <input type="text" v-model="novaSkola.ime_skole" required></div>
<div>
    <label>Adresa: </label>
    <input type="text" v-model="novaSkola.adresa" required></div>
<div>
    <label>ID-Nastavnika: </label>
    <input type="number" v-model="novaSkola.nastavnik_licni_id" required></div>
<div>
    <label>ID-Predmeta: </label>
    <input type="text" v-model="novaSkola.predmet_id" required></div>
<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}