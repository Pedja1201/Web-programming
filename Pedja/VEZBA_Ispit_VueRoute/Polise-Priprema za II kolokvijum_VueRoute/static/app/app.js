
import TabelaAutomobila from './components/table/tabelaAutomobila.js'
import AutomobilForma from './components/form/automobilForma.js'


import TabelaKuce from './components/table/tabelaKuce.js'
import KucalForma from './components/form/kucaForma.js'

import TabelaPolise from './components/table/tabelaPolise.js'
import PolisaForma from './components/form/polisaForma.js'

///Razdvajanje componenti
import Automobili from './components/main-js/automobili.js'
import AutoId from './components/main-js/auto_id.js'

import OsiguravajuceKuce from './components/main-js/osiguravajuceKuce.js'
import KucaId from './components/main-js/kuca_id.js'

import Polise from './components/main-js/polise.js'
import PolisaId from './components/main-js/polisa_id.js'

///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Automobili},///Prikaz za kupce
        {path: "/:id", component: AutoId},//Pojedinacan prikaz

        {path: "/osiguravajuceKuce", component: OsiguravajuceKuce},///Prikaz za kupce
        {path: "/osiguravajuceKuce/:id", component: KucaId},//Pojedinacan prikaz

        {path: "/polise", component: Polise},///Prikaz za kupce
        {path: "/polise/:id", component: PolisaId},//Pojedinacan prikaz
    ],
  });


const app = Vue.createApp({});

app.component('tabela-automobila', TabelaAutomobila);
app.component('automobil-forma', AutomobilForma);


app.component('tabela-kuca', TabelaKuce);
app.component('kuca-forma', KucalForma);

app.component('tabela-polise', TabelaPolise);
app.component('polisa-forma', PolisaForma);

app.use(router)
app.mount("#app");