import Rezervacije from './components/rezervacije.js'
import TabelaKorisnika from './components/tabelaKorisnika.js'
import KorisnikForma from './components/korisnikForma.js'
import TabelaHotela from './components/tabelaHotela.js'
import HotelForma from './components/hotelForma.js'
import TabelaRezervacije from './components/tabelaRezervacije.js'
import RezervacijaForma from './components/rezervacijaForma.js'

const app = Vue.createApp(Rezervacije);
app.component('tabela-korisnika',TabelaKorisnika);
app.component('korisnik-forma', KorisnikForma );
app.component('tabela-hotela',TabelaHotela);
app.component('hotel-forma', HotelForma );
app.component('tabela-rez',TabelaRezervacije);
app.component('rez-forma', RezervacijaForma );
app.mount("#app");