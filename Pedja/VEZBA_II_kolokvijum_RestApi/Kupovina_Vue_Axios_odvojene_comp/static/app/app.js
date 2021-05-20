import Kupovina from './components/kupovina.js'

import TabelaAuto from './components/tabelaAuto.js'
import AutoForma from './components/autoForma.js'

import TabelaNike from './components/tabelaNike.js'
import NikeForma from './components/nikeForma.js'

import TabelaKorisnika from './components/tabelaKorisnika.js'
import KorisnikForma from './components/korisnikForma.js'


const app = Vue.createApp(Kupovina);

app.component('tabela-auto', TabelaAuto);
app.component('auto-form', AutoForma);

app.component('tabela-nike', TabelaNike);
app.component('nike-form', NikeForma);

app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-form', KorisnikForma);

app.mount("#app");