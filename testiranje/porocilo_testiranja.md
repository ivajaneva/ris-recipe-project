# Poročilo o testiranju

## Člani skupine

- **Iva Janeva 1** 
- **Nađa Tomović 2** 
- **Veljko Stojanović 3** 

---

## Osnovni opis testiranja

V okviru vaje smo izvedli enotno testiranje (unit testiranje) zalednega dela aplikacije za upravljanje receptov.  
Cilj testiranja je bil preveriti pravilno delovanje posameznih razredov v izolaciji, brez uporabe dejanske baze podatkov ali zunanjih odvisnosti.

Za testiranje smo uporabili ogrodji **JUnit 5** in **Mockito**.  
Testi so bili razdeljeni na:
- teste modela (poslovna logika),
- teste kontrolerja (logika bralnih operacij).

---

## Opis izvedenih testov

### 1. Test: veljavne vrednosti trajanja recepta (pozitivni scenarij)

Test preverja, ali se objekt `Recipe` uspešno ustvari, kadar je trajanje recepta znotraj dovoljenega intervala (od 1 do 1440 minut).

Uporabili smo parameteriziran test, s katerim preverimo več veljavnih vrednosti trajanja (npr. 1, 5, 30, 120, 1440).  
Test je pomemben, ker zagotavlja, da sistem pravilno sprejema realne in smiselne podatke.

---

### 2. Test: neveljavne vrednosti trajanja recepta (negativni scenarij)

Ta test preverja, ali se ob neveljavnih vrednostih trajanja (0, negativne vrednosti ali vrednosti večje od 1440 minut) sproži izjema `IllegalArgumentException`.

Tudi v tem primeru smo uporabili parameteriziran test.  
Test je pomemben, ker preprečuje vnos napačnih ali nerealnih podatkov v sistem.

---

### 3. Test: pridobivanje recepta po obstoječem ID-ju

Test preverja pravilno delovanje metode kontrolerja za pridobivanje recepta po ID-ju.  
V tem primeru DAO plast nadomestimo z Mockito mock objektom, ki simulira, da recept z danim ID-jem obstaja.

Test preverja:
- da je rezultat prisoten,
- da so podatki recepta pravilni.

Gre za pozitiven scenarij, ki potrjuje pravilno povezavo med kontrolerjem in podatkovno plastjo.

---

### 4. Test: pridobivanje receptov po neobstoječi kategoriji

Test preverja, kako se sistem obnaša, kadar za določeno kategorijo ne obstajajo nobeni recepti.  
Mock DAO v tem primeru vrne prazen seznam.

Test preverja, da:
- metoda ne vrne `null`,
- vrnjeni seznam je prazen.

To je negativen scenarij, ki zagotavlja pravilno obravnavo robnih primerov.

---

## Analiza uspešnosti testiranja

Med pisanjem testov smo ugotovili, da razred `Recipe` sprva ni vseboval preverjanja veljavnosti trajanja recepta.  
Na podlagi tega smo v razred dodali ustrezno validacijo, ki preprečuje ustvarjanje receptov z neveljavnimi vrednostmi.

Po dodanih popravkih vsi testi uspešno prestanejo izvajanje.  
Testiranje je prispevalo k bolj robustni kodi, večji zanesljivosti aplikacije ter jasnejši ločitvi odgovornosti med posameznimi razredi.
