////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update">
<p><b>-Izmena Angazovanja</b></p>
<div>
    <label>Radnik ID: </label>
    <select v-model="angaz.radnik_id" required>
        <option v-for="radnik in radnici" :value="radnik.id">{{radnik.ime}},{{radnik.prezime}}-{{radnik.email}}</option>
    </select>
</div>
<div>
    <label>Radno mesto ID: </label>
    <select v-model="angaz.radno_mesto_id" required>
        <option v-for="mesto in radnaMesta" :value="mesto.id">{{mesto.naziv}}</option>
    </select>
</div>

<div>
    <label>Pocetak: </label>
    <input type="datetime-local" v-model="angaz.pocetak" required></div>
<div>
    <label>Kraj: </label>
    <input type="datetime-local" v-model="angaz.kraj" required></div>
<div>
    <label>Plata: </label>
    <input type="text" v-model="angaz.plata" required></div>

<div>
    <input type="submit" v-bind:value="'Izmeni'">
</div>
</form>
    `,
    data(){
        return {
            angaz: {},
            radnici:{},
            radnaMesta:{}
        }
    },
    methods:{
        refresh(){
            axios.get(`api/angazovanja/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.pocetak = new Date(response.data.pocetak).toISOString().split("Z")[0];
                response.data.kraj = new Date(response.data.kraj).toISOString().split("Z")[0];

                this.angaz = response.data;
            });
            ///Select opcija-dodato novo!!!!
            axios.get("api/radnici").then((response) => {
                this.radnici = response.data;
            });
            axios.get("api/radnaMesta").then((response) => {
                this.radnaMesta = response.data;
            });
        },
        update(){
            axios.put(`api/angazovanja/${this.$route.params['id']}`, this.angaz).then((response) => {
                this.$router.push("/angazovanja");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}