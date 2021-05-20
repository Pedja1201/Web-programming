import Polisa from './components/polise.js'

import TabelaAutomobila from './components/tabelaAutomobila.js'
import AutomobilForma from './components/automobilForma.js'


import TabelaKuce from './components/tabelaKuce.js'
import KucalForma from './components/kucaForma.js'

import TabelaPolise from './components/tabelaPolise.js'
import PolisaForma from './components/polisaForma.js'


const app = Vue.createApp(Polisa);

app.component('tabela-automobila', TabelaAutomobila);
app.component('automobil-forma', AutomobilForma);


app.component('tabela-kuca', TabelaKuce);
app.component('kuca-forma', KucalForma);

app.component('tabela-polise', TabelaPolise);
app.component('polisa-forma', PolisaForma);


app.mount("#app");