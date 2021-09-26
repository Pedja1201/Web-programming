////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena aranžmana</b></p>
<div class="mb-3">
    <label class="form-label">Smeštaj: </label>
    <select class="form-select aler alert-danger" v-model="aranzman.smestaj_id" required>
        <option v-for="smestaj in smestaji" :value="smestaj.id">-{{smestaj.naziv}}, {{smestaj.mesto}}</option>
    </select>
</div>
    <div class="form-text"><i>Izaberi smeštaj</i></div>
<div class="mb-3">
    <label class="form-label">Cena: </label>
    <input type="number" class="form-control aler alert-danger" v-model="aranzman.cena" required>
    <div class="form-text"><i>Izmeni cenu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum polaska: </label>
    <input type="datetime-local" class="form-control aler alert-danger" v-model="aranzman.datum_polaska" required>
    <div class="form-text"><i>Izmeni datum polaska</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Broj dana: </label>
    <input type="number" class="form-control aler alert-danger" v-model="aranzman.broj_dana" required>
    <div class="form-text"><i>Izmeni broj dana</i></div>
</div>
<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
    data(){
        return {
            aranzman: {},
            smestaji:{}
        }
    },
    methods:{
        refresh(){
            axios.get(`api/aranzmani/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datum_polaska = new Date(response.data.datum_polaska).toISOString().split("Z")[0];
            
                this.aranzman = response.data;
            });
            ///smestaj
            axios.get("api/smestaji").then((response) => {
                this.smestaji = response.data;
            });
        },
        update(){
            axios.put(`api/aranzmani/${this.$route.params['id']}`, this.aranzman).then((response) => {
                this.$router.push("/aranzmani");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}