import Transakcija from './components/transakcija.js'

import TabelaArtikla from './components/tabelaArtikla.js'
import ArtiklForma from './components/artiklforma.js'

import TabelaTransakcije from './components/tabelaTransakcije.js'
import TransakcijaForma from './components/transakcijaForma.js'


const app = Vue.createApp(Transakcija);

app.component('tabela-artikla', TabelaArtikla);
app.component('artikl-forma', ArtiklForma);

app.component('tabela-transakcija', TabelaTransakcije);
app.component('transakcija-forma', TransakcijaForma);



app.mount("#app");