export default {
    data(){
        return {
            studenti:[],
            predmeti:[],
            polaganja:[],
            studentZaIzmenu:{},
            predmetZaIzmenu:{},
            polaganjeZaIzmenu:{},

            stranicaZaPrikaz: "",
        }
    },
    methods:{
        setStudentZaIzmenu(student){ //skladistenje nakon izmene//
            this.studentZaIzmenu = {...student};
        },
        setPredmetZaIzmenu(predmet){ //skladistenje nakon izmene//
            this.predmetZaIzmenu = {...predmet};
        },
        setPolaganjeZaIzmenu(polaganje){ //skladistenje nakon izmene//
            this.polaganjeZaIzmenu = {...polaganje};
        },

        refreshStudent(){
             //saljem this van funkcije da obuhvata sve//
            axios.get("api/studenti").then((response) => {
                this.studenti = response.data;
            });
        },
        refreshPredmet(){
            //saljem this van funkcije da obuhvata sve//
            axios.get("api/predmeti").then((response) => {
               this.predmeti = response.data;
            });
        },
        refreshPolaganje(){
            axios.get("api/polaganja").then((response) => {
                ///Datum pretvaramo u ISO-novoo
                for(let d of response.data) {
                    d.datum = new Date(d.datum).toISOString().split("Z")[0];
                }
                this.polaganja = response.data;
            });
            ///Select opcija-novo!!!!
            axios.get("api/studenti").then((response) => {
                this.studenti = response.data;
            });
            axios.get("api/predmeti").then((response) => {
                this.predmeti = response.data;
            });
        },

        //dodavanje//
        createStudent(student){
            axios.post("api/studenti", student).then((response) => {
                this.refreshStudent();
            });
        },
        createPredmet(predmet){
            axios.post("api/predmeti", predmet).then((response) => {
                this.refreshPredmet();
            });
        },
        createPolaganje(polaganje){
            axios.post("api/polaganja", polaganje).then((response) => {
                this.refreshPolaganje();
            });
        },

        //izmena//
        updateStudent(student){
            axios.put(`api/studenti/${student.brojIndeksa}`, student).then((response) => {
                this.refreshStudent();
            });
        },
        updatePredmet(predmet){
            axios.put(`api/predmeti/${predmet.id}`, predmet).then((response) => {
                this.refreshPredmet();
            });
        },
        updatePolaganje(polaganje){
            axios.put(`api/polaganja/${polaganje.id}`, polaganje).then((response) => {
                this.refreshPolaganje();
            });
        },

        //brisanje//
        removeStudent(brojIndeksa){
            axios.delete(`api/studenti/${brojIndeksa}`).then((response) => {
                this.refreshStudent();
            });
        },
        removePredmet(id){
            axios.delete(`api/predmeti/${id}`).then((response) => {
                this.refreshPredmet();
            });
        },
        removePolaganje(id){
            axios.delete(`api/polaganja/${id}`).then((response) => {
                this.refreshPolaganje();
            });
        },

        navigate(page){
            this.stranicaZaPrikaz = page;
        }
    },
    created(){
        this.refreshStudent();
        this.refreshPredmet();
        this.refreshPolaganje();
    }
}