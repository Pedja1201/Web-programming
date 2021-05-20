import StudentskaSluzba from './components/studenstka_sluzba.js'

import TabelaStudenata from './components/tabelaStudenta.js'
import StudentForma from './components/studentForma.js'

import TabelaPredmeta from './components/tabelaPredmeta.js'
import PredmetForma from './components/predmetForma.js'

import TabelaPolaganja from './components/tabelaPolaganja.js'
import PolaganjeForma from './components/polaganjeForma.js'



const app = Vue.createApp(StudentskaSluzba);

app.component('tabela-studenata', TabelaStudenata);
app.component('student-form', StudentForma);

app.component('tabela-predmeta', TabelaPredmeta);
app.component('predmet-form', PredmetForma);

app.component('tabela-polaganja', TabelaPolaganja);
app.component('polaganje-form', PolaganjeForma);


app.mount("#app");