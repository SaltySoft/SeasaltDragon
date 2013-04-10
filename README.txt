Le projet fournit un module contenant des fonctionnalités s'ajoutant au framework OpenSeaDragon.

Le module se trouve dans le fichier SeasaltDragon.js


Pour utiliser le module, il faut créer dans un premier temps des éléments comme des div.
Ensuite, créer des annotations comme ci-dessous :

var annotation = new SeasaltDragon.Annotation();

//Remplir ensuite l'objet avec sa position et sa taille
annotation.setPosition(0.5, 0.2, 0.01, 0.01);

//Puis avec les éléments créés au préalable, en précisant l'intervalle de zoom :
annotation.addElement(div, 0, 7); // du zoom 0 au zoom 7
annotation.addElement(div2, 7, 100); // du zoom 7 au zoom 100

[...]

//Créer ensuite un objet SeasaltDragon en lui donnant en paramètre un viewer OpenSeadragon
var seasalt = new SeasaltDragon(osd);

//Ajouter ensuite les annotations créés plus haut.
seasalt.insertAnnotation(annotation);
seasalt.insertAnnotation(annotation2);
...

Pour toutes informations sur ce code, veuillez me contacter à l'adresse mail ci-dessous :
a.j.william26@gmail.com