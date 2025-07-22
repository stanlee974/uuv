#language: fr
Fonctionnalité: Titre de page

  Scénario: key.then.title.withNameAndLevel
    Quand je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/grid.html"
    Alors je dois voir un titre nommé "HTML Grid Example" avec le niveau 1

  Scénario: key.then.grid.withNameAndContent
    Quand je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/grid.html"
    Alors je dois voir le titre de page "HTML Grid"

  Scénario: key.then.grid.withNameAndContent multiple
    Quand je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/grid.html"
    Alors je dois voir le titre de page "HTML Grid"
    Quand je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/table.html"
    Alors je dois voir le titre de page "HTML Table"
