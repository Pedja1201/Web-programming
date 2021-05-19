import Radnici from './components/radnici.js'

import TabelaRadnika from './components/tabelaRadnika.js'
import RadnikForma from './components/radnikForma.js'


import TabelaRadnogMesta from './components/tabelaRadnogMesta.js'
import RadnoMestoForma from './components/radnoMestoForma.js'

import TabelaAngazovanja from './components/tabelaAngazovanja.js'
import AngazovanjeForma from './components/angazovanjeForma.js'


const app = Vue.createApp(Radnici);

app.component('tabela-radnika', TabelaRadnika);
app.component('radnik-forma', RadnikForma);

app.component('tabela-mesta', TabelaRadnogMesta);
app.component('mesto-forma', RadnoMestoForma);

app.component('tabela-angazovanja', TabelaAngazovanja);
app.component('angazovanje-forma', AngazovanjeForma);


app.mount("#app");