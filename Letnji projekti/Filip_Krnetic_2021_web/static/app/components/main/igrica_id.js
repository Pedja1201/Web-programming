////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena igrice</b></p>
<div class="mb-3">
    <label class="form-label">Naziv: </label>
    <input type="text" class="form-control" v-model="igrica.naziv" required>
    <div class="form-text"><i>Izmeni naziv</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Cena: </label>
    <input type="number" class="form-control" v-model="igrica.cena" required>
    <div class="form-text"><i>Izmeni cenu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Žanr: </label>
    <input type="text" class="form-control" v-model="igrica.zanr" required>
    <div class="form-text"><i>Izmeni žanr</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Konzola ID: </label>
    <select class="form-select" v-model="igrica.konzola_id" required>
        <option v-for="konzola in konzole" :value="konzola.id">-{{konzola.naziv}}</option>
    </select>
    <div class="form-text"><i>Izaberi konzolu</i></div>
</div>
<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
    data(){
        return {
            igrica: {},
            konzole:{}, ///select opcija
        }
    },
    methods:{
        refresh(){
            axios.get(`api/igrice/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                this.igrica = response.data;
            });
            ///Select opcija-novo
            axios.get("api/konzole").then((response) => {
                this.konzole = response.data;
             });
            ;
        },
        update(){
            axios.put(`api/igrice/${this.$route.params['id']}`, this.igrica).then((response) => {
                this.$router.push("/igrice");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}