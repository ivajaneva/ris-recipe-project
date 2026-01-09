# Porocilo Scrum – Recepti

## Izbrana uporabniška zgodba
Kot uporabnik želim možnost prilagoditve količin sestavin glede na število porcij, da lahko skuham točno toliko, kot potrebujem.

## Razdelitev nalog in odgovornosti

### Iva Janeva – Backend
- Naloga 1: Logika za preračun porcij (0,75–1 h)
    - Status: Done
    - Opis: Implementirana metoda za preračun sestavin glede na število porcij. Parsanje sestavin iz stringa, množenje numeric vrednosti, vračanje rezultata kot JSON.

- Naloga 2: Backend API endpoint (0,5–0,75 h)
    - Status: Done
    - Opis: Dodan GET endpoint `/recipes/{id}/calculate?portions=X`. Testirano v Postman, vrača skalirane sestavine kot JSON. Naloga vključuje uporabo DTO `ScaledIngredientsDto`.

### Nađa Tomović – Frontend + Scrum
- Naloga 3: Vnos števila porcij (frontend) (0,5 h)
    - Status: Done
    - Opis: Dodano vnosno polje za število porcij v uporabniški vmesnik. Vnos sprejema samo pozitivna cela števila in sproži spremembo vrednosti v aplikaciji.
- Naloga 6: Scrum dokumentacija in GitHub board (0,75–1 h)
    - Status: Done
    - Opis: Ustvarjena Scrum tabla v GitHub Projects. Naloge so bile razdeljene med člane ekipe ter sproti premikane med stolpci To Do → Doing → Done. Pripravljeno je poročilo o poteku dela po Scrum metodologiji.

### Veljko Stojanović – Frontend
- Naloga 4: Povezava frontenda z backendom (0,75–1 h)
    - Status: Done
    - Opis: Frontend komponenta je povezana z backend endpointom za preračun sestavin. Ob spremembi števila porcij se pošlje zahteva na backend in prejmejo se novi podatki.

- Naloga 5: Posodobitev prikaza sestavin (0,75–1 h)
    - Status: Done
    - Opis: Implementiran tabelarični prikaz sestavin z ločenimi stolpci za originalne in preračunane vrednosti. Ustrezno so obravnavani tudi primeri, kjer sestavina nima numerične količine.

## Napredek (bo dopolnjeno med delom)
Napredek dela je bil sproti beležen na Scrum tabli v GitHub Projects. Naloge so bile premikane med stolpci To Do, Doing in Done glede na fazo izvedbe.

Naloga 1: Logika za preračun porcij (backend)
To Do → Doing → Done

Naloga 2: Backend API endpoint
To Do → Doing → Done

Naloga 3: Vnos števila porcij (frontend)
To Do → Doing → Done

Naloga 4: Povezava frontenda z backendom
To Do → Doing → Done

Naloga 5: Posodobitev prikaza sestavin
To Do → Doing → Done

Naloga 6: Scrum dokumentacija in GitHub board
To Do → Doing → Done

Napredek nalog je bil sproti posodobljen, kar je omogočilo dober pregled nad stanjem projekta in jasno sledljivost izvedbe posameznih korakov.