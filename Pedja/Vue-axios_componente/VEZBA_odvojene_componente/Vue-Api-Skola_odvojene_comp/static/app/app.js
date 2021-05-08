import Skola from './components/skola.js'

import TabelaNastavnika from './components/tabelaNastavnika.js'
import NastavnikForma from './components/nastavnikForma.js'

import TabelaPredmeta from './components/tabelaPredmeta.js'
import PredmetForma from './components/predmetForma.js'

import TabelaSkole from './components/tabelaSkole.js'
import SkolaForma from './components/skolaForma.js'


const app = Vue.createApp(Skola);
app.component('tabela-nastavnika', TabelaNastavnika);
app.component('nastavnik-form', NastavnikForma);
app.component('tabela-predmeta', TabelaPredmeta);
app.component('predmet-form', PredmetForma);
app.component('tabela-skole', TabelaSkole);
app.component('skola-form', SkolaForma);


app.mount("#app");