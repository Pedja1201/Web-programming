import Prijava from './components/prijava.js'

import TabelaKorisnika from './components/tabelaKorisnika.js'
import KorisnikForma from './components/korisnikForma.js'


import TabelaPrijave from './components/tabelaPrijave.js'
import PrijavaForma from './components/prijavaForma.js'


const app = Vue.createApp(Prijava);
app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-form', KorisnikForma);

app.component('tabela-prijave', TabelaPrijave);
app.component('prijava-form', PrijavaForma);


app.mount("#app");