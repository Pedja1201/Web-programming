////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
    <form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
    <p><b>-Izmena polise</b></p>
    <div class="mb-3">
    <label class="form-label">Automobil ID: </label>
    <select class="form-select aler alert-danger" v-model="polisa.automobil_id" required>
        <option v-for="auto in automobili" :value="auto.id">-{{auto.registarski_broj}}, {{auto.marka}},{{auto.model}},{{auto.zapremina_motora}}}</option>
    </select>
    <div class="form-text"><i>Izaberi automobil</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Osiguravajuca kuca ID: </label>
    <select class="form-select aler alert-danger" v-model="polisa.osiguravajuca_kuca_id" required>
        <option v-for="kuca in osiguravajuceKuce" :value="kuca.id">-{{kuca.naziv}}</option>
    </select>
    <div class="form-text"><i>Izaberi osiguravajucu kucu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum pocetka: </label>
    <input type="datetime-local" class="form-control aler alert-danger" v-model="polisa.datum_pocetka" required>
    <div class="form-text"><i>Uneti datum pocetka</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Datum kraja: </label>
    <input type="datetime-local" class="form-control aler alert-danger" v-model="polisa.datum_kraja" required>
    <div class="form-text"><i>Uneti datum kraja</i></div>
</div>

<div class="mb-3">
    <label class="form-label">Cena: </label>
    <input type="number" class="form-control aler alert-secondary" v-model="polisa.cena" required>
    <div class="form-text"><i>Uneti cenu</i></div>
</div>
    <div>
        <button type="submit" class="btn btn-info">Izmeni</button>
    </div>
    </form>
    `,
    data(){
        return {
            polisa: {},
            automobili:{}, ///za select
            osiguravajuceKuce:{},///za select
        }
    },
    methods:{
        refresh(){
            axios.get(`api/polise/${this.$route.params['id']}`).then((response) => {
                ///Datum pretvaramo u ISO-novoo
                response.data.datum_pocetka = new Date(response.data.datum_pocetka).toISOString().split("Z")[0];
                response.data.datum_kraja = new Date(response.data.datum_kraja).toISOString().split("Z")[0];
            
                this.polisa = response.data;
            });
            //Select opcija-novoo
            axios.get("api/automobili").then((response) => {
                this.automobili = response.data;
            });
            axios.get("api/osiguravajuceKuce").then((response) => {
                this.osiguravajuceKuce = response.data;
             });
        },
        update(){
            axios.put(`api/polise/${this.$route.params['id']}`, this.polisa).then((response) => {
                this.$router.push("/polise");
            });
        },
    },

    
    created(){
        this.refresh();

    }
}