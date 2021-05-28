
import TabelaTurista from './components/table/tabelaTurista.js'
import TuristaForma from './components/form/turistaForma.js'

import TabelaAranzmana from './components/table/tabelaAranzmana.js'
import AranzmanForma from './components/form/aranzmanForma.js'

import TabelaProdaje from './components/table/tabelaProdaje.js'
import ProdajaForma from './components/form/prodajaForma.js'

///Razdvajanje componenti
import Turisti from './components/main-js/turisti.js'
import TuristaId from './components/main-js/turista_id.js'

import Aranzmani from './components/main-js/aranzmani.js'
import AranzmanId from './components/main-js/aranzman_id.js'

import Prodaja from './components/main-js/prodaja.js'
import ProdajaId from './components/main-js/prodaja_id.js'

///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Turisti},///Prikaz za kupce
        {path: "/:id", component: TuristaId},//Pojedinacan prikaz

        {path: "/aranzmani", component: Aranzmani},///Prikaz za kupce
        {path: "/aranzmani/:id", component: AranzmanId},//Pojedinacan prikaz

        {path: "/prodaje", component: Prodaja},///Prikaz za kupce
        {path: "/prodaje/:id", component: ProdajaId},//Pojedinacan prikaz

    ],
});

const app = Vue.createApp({});

app.component('tabela-turista', TabelaTurista);
app.component('turista-forma', TuristaForma);

app.component('tabela-aranzmana', TabelaAranzmana);
app.component('aranzman-forma', AranzmanForma);

app.component('tabela-prodaje', TabelaProdaje);
app.component('prodaja-forma', ProdajaForma);

app.use(router);
app.mount("#app");