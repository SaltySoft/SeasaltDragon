Le projet fournit un module contenant des fonctionnalit�s s'ajoutant au framework OpenSeaDragon.

Le module se trouve dans le fichier SeasaltDragon.js


Pour utiliser le module, il faut cr�er dans un premier temps des �l�ments comme des div.
Ensuite, cr�er des annotations comme ci-dessous :

var annotation = new SeasaltDragon.Annotation();

//Remplir ensuite l'objet avec sa position et sa taille
annotation.setPosition(0.5, 0.2, 0.01, 0.01);

//Puis avec les �l�ments cr��s au pr�alable, en pr�cisant l'intervalle de zoom :
annotation.addElement(div, 0, 7); // du zoom 0 au zoom 7
annotation.addElement(div2, 7, 100); // du zoom 7 au zoom 100

[...]

//Cr�er ensuite un objet SeasaltDragon en lui donnant en param�tre un viewer OpenSeadragon
var seasalt = new SeasaltDragon(osd);

//Ajouter ensuite les annotations cr��s plus haut.
seasalt.insertAnnotation(annotation);
seasalt.insertAnnotation(annotation2);
...

Pour toutes informations sur ce code, veuillez me contacter � l'adresse mail ci-dessous :
a.j.william26@gmail.com