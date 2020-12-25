DOC
=================

API OpenFoodFacts :
-----------------
https://en.wiki.openfoodfacts.org/API

**Liens utiles :**

- **Requete HTTP de recherche** :
  - https://en.wiki.openfoodfacts.org/API/Read/Search
  - https://documenter.getpostman.com/view/8470508/SVtN3Wzy?version=latest#f564abb6-b306-4f8c-aa32-80c37f3d7fca
- **Détails techniques de l'API** : https://en.wiki.openfoodfacts.org/API#Technical_details
- **Structure d'un produit en JSON** : https://en.wiki.openfoodfacts.org/API/Read/Product

**Requête**

- **par code-barre** : https://world.openfoodfacts.org/api/v0/product/[codebarre].json
- **par recherche** : https://fr.openfoodfacts.org/cgi/search.pl?search_terms=[query]&search_simple=1&action=process&json=1

Repas équilibré en **Macro-Nutriments** :
-------------------

* **Glucides** : 50-65 %
* **Protéines** : 15-25 %
* **Lipides** : 20-30 %

API Barcode Generator :
-----------------
- **EAN-8** : https://barcode.tec-it.com/barcode.ashx?data=[8numbers]&code=EAN8&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&codepage=&qunit=Mm&quiet=0

- **EAN-13** : https://barcode.tec-it.com/barcode.ashx?data=[13numbers]&code=EAN13&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&codepage=&qunit=Mm&quiet=0
