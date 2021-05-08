import ProdajaKnjiga from './components/prodajaKnjiga.js'

//Korisnik
import TabelaKorisnika from './components/tabelaKorisnika.js'
import KorisnikForma from './components/korisnikForma.js'

//Kupac
import TabelaKupca from './components/tabelaKupca.js'
import KupacForma from './components/kupacForma.js'

//Knjiga
import TabelaKnjiga from './components/tabelaKnjiga.js'
import KnjigaForma from './components/knjigaForma.js'


//Iznajmljivanje
import TabelaIznajmljivanja from './components/tabelaIznajmljivanja.js'
import IznajmljivanjeForma from './components/iznajmljivanjeForma.js'

//Porudzbina
import TabelaPorudzbine from './components/tabelaPorudzbine.js'
import PorudzbinaForma from './components/porudzbinaForma.js'

const app = Vue.createApp(ProdajaKnjiga);
app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-form', KorisnikForma);

app.component('tabela-kupca', TabelaKupca);
app.component('kupac-form', KupacForma);

app.component('tabela-knjiga', TabelaKnjiga);
app.component('knjiga-form', KnjigaForma);

app.component('tabela-iznajmljivanja', TabelaIznajmljivanja);
app.component('iznajmljivanje-form', IznajmljivanjeForma);

app.component('tabela-porudzbine', TabelaPorudzbine);
app.component('porudzbina-form', PorudzbinaForma);

app.mount("#app");