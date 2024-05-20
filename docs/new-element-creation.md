# Crear un nou element

Tots arxius que continguin un element del patrimoni hauran d'anar a la carpeta de **_patrimoni** fent que el document
sigui de tipus [Markdown](https://www.markdownguide.org/basic-syntax/).

## Nomenclatura

Com hi poden haver múltiples elements en una mateixa capa i que aquests se superposin, és possible que un es dibuixi per
sobre de l'altre quan volem que sigui al revés. Per aquest motiu la nomenclatura és la següent:

```
N-nom-de-larxiu.md
```

On **N** és la prioritat d'aquest element. Si és més alt, aquest es dibuixarà per sobre.

## Encapçalament

La part més important d'aquests arxius és la seva capçalera, on va la informació perquè aquest es pugui renderitzar
dins del mapa correctament.

Aquest ha de seguir el següent format:

```yaml
---
layout: patrimoni-details
title: "nom del patrimoni"
alt_title: "altres noms"
class: "classe"
area: "àrea en m2"
protection: "tipus protecció"
addition_date: "data"
cat_code: "codi"
cbp_code: "codi"
image: "imatge.jpg"
card: "notes"
collections: [ "patrimoni-arquitectònic", "(...)" ]
coordinates:
  - group1:
      - [ 1.46122299818415, 42.357768018356047 ]
      - (...)
  - group2:
      - [ longitud, latitud ]
      - (...)
  - (...)
---
```

### Característiques de l'encapçalament

| Tipus           | Contingut                                                                                                                                                                                                                                     |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| layout*         | Per a tots els elements presents al mapa aquest ha de ser: `patrimoni-details`.                                                                                                                                                               |
| title*          | Nom de l'element del patrimoni.                                                                                                                                                                                                               |
| alt_title**     | Nom alternatiu del patrimoni.                                                                                                                                                                                                                 |
| class**         | Classe de l'element patrimonial.                                                                                                                                                                                                              |
| area**          | Superfície de l'element del patrimoni.                                                                                                                                                                                                        |
| addition_date** | Data d'addició al registre.                                                                                                                                                                                                                   |
| cat_code**      | Número de registre català.                                                                                                                                                                                                                    |
| cbp_code**      | Número de registre CBP.                                                                                                                                                                                                                       |
| image**         | Imatge representativa de l'element patrimonial.                                                                                                                                                                                               |
| card**          | Informació extra de l'element.                                                                                                                                                                                                                |
| collections*    | Llista de les col·leccions on pertany aquest element (capes del mapa). Aquestes poden ser: `bcil-existents`, `bcil-previstos-cbp`, `bcin-existents`, `bcin-previstos-cbp`, `patrimoni-arqueologic-i-paleontologic`, `patrimoni-arquitectonic` |
| coordinates*    | Coordenades de l'element.                                                                                                                                                                                                                     |

(*) camp obligatori.

(**) només visible a la pàgina detallada de l'element.

### Format de les coordenades

Les coordenades d'un element poden ser un perímetre únic, com el de Ca l'Armenter:

```yaml
coordinates:
  - group1:
      - [ 1.461679739284226, 42.356974965361033 ]
      - [ 1.461672777470331, 42.356865263839822 ]
      - [ 1.461469198639271, 42.356866495790847 ]
      - [ 1.461461897418211, 42.356919803938403 ]
      - [ 1.461451699055658, 42.356972500593486 ]
      - [ 1.461679739284226, 42.356974965361033 ]
```

O múltiples, com el de les Mesures:

```yaml
coordinates:
  - group1:
      - [ 1.460927749286807, 42.358069999341488 ]
      - [ 1.460956939628262, 42.358075156825308 ]
      - [ 1.460962532888699, 42.358059892747669 ]
      - [ 1.460932922924401, 42.358055474251337 ]
      - [ 1.460927749286807, 42.358069999341488 ]
  - group2:
      - [ 1.46101793345406, 42.358085357929582 ]
      - [ 1.461048328192767, 42.358090531559839 ]
      - [ 1.461055366513293, 42.358073648713855 ]
      - [ 1.461024161593787, 42.358068762056412 ]
      - [ 1.46101793345406, 42.358085357929582 ]
```

La quantitat de grups de coordenades pot ser infinit, però és obligatori que aquest sempre segueixi aquest format perquè
pugui ser processat.