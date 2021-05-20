import Radnici from './components/radnici.js'

import TabelaRadnika from './components/tabelaRadnika.js'
import RadnikForma from './components/radnikForma.js'

import TabelaRadnogMesta from './components/tabelaRadnoMesto.js'
import RadnoMestoForma from './components/radnoMestoForma.js'

import TabelaAngazovanja from './components/tabelaAngazovanja.js'
import AngazovanjeForma from './components/angazovanjeForma.js'


const app = Vue.createApp(Radnici);
app.component('tabela-radnika', TabelaRadnika);
app.component('radnik-form', RadnikForma);

app.component('tabela-radnog-mesta', TabelaRadnogMesta);
app.component('radno-mesto-form', RadnoMestoForma);

app.component('tabela-angazovanja', TabelaAngazovanja);
app.component('angazovanje-form', AngazovanjeForma);

app.mount("#app")
