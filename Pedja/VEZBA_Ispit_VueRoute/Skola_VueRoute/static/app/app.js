////Import tabela i formi
import TabelaNastavnika from './components/table/tabelaNastavnika.js'
import NastavnikForma from './components/form/nastavnikForma.js'

import TabelaPredmeta from './components/table/tabelaPredmeta.js'
import PredmetForma from './components/form/predmetForma.js'

import TabelaSkole from './components/table/tabelaSkole.js'
import SkolaForma from './components/form/skolaForma.js'

////Razdvojene componente - "main-js"
import Nastavnici from './components/main-js/nastavnici.js'
import NastavnikId from './components/main-js/nastavnik_id.js'

import Predmeti from './components/main-js/predmeti.js'
import PredmetId from './components/main-js/predmet_id.js'

import Skole from './components/main-js/skole.js'
import SkolaId from './components/main-js/skola_id.js'


///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Nastavnici},///Prikaz za rutiranje
        {path: "/:licni_id", component: NastavnikId},//Pojedinacan prikaz

        {path: "/predmeti", component: Predmeti},///Prikaz rute
        {path: "/predmeti/:id", component: PredmetId},//Pojedinacan prikaz

        {path: "/skole", component: Skole},///Prikaz rute
        {path: "/skole/:id", component: SkolaId},//Pojedinacan prikaz
    ],
});



const app = Vue.createApp({});
app.component('tabela-nastavnika', TabelaNastavnika);
app.component('nastavnik-form', NastavnikForma);

app.component('tabela-predmeta', TabelaPredmeta);
app.component('predmet-form', PredmetForma);

app.component('tabela-skole', TabelaSkole);
app.component('skola-form', SkolaForma);

app.use(router);
app.mount("#app");