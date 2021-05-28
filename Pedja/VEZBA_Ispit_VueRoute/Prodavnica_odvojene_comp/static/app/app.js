
import TabelaKupaca from './components/table/tabelaKupca.js'
import KupacForma from './components/form/kupacForma.js'

import TabelaProizvoda from './components/table/tabelaProizvoda.js'
import ProizvodForma from './components/form/proizvodForma.js';

import TabelaKupovine from './components/table/tabelaKupovine.js'
import KupovinaForma from './components/form/kupovinaForma.js';


///Razdvajanje componenti
import Kupci from './components/main-js/kupci.js'
import KupacId from './components/main-js/kupac_id.js'

import Proizvodi from './components/main-js/proizvodi.js'
import ProizvodId from './components/main-js/proizvod_id.js'

import Kupovina from './components/main-js/kupovina.js'
import KupovinaId from './components/main-js/kupovina_id.js'

///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Kupci},///Prikaz za kupce
        {path: "/:id", component: KupacId},//Pojedinacan prikaz

        {path: "/proizvodi", component: Proizvodi},///Prikaz za kupce
        {path: "/proizvodi/:id", component: ProizvodId},//Pojedinacan prikaz

        {path: "/kupovine", component: Kupovina},///Prikaz za kupce
        {path: "/kupovine/:broj", component: KupovinaId},//Pojedinacan prikaz

    ],
});


const app = Vue.createApp({});

app.component('tabela-kupaca', TabelaKupaca);
app.component('kupac-forma', KupacForma);

app.component('tabela-proizvoda', TabelaProizvoda);
app.component('proizvod-forma', ProizvodForma);

app.component('tabela-kupovine', TabelaKupovine);
app.component('kupovina-forma', KupovinaForma);

app.use(router);
app.mount("#app");