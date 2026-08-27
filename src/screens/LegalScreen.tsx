import { ArrowLeft } from "lucide-react";

export type LegalDoc = "terms" | "privacy" | "contact";

const DOCS: Record<LegalDoc, { title: string; body: string }> = {
  terms: {
    title: "Opći uvjeti poslovanja",
    body: `
1. Pružatelj usluge

Ime: Dr. Szonja Katalin Krizsán (privatna osoba)
Prebivalište: Torony, Mađarska
E-mail: szonjakrizsan@gmail.com

2. Predmet usluge

Apartman Asistent je web aplikacija namijenjena podršci
vlasnicima apartmana za iznajmljivanje.
Aplikacija posebice omogućuje objedinjavanje kalendara
rezervacija (iCal) s različitih platformi za rezervacije,
kao i upravljanje rezervacijama, dnevnim zadacima i
podacima o gostima.
Opseg funkcija može se tijekom beta faze u bilo kojem
trenutku proširiti, izmijeniti ili ograničiti.

3. Registracija i korištenje

Korištenje usluge pretpostavlja registraciju.
Registracijom korisnica odnosno korisnik potvrđuje da je
pročitao/la i prihvatio/la ove Opće uvjete poslovanja te
Izjavu o zaštiti podataka.
Apartman Asistent trenutno se nalazi u besplatnoj beta
fazi.
Naplatna pretplata bit će uvedena najranije nakon
službenog pokretanja proizvoda. Registrirani korisnici
bit će obaviješteni e-poštom najmanje 14 dana prije
uvođenja naplatnih usluga.

4. Dostupnost usluge

Pružatelj usluge nastoji uslugu pružati što je moguće bez
prekida.
Međutim, ne postoji pravo na neprekidnu ili bezgrešnu
dostupnost.
Posebice, održavanje, tehnički kvarovi ili utjecaji
trećih strana mogu privremeno ograničiti dostupnost.

5. Odgovornost

Apartman Asistent obrađuje podatke koje putem iCal
sučelja dostavljaju vanjske platforme za rezervacije
(npr. Airbnb ili Booking.com).
Za potpunost, ažurnost i točnost tih podataka odgovorna
je isključivo dotična platforma.
U mjeri dopuštenoj zakonom, pružatelj usluge ne odgovara
za štetu nastalu zbog netočnih, nepotpunih ili sa
zakašnjenjem dostavljenih podataka povezanih platformi.
Usluga se tijekom beta faze pruža u razvojnoj fazi, zbog
čega može doći do tehničkih pogrešaka, privremenih
ograničenja ili promjena pojedinih funkcionalnosti. To ne
utječe na prava korisnika koja proizlaze iz obveznih
zakonskih propisa.
Odgovornost za namjeru i grubu nepažnju te odgovornost
prema obveznim zakonskim propisima ostaje nepromijenjena.

6. Otkazivanje i brisanje računa

Korisnica odnosno korisnik može u bilo kojem trenutku bez
navođenja razloga obrisati korisnički račun.
Brisanjem računa brišu se svi pohranjeni osobni podaci,
osim ako tome ne stoje na putu zakonske obveze čuvanja.

7. Izmjene ovih Općih uvjeta

Pružatelj usluge zadržava pravo prilagodbe ovih Općih
uvjeta poslovanja, ako je to potrebno zbog tehničkih,
pravnih ili organizacijskih promjena.
O bitnim izmjenama registrirani korisnici bit će
pravovremeno obaviješteni e-poštom.

8. Mjerodavno pravo

Za ove uvjete korištenja mjerodavno je pravo Mađarske, uz
isključenje Bečke konvencije o međunarodnoj prodaji robe,
osim ako se tome ne protive obvezni zakonski propisi o
zaštiti potrošača.

9. Završne odredbe

Ako pojedine odredbe ovih Općih uvjeta poslovanja u
cijelosti ili djelomično postanu nevažeće, valjanost
preostalih odredbi ostaje nepromijenjena.

Vrijedi od: lipnja 2026.
`,
  },
  privacy: {
    title: "Izjava o zaštiti podataka",
    body: `
1. Voditelj obrade

Voditelj obrade osobnih podataka u vezi s korištenjem
usluge Apartman Asistent je:

Dr. Szonja Katalin Krizsán
Torony, Mađarska
E-mail: szonjakrizsan@gmail.com

Za pitanja povezana sa zaštitom osobnih podataka ili za
ostvarivanje prava ispitanika možete se obratiti na
navedenu adresu e-pošte.

2. Koje osobne podatke obrađujemo?

Ovisno o načinu korištenja usluge, Apartman Asistent može
obrađivati sljedeće kategorije osobnih podataka:

Podaci povezani s korisničkim računom
- ime i prezime, ako ih korisnik unese
- e-mail adresa
- podaci potrebni za autentifikaciju korisničkog računa
- podaci o korištenju usluge i tehnički podaci potrebni
  za sigurnost i rad sustava

Podaci koje korisnik unosi u aplikaciju
- naziv i podaci o apartmanu
- iCal poveznice i podaci povezani s kalendarima
  rezervacija
- podaci o rezervacijama
- podaci o gostima koje korisnik unese u aplikaciju,
  primjerice ime, telefonski broj i e-mail adresa
- podaci o plaćanju i napomenama
- zadaci, bilješke i drugi sadržaj koji korisnik unese u
  aplikaciju

Apartman Asistent ne zahtijeva unos posebnih kategorija
osobnih podataka. Korisnici ne bi trebali u aplikaciju
unositi podatke koji nisu potrebni za korištenje
pojedinih funkcionalnosti usluge.

Lozinke korisnika ne pohranjuju se u obliku u kojem bi ih
Apartman Asistent mogao pročitati. Za autentifikaciju se
koriste odgovarajući sigurnosni mehanizmi pružatelja
usluge za autentifikaciju.

3. Svrhe i pravne osnove obrade

Osobne podatke obrađujemo u sljedeće svrhe:

a) Registracija i upravljanje korisničkim računom
Podaci potrebni za registraciju, prijavu i upravljanje
korisničkim računom obrađuju se radi izvršenja ugovora s
korisnikom, odnosno na temelju članka 6. stavka 1. točke
b) OUZP-a.

b) Pružanje funkcionalnosti Apartman Asistenta
Podaci koje korisnik pohranjuje u aplikaciji obrađuju se
u mjeri potrebnoj za pružanje ugovorenih funkcionalnosti
usluge, na temelju članka 6. stavka 1. točke b) OUZP-a.

c) Sigurnost, održavanje i stabilnost sustava
Tehnički podaci i podaci potrebni za zaštitu usluge od
zlouporabe, neovlaštenog pristupa i sigurnosnih incidenata
mogu se obrađivati na temelju članka 6. stavka 1. točke f)
OUZP-a, odnosno na temelju legitimnog interesa voditelja
obrade za sigurnost i pravilno funkcioniranje usluge.

d) Ispunjavanje zakonskih obveza
Ako je obrada potrebna radi ispunjenja zakonske obveze,
osobni podaci obrađuju se na temelju članka 6. stavka 1.
točke c) OUZP-a.

e) Korištenje alata za mjerenje i oglašavanje
Ako se koriste tehnologije poput Meta Pixela koje nisu
nužne za rad usluge, one se aktiviraju samo nakon
odgovarajuće privole korisnika, kada je takva privola
potrebna prema primjenjivim propisima.

4. Podaci o gostima koje unosi korisnik

Korisnik može putem Apartman Asistenta pohraniti osobne
podatke svojih gostiju, primjerice ime, telefonski broj
ili e-mail adresu.
U odnosu na takve podatke korisnik koji ih unosi u
aplikaciju u pravilu određuje svrhe i sredstva obrade te
je stoga voditelj obrade tih podataka.
Apartman Asistent te podatke obrađuje kao izvršitelj
obrade isključivo u mjeri potrebnoj za pružanje
funkcionalnosti aplikacije i prema uputama korisnika.
Za takvu obradu primjenjuju se zahtjevi članka 28. OUZP-a.
Odnos između korisnika kao voditelja obrade i Apartman
Asistenta kao izvršitelja obrade uređuje se odgovarajućim
ugovorom ili drugim pravnim aktom o obradi osobnih
podataka.
Korisnik je odgovoran za zakonitost unosa i daljnje
obrade podataka svojih gostiju te za ispunjavanje svojih
obveza prema ispitanicima.

5. Pružatelji usluga i izvršitelji obrade

Za tehničko pružanje Apartman Asistenta koriste se vanjski
pružatelji usluga. Oni mogu obrađivati osobne podatke u
mjeri potrebnoj za pružanje svojih usluga.

Trenutačno se koriste osobito:
- Supabase — baza podataka i autentifikacija korisnika
- Cloudflare — hosting, mrežna infrastruktura, sigurnost
  i tehničke usluge povezane s radom aplikacije
- Resend — slanje sistemskih e-poruka, primjerice poruka
  povezanih s korisničkim računom i korištenjem usluge
- Meta Platforms — Meta Pixel i povezane tehnologije za
  mjerenje uspješnosti oglašavanja, samo kada je takva
  obrada dopuštena i, gdje je potrebno, nakon prethodne
  privole korisnika

Pojedini pružatelji mogu, ovisno o konkretnoj usluzi i
vrsti obrade, imati različit pravni status prema OUZP-u.
Kada djeluju kao izvršitelji obrade, obrada se uređuje
odgovarajućim ugovorom o obradi podataka u skladu s
člankom 28. OUZP-a.

6. Prijenos i obrada podataka izvan EU/EGP-a

Pojedini pružatelji tehničkih usluga mogu obrađivati ili
pohranjivati osobne podatke izvan Europske unije ili
Europskog gospodarskog prostora.
Takvi prijenosi provode se samo ako su ispunjeni uvjeti
iz poglavlja V. OUZP-a, primjerice na temelju odluke
Europske komisije o primjerenosti, standardnih ugovornih
klauzula ili drugog dopuštenog mehanizma prijenosa.
Kod pružatelja koji koriste standardne ugovorne klauzule
primjenjuju se odgovarajuće zaštitne mjere i dodatne mjere
zaštite kada su potrebne.

7. Sigurnost osobnih podataka

Apartman Asistent primjenjuje odgovarajuće tehničke i
organizacijske mjere za zaštitu osobnih podataka od
slučajnog ili nezakonitog uništenja, gubitka, izmjene,
neovlaštenog otkrivanja ili neovlaštenog pristupa.
Podaci se tijekom prijenosa štite korištenjem šifriranih
komunikacijskih veza.
Pristup podacima ograničen je na osobe i pružatelje usluga
kojima je pristup potreban za pružanje, održavanje i
zaštitu usluge.
Ne možemo jamčiti apsolutnu sigurnost podataka, ali
poduzimamo odgovarajuće mjere u skladu s prirodom i
rizicima obrade.

8. Koliko dugo čuvamo osobne podatke?

Osobne podatke čuvamo samo onoliko dugo koliko je potrebno
za ostvarenje svrhe zbog koje su prikupljeni ili koliko je
potrebno radi ispunjenja zakonskih obveza.
Podaci povezani s korisničkim računom i podaci koje
korisnik pohranjuje u aplikaciji u pravilu se brišu nakon
brisanja korisničkog računa, osim ako postoji zakonska ili
druga dopuštena osnova za njihovo daljnje čuvanje.
Određeni tehnički, sigurnosni ili računovodstveni podaci
mogu se čuvati dulje ako je to potrebno radi ispunjenja
zakonskih obveza, zaštite pravnih zahtjeva ili sigurnosti
sustava.

9. Prava ispitanika

U skladu s primjenjivim propisima o zaštiti osobnih
podataka, ispitanici mogu imati osobito sljedeća prava:
- pravo na pristup osobnim podacima
- pravo na ispravak netočnih ili nepotpunih osobnih
  podataka
- pravo na brisanje osobnih podataka
- pravo na ograničenje obrade
- pravo na prenosivost podataka, kada su ispunjeni
  zakonski uvjeti
- pravo na prigovor na obradu koja se temelji na
  legitimnom interesu
- pravo na povlačenje privole u bilo kojem trenutku, kada
  se obrada temelji na privoli

Povlačenje privole ne utječe na zakonitost obrade koja je
provedena prije njezina povlačenja.

Za ostvarivanje svojih prava možete se obratiti na:
szonjakrizsan@gmail.com

Zahtjevi se obrađuju u skladu s rokovima i uvjetima
propisanim OUZP-om.

10. Pravo na pritužbu nadzornom tijelu

Ako ispitanik smatra da se njegovi osobni podaci obrađuju
protivno propisima o zaštiti osobnih podataka, ima pravo
podnijeti pritužbu nadležnom nadzornom tijelu.
Budući da se voditelj obrade nalazi u Mađarskoj, nadležno
nadzorno tijelo je osobito: Nemzeti Adatvédelmi és
Információszabadság Hatóság (NAIH).
U skladu s člankom 77. OUZP-a, ispitanik može podnijeti
pritužbu i nadzornom tijelu države članice svojeg
uobičajenog boravišta, mjesta rada ili mjesta navodne
povrede.
Za Republiku Hrvatsku nadležno je: Agencija za zaštitu
osobnih podataka (AZOP).

11. Brisanje korisničkog računa

Korisnik može u bilo kojem trenutku zatražiti brisanje
svojeg korisničkog računa.
Brisanjem računa brišu se podaci povezani s korisničkim
računom i drugi podaci koji se mogu izbrisati bez kršenja
zakonskih obveza ili drugih dopuštenih razloga za njihovo
čuvanje.
Brisanje podataka koje je Apartman Asistent dužan čuvati
na temelju zakona provodi se nakon isteka odgovarajućeg
roka čuvanja.

12. Kolačići i slične tehnologije

Apartman Asistent može koristiti tehnički nužne kolačiće i
slične tehnologije potrebne za prijavu, sigurnost i
pravilno funkcioniranje aplikacije.
Tehnologije koje se koriste za analitiku, mjerenje
oglašavanja ili druge svrhe koje nisu nužne za pružanje
usluge aktiviraju se samo u skladu s primjenjivim
propisima i, kada je potrebno, nakon prethodne privole
korisnika.
Ako se koriste takve tehnologije, korisniku se putem
odgovarajućeg mehanizma za upravljanje privolama
omogućuje donošenje i povlačenje odluke o njihovom
korištenju.

13. Automatizirano donošenje odluka

Apartman Asistent ne donosi odluke koje proizvode pravne
učinke za korisnike ili na sličan način značajno utječu
na njih isključivo na temelju automatizirane obrade
osobnih podataka.

14. Izmjene ove Izjave o zaštiti podataka

Ova Izjava o zaštiti podataka može se izmijeniti ako je to
potrebno zbog promjena u usluzi, tehničkoj infrastrukturi,
načinu obrade osobnih podataka ili primjenjivim pravnim
propisima.
Aktualna verzija Izjave uvijek je dostupna korisnicima
unutar aplikacije.
Ako se uvedu bitne promjene koje zahtijevaju obavještavanje
korisnika ili novu privolu, korisnici će o tome biti
obaviješteni na odgovarajući način.

Datum stupanja na snagu: lipanj 2026.
`,
  },
  contact: {
    title: "Impresum",
    body: `
Podaci o pružatelju usluge sukladno primjenjivim propisima
o uslugama informacijskog društva.

Pružatelj usluge

Dr. Szonja Katalin Krizsán
H-9791 Torony
Akácos Str. 21
Mađarska
E-mail: szonjakrizsan@gmail.com

Kontakt

Za pitanja u vezi s Apartman Asistentom, tehničke
probleme ili druge upite možete se obratiti na navedenu
adresu e-pošte.
`,
  },
};

export function LegalScreen({ doc, onBack }: { doc: LegalDoc; onBack: () => void }) {
  const d = DOCS[doc];
  return (
    <div className="min-h-dvh bg-surface px-4 py-6">
      <div className="mx-auto w-full max-w-lg">
        <button type="button" onClick={onBack}
          className="pressable mb-5 flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium"
          style={{ background: "rgb(86 176 187 / 0.12)", color: "#56b0bb" }}>
          <ArrowLeft className="h-4 w-4" /> Natrag
        </button>
        <h1 className="text-[18px] font-bold text-text-primary mb-4">{d.title}</h1>
        <div className="card-elevated rounded-2xl p-5">
          <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-text-secondary"
            style={{ fontFamily: "inherit" }}>
            {d.body.trim()}
          </pre>
        </div>
      </div>
    </div>
  );
}
