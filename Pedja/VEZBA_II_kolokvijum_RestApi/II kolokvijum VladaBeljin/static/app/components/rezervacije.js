export default {
    data(){
        return {
            korisnici:[],
            hoteli:[],
            rezervacije:[],

            hotelZaIzmenu:{},
            korisnikZaIzmenu:{},
            rezervacijaZaIzmenu:{},

        }
    },
    methods:{
        setKorisnikZaIzmenu(korisnik){
            this.korisnikZaIzmenu = {...korisnik};
        },
        setHotelZaIzmenu(hotel){ 
            this.hotelZaIzmenu = {...hotel};
        },
        setRezervacijaZaIzmenu(rezervacija){ 
            this.rezervacijaZaIzmenu = {...rezervacija};
        },
        
        

        refreshKorisnik(){
            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
        },
        refreshHotel(){
           axios.get("api/hoteli").then((response) => {
               this.hoteli = response.data;
           });
        },
        refreshRezervacija(){
            axios.get("api/rezervacije").then((response) => {
                for(let d of response.data) {
                    d.datum_rezervacije = new Date(d.datum_rezervacije).toISOString().split("Z")[0];
                    d.rok = new Date(d.rok).toISOString().split("Z")[0];
                    d.datum_odlaska = new Date(d.datum_odlaska).toISOString().split("Z")[0];
                }
                this.rezervacije = response.data;
            });

            axios.get("api/korisnici").then((response) => {
                this.korisnici = response.data;
            });
            axios.get("api/hoteli").then((response) => {
                this.hoteli = response.data;
            });

        },
        

        createKorisnik(korisnik){
            axios.post("api/korisnici", korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        createHotel(hotel){
            axios.post("api/hoteli", hotel).then((response) => {
                this.refreshHotel();
            });
        },
        createRezervacija(rezervacija){
            axios.post("api/rezervacije", rezervacija).then((response) => {
                this.refreshRezervacija();
            });
        },
               

        updateKorisnik(korisnik){
            axios.put(`api/korisnici/${korisnik.id}`, korisnik).then((response) => {
                this.refreshKorisnik();
            });
        },
        updateHotel(hotel){
            axios.put(`api/hoteli/${hotel.id}`, hotel).then((response) => {
                this.refreshHotel();
            });
        },
        updateRezervacija(rezervacija){
            axios.put(`api/rezervacije/${rezervacija.id}`, rezervacija).then((response) => {
                this.refreshRezervacija();
            });
        },
       
    
        removeKorisnik(id){
            axios.delete(`api/korisnici/${id}`).then((response) => {
                this.refreshKorisnik();
            });
        },

        removeHotel(id){
            axios.delete(`api/hoteli/${id}`).then((response) => {
                this.refreshHotel();
            });
        },

        removeRezervacija(id){
            axios.delete(`api/rezervacije/${id}`).then((response) => {
                this.refreshRezervacija();
            });
        },
        
        
    
    },
    created(){
        this.refreshKorisnik();
        this.refreshHotel();
        this.refreshRezervacija();
        
    }
}