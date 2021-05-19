export default {
    props: ["iznajmiti", "dugme", "naslov", "kupci", "knjige"],
    emits : ["sacuvaj"],
    data(){
        return{
            novaIznajmljivanja: this.iznajmiti ? this.iznajmiti : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     iznajmljivanjeZaIzmenu: {
    //         get : function(){
    //             return {...this.iznajmiti};
    //         },
    //         set: function(novi){
    //             this.novaIznajmljivanja = {...novi};
    //         }
    //     }
    // },

    watch: {
        iznajmiti: function(newValue, oldValue){
            this.novaIznajmljivanja = {...this.iznajmiti};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...novaIznajmljivanja})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>ID Kupca: </label>
    <select v-model="novaIznajmljivanja.IDKupac" required>
        <option v-for="kupac in kupci" :value="kupac.IDKupac">{{kupac.ime}},{{kupac.prezime}}-{{kupac.email}},{{kupac.telefon}}</option>
    </select>
</div>
<div>
    <label>ID Knjige: </label>
    <select v-model="novaIznajmljivanja.IDKnjiga" required>
        <option v-for="knjiga in knjige" :value="knjiga.IDKnjiga">{{knjiga.naziv}},{{knjiga.autor}}/{{knjiga.kategorija}}/{{knjiga.cena}},{{knjiga.stanje}},{{knjiga.link}}</option>
    </select>
</div>

<div>
    <label>Kolicina: </label> 
    <input type="number" v-model="novaIznajmljivanja.kolicina" required></div>
<div>
    <label>Nacin placanja: </label> 
    <input type="text" v-model="novaIznajmljivanja.nacinPlacanja" required></div>
<div>
    <label>Valuta: </label> 
    <input type="text" v-model="novaIznajmljivanja.valuta" required></div>
<div>
    <label>Period iznajmljivanja: </label> 
    <input type="text" v-model="novaIznajmljivanja.periodIznajmljivanja" required></div>
<div>
    <label>Datum porudzbine: </label> 
    <input type="datetime-local" v-model="novaIznajmljivanja.datumPorudzbine" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}