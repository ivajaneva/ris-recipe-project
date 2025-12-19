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

### Oseba 2 – Frontend
- Naloga 3: Vnos števila porcij (0,5 h)
- Naloga 4: Povezava frontenda z backendom (0,75–1 h)

### Oseba 3 – Frontend/UI + Scrum
- Naloga 5: Posodobitev prikaza sestavin (0,75–1 h)
- Naloga 6: Scrum dokumentacija in GitHub board (0,75–1 h)

## Napredek (bo dopolnjeno med delom)
- Tukaj bomo beležili premike nalog: ToDo → Doing → Done
