export default {
    props: ["knjiga", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaKnjiga: this.knjiga ? this.knjiga : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     knjigaZaIzmenu: {
    //         get : function(){
    //             return {...this.knjiga};
    //         },
    //         set: function(novi){
    //             this.novaKnjiga = {...novi};
    //         }
    //     }
    // },

    watch: {
        knjiga: function(newValue, oldValue){
            this.novaKnjiga = {...this.knjiga};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaKnjiga})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Naziv: </label>
    <input type="text" v-model="novaKnjiga.naziv" required></div>
<div>
    <label>Autor: </label>
    <input type="text" v-model="novaKnjiga.autor" required></div>
<div>
    <label>Kategorija: </label> 
    <input type="text" v-model="novaKnjiga.kategorija" required></div>
<div>
    <label>Cena: </label> 
    <input type="number" v-model="novaKnjiga.cena" required></div>
<div>
    <label>Stanje: </label> 
    <select v-model="novaKnjiga.stanje" required>
        <option value="DA">Da</option>
        <option value="NE">Ne</option>
    </select>
<div>
    <label>Link: </label> 
    <input type="text" v-model="novaKnjiga.link" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}