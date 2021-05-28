export default {
    props: ["nastavnik", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviNastavnik: this.nastavnik ? this.nastavnik : {}
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
        nastavnik: function(newValue, oldValue){
            this.noviNastavnik = {...this.nastavnik};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviNastavnik})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Licni ID: </label>
    <input type="number" v-model="noviNastavnik.licni_id" required></div>
<div>
    <label>Ime: </label>
    <input type="text" v-model="noviNastavnik.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="noviNastavnik.prezime" required></div>
<div>
    <label>E-mail: </label>
    <input type="email" v-model="noviNastavnik.email" required></div>
<div>
    <label>Broj telefona: </label>
    <input type="text" v-model="noviNastavnik.br_telefona" maxlength="15" required></div>
<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}