
import TabelaStudenata from './components/table/tabelaStudenta.js'
import StudentForma from './components/form/studentForma.js'

import TabelaPredmeta from './components/table/tabelaPredmeta.js'
import PredmetForma from './components/form/predmetForma.js'

import TabelaPolaganja from './components/table/tabelaPolaganja.js'
import PolaganjeForma from './components/form/polaganjeForma.js'


///Razdvojene componente
import Studenti from './components/main-js/studenti.js'
import StudentId from './components/main-js/student_id.js'

import Predmeti from './components/main-js/predmeti.js'
import PredmetId from './components/main-js/predmet_id.js'

import Polaganja from './components/main-js/polaganja.js'
import PolaganjeId from './components/main-js/polaganje_id.js'


///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Studenti},///Prikaz za kupce
        {path: "/:brojIndeksa", component: StudentId},//Pojedinacan prikaz

        {path: "/predmeti", component: Predmeti},///Prikaz za kupce
        {path: "/predmeti/:id", component: PredmetId},//Pojedinacan prikaz

        {path: "/polaganja", component: Polaganja},///Prikaz za kupce
        {path: "/polaganja/:id", component: PolaganjeId},//Pojedinacan prikaz

    ],
});

const app = Vue.createApp({});

app.component('tabela-studenata', TabelaStudenata);
app.component('student-form', StudentForma);

app.component('tabela-predmeta', TabelaPredmeta);
app.component('predmet-form', PredmetForma);

app.component('tabela-polaganja', TabelaPolaganja);
app.component('polaganje-form', PolaganjeForma);

app.use(router);
app.mount("#app");