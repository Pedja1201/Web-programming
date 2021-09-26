////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena prodaje</b></p>
<div class="mb-3">
    <label class="form-label">Aranzman ID: </label>
    <select class="form-select aler alert-danger" v-model="prodaja.aranzman_id" required>
        <option v-for="aranzman in aranzmani" :value="aranzman.id">-{{aranzman.smestaj_id}}, {{aranzman.cena}}, {{aranzman.datum_polaska}}, {{aranzman.broj_dana}}</option>
    </select>
    <div class="form-text"><i>Izaberi aranzman</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Turista ID: </label>
    <select class="form-select aler alert-danger" v-model="prodaja.turista_id" required>
        <option v-for="turista in turisti" :value="turista.id">-{{turista.ime}}, {{turista.prezime}}, {{turista.datum_rodjenja}}, {{turista.maticni_broj}}</option>
    </select>
    <div class="form-text"><i>Izaberi turistu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Način plaćanja: </label>
    <input type="text" class="form-control aler alert-danger" v-model="prodaja.nacin_placanja" required>
    <div class="form-text"><i>Izmeni način plaćanja</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum plaćanja: </label>
    <input type="datetime-local" class="form-control aler alert-danger" v-model="prodaja.datum_placanja" required>
    <div class="form-text"><i>Izmeni datum plaćanja</i></div>
</div>
<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
    data(){
        return {
            prodaja: {},
            turisti:{}, ///select opcija
            aranzmani:[], ////select opcija
        }
    },
    methods:{
        refresh(){
            axios.get(`api/prodaje/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datum_placanja = new Date(response.data.datum_placanja).toISOString().split("Z")[0];
                this.prodaja = response.data;
            });
            ///Select opcija-novo
            axios.get("api/aranzmani").then((response) => {
                this.aranzmani = response.data;
             });
             axios.get("api/turisti").then((response) => {
                this.turisti = response.data;
            });
        },
        update(){
            axios.put(`api/prodaje/${this.$route.params['id']}`, this.prodaja).then((response) => {
                this.$router.push("/prodaje");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}