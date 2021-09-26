////Prikaz jednog proizvoda i mogucnost izmene
export default {
    template:`
<form v-on:submit.prevent="update" class="w-85 p-3 m-3 container fade-in" id="boja4">
<p><b>-Izmena korpe</b></p>
<div class="mb-3">
    <label class="form-label">Igrica ID: </label>
    <select class="form-select" v-model="korpa.igrica_id" required>
        <option v-for="igrica in igrice" :value="igrica.id">-{{igrica.naziv}}, {{igrica.cena}}, {{igrica.zanr}},{{igrica.konzola_id}}</option>
    </select>
    <div class="form-text"><i>Izaberi igricu</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Količina: </label>
    <input type="text" class="form-control" v-model="korpa.kolicina" required>
    <div class="form-text"><i>Izmeni količina</i></div>
</div>
<div class="mb-3">
    <label class="form-label">Datum: </label>
    <input type="datetime-local" class="form-control" v-model="korpa.datum" required>
    <div class="form-text"><i>Izmeni datum</i></div>
</div>

<div>
    <button type="submit" class="btn btn-info">Izmeni</button>
</div>
</form>
    `,
    data(){
        return {
            korpa: {},
            igrice:[]
        }
    },
    methods:{
        refresh(){
            axios.get(`api/korpe/${this.$route.params['id']}`).then((response) => {
                response.data.datum = new Date(response.data.datum).toISOString().split("Z")[0];

                this.korpa = response.data;
            });
            axios.get("api/igrice").then((response) => {
                this.igrice = response.data;
            });

        },
        update(){
            axios.put(`api/korpe/${this.$route.params['id']}`, this.korpa).then((response) => {
                this.$router.push("/korpe");
            });
        }
    },

    
    created(){
        this.refresh();

    }
}