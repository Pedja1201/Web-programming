import Prodaja from './components/prodaja.js'

import TabelaTurista from './components/tabelaTurista.js'
import TuristaForma from './components/turistaForma.js'

import TabelaAranzmana from './components/tabelaAranzmana.js'
import AranzmanForma from './components/aranzmanForma.js'

import TabelaProdaje from './components/tabelaProdaje.js'
import ProdajaForma from './components/prodajaForma.js'



const app = Vue.createApp(Prodaja);

app.component('tabela-turista', TabelaTurista);
app.component('turista-forma', TuristaForma);

app.component('tabela-aranzmana', TabelaAranzmana);
app.component('aranzman-forma', AranzmanForma);

app.component('tabela-prodaje', TabelaProdaje);
app.component('prodaja-forma', ProdajaForma);


app.mount("#app");