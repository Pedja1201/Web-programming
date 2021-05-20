import Prodavnica from './components/prodavnica.js'

import TabelaKupaca from './components/tabelaKupca.js'
import KupacForma from './components/kupacForma.js'

import TabelaProizvoda from './components/tabelaProizvoda.js'
import ProizvodForma from './components/proizvodForma.js';

import TabelaKupovine from './components/tabelaKupovine.js'
import KupovinaForma from './components/kupovinaForma.js';



const app = Vue.createApp(Prodavnica);

app.component('tabela-kupaca', TabelaKupaca);
app.component('kupac-forma', KupacForma);

app.component('tabela-proizvoda', TabelaProizvoda);
app.component('proizvod-forma', ProizvodForma);

app.component('tabela-kupovine', TabelaKupovine);
app.component('kupovina-forma', KupovinaForma);


app.mount("#app");