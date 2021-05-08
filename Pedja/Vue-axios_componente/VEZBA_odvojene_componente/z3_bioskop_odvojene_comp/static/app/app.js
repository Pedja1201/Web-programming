import Bioskop from './components/bioskop.js'

import TabelaKarte from './components/tabelaKarata.js'
import KartaForma from './components/kartaForma.js'

import TabelaBlagajne from './components/tabelaBlagajne.js'
import BlagajnaForma from './components/blagajnaForma.js'

const app = Vue.createApp(Bioskop);
app.component('tabela-karte', TabelaKarte);
app.component('karta-form', KartaForma);

app.component('tabela-blagajne', TabelaBlagajne);
app.component('blagajna-form', BlagajnaForma);

app.mount("#app");