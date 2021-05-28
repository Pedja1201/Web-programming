///Razdbajanje componenti
import TabelaAuto from './components/tabelaAuto.js'
import AutoForma from './components/autoForma.js'

import TabelaNike from './components/tabelaNike.js'
import NikeForma from './components/nikeForma.js'

import TabelaKorisnika from './components/tabelaKorisnika.js'
import KorisnikForma from './components/korisnikForma.js'
//Razdvojene componente
import Auto from './components/auto.js'
import AutoId from './components/auto_id.js'

import Nike from './components/nike.js'
import NikeId from './components/nike_id.js'

import Korisnici from './components/korisnici.js'
import KorisnikId from './components/korisnik_id.js'



///Rutiranje entiteta
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: "/", component: Auto},///Prikaz za kupce
        {path: "/:tablice", component: AutoId},//Pojedinacan prikaz

        {path: "/nike", component: Nike},///Prikaz za kupce
        {path: "/nike/:id", component: NikeId},//Pojedinacan prikaz

        {path: "/korisnici", component: Korisnici},///Prikaz za kupce
        {path: "/korisnici/:id", component: KorisnikId},//Pojedinacan prikaz


    ],
  });


const app = Vue.createApp({});

app.component('tabela-auto', TabelaAuto);
app.component('auto-form', AutoForma);

app.component('tabela-nike', TabelaNike);
app.component('nike-form', NikeForma);

app.component('tabela-korisnika', TabelaKorisnika);
app.component('korisnik-form', KorisnikForma);

app.use(router);
app.mount("#app");