import Knjizara from './components/knjizara.js'

import TabelaKorisnika from './components/tabelaKorisnika.js'
import KorisnikForma from './components/korisnikForma.js'

import TabelaKnjige from './components/tabelaKnjiga.js'
import KnjigaForma from './components/knjigaForma.js'

import TabelaIznajmljivanja from './components/tabelaIznajmljivanja.js'
import IznajmljivanjeForma from './components/iznajmljivanjeForma.js'

const app = Vue.createApp(Knjizara);

app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-forma', KorisnikForma);

app.component('tabela-knjiga', TabelaKnjige);
app.component('knjiga-forma', KnjigaForma);

app.component('tabela-iznajmljivanja', TabelaIznajmljivanja);
app.component('iznajmljivanje-forma', IznajmljivanjeForma);



app.mount("#app");