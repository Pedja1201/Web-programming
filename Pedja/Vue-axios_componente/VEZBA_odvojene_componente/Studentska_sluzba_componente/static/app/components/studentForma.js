export default {
    props: ["student", "dugme", "naslov"],
    emits : ["sacuvaj"],
    data(){
        return{
            noviStudent: this.student ? this.student : {}
        }
    },
//izmena i setovanje izmene 1 nacin//
    // computed:{
    //     studentZaIzmenu: {
    //         get : function(){
    //             return {...this.radnstudentik};
    //         },
    //         set: function(novi){
    //             this.noviStudent = {...novi};
    //         }
    //     }
    // },

    watch: {
        student: function(newValue, oldValue){
            this.noviStudent = {...this.student};
        }
        
    },
    template:  `
<form v-on:submit.prevent="$emit('sacuvaj', {...noviStudent})">
<p><b>-{{naslov}}</b></p>
<div>
    <label>Broj Indeksa: </label>
    <input type="text" v-model="noviStudent.brojIndeksa" required></div>
<div>
    <label>Ime: </label>
    <input type="text" v-model="noviStudent.ime" required></div>
<div>
    <label>Prezime: </label>
    <input type="text" v-model="noviStudent.prezime" required></div>
<div>
    <label>E-mail: </label>
    <input type="email" v-model="noviStudent.email" required></div>
<div>
    <label>Lozinka: </label>
    <input type="password" v-model="noviStudent.lozinka" required></div>

<div>
    <input type="submit" v-bind:value="dugme">
</div>
</form>
    `

}