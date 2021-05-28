///Componente sa rutiranjem!
import TabelaRadnika from './components/tabelaRadnika.js'
import RadnikForma from './components/radnikForma.js'

import TabelaRadnogMesta from './components/tabelaRadnoMesto.js'
import RadnoMestoForma from './components/radnoMestoForma.js'

import TabelaAngazovanja from './components/tabelaAngazovanja.js'
import AngazovanjeForma from './components/angazovanjeForma.js'

////Razdvajanje compnenti
import Radnici from './components/radnici.js'
import Radnik from './components/radnik.js'

import RadnaMesta from './components/radna_mesta.js'
import Mesto from './components/mesto.js'

import Angazovanje from './components/angazovanje.js'
import Angaz from './components/angaz_id.js'

///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Radnici},///Prikaz za kupce
        {path: "/:id", component: Radnik},//Pojedinacan prikaz

        {path: "/radnaMesta", component: RadnaMesta},///Prikaz za kupce
        {path: "/radnaMesta/:id", component: Mesto},//Pojedinacan prikaz

        {path: "/angazovanja", component: Angazovanje},///Prikaz za kupce
        {path: "/angazovanja/:id", component: Angaz},//Pojedinacan prikaz
    ],
});

const app = Vue.createApp({});
app.component('tabela-radnika', TabelaRadnika);
app.component('radnik-form', RadnikForma);

app.component('tabela-radnog-mesta', TabelaRadnogMesta);
app.component('radno-mesto-form', RadnoMestoForma);

app.component('tabela-angazovanja', TabelaAngazovanja);
app.component('angazovanje-form', AngazovanjeForma);

app.use(router);
app.mount("#app")
