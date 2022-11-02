# Wave-Function-Collapse

## Fonctionnement :
### Tiles :
Implémentation de la Wave function collapse en JavaScript.

Utilisation de tiles comme paterne. Les tiles possèdent une **liste d'adjacence**, qui définie les tiles pouvant se trouver autour d'elles.
Par exemple la tile `Void` possède `[0,0,0,0]` comme liste d'ajacence signifiant que au seul des tiles avec un conecteur 0 peuvent se trouver à côté.

| Name | Tiles  |      Adjacency table      |
|:----------:|:----------:|:-------------:|
| Void  | ![tuile alt >](/WaveFunctionCollapse/js/asset/Void.png) | Up: 0, Right: 0, Down: 0, Left: 0 | 
| crossDown  | ![tuile](/WaveFunctionCollapse/js/asset/crossDown.png) |  Up: 0, Right: 1, Down: 1, Left: 1 |
| crossUp  | ![tuile alt <](/WaveFunctionCollapse/js/asset/crossUp.png) | Up: 1, Right: 1, Down: 0, Left: 1   |
| crossLeft  | ![tuile alt >](/WaveFunctionCollapse/js/asset/crossLeft.png) | Up: 1, Right: 0, Down: 1, Left: 1 |
| crossRight  | ![tuile alt >](/WaveFunctionCollapse/js/asset/crossRight.png) | Up: 1, Right: 1, Down: 1, Left: 0 |

### Collapse :
On défini un score d'entropie selon le nombre de possiblité d'une case. 

**Exemple :** au dessus d'un case `Void` on ne peut trouver qu'une autre case `Void` et une case `crossUp`. Le score d'entropie de cette case est donc de `2` 

La fonction `collapse()` permet de choisir une case aléatoirement parmis les cases ayant le score le plus bas puis de choisir aléatoirement parmis les options restantes.
Par défaut si plus aucune option n'est disponible on met la case `Void` laissant place a des "trou" dans le paterne. *Une fonction de propagation éviterait ce "bug"*


### Paterne final
![tuile alt >](/WaveFunctionCollapse/js/asset/wave.png)

    
