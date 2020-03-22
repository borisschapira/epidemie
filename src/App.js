import React, { Component } from 'react'
import './App.css'
import Grid from "./components/Grid";
import NodeLegend from "./components/NodeLegend";
import Figure from "./components/Figure";

type Props = {
}

type State = {
  spoilersVisible: boolean,
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      spoilersVisible: false,
    }
  }

  // noinspection JSMethodCanBeStatic
  renderMainPost() {
    let spoilerOrNot;
    let showSpoilerButton;
    if (!this.state.spoilersVisible) {
      spoilerOrNot = "spoiler";
      // showSpoilerButton = <WidgetButton highlighted={false} onClick={() => { this.setState({criticalThresholdVisible: true}); } } >Show spoilers</WidgetButton>
    } else {
      spoilerOrNot = "spoiler-revealed";
      // showSpoilerButton = <WidgetButton highlighted={false} onClick={() => { this.setState({criticalThresholdVisible: false}); } } >Hide spoilers</WidgetButton>
    }
    showSpoilerButton = <label><span style={{cursor: "pointer"}}><input type="checkbox" value={this.state.spoilersVisible} onChange={(e) => { this.setState({spoilersVisible: e.target.checked}); }}/> Afficher les résultats</span></label>;


    let exposed_you = <code className="code-exposed">vous</code>;

    let susceptible = <code className="code-susceptible">Susceptibles</code>;
    let susceptible_singular = <code className="code-susceptible">Susceptible</code>;
    let infected = <code className="code-infectious">Contaminés</code>;
    let infected_singular = <code className="code-infectious">Contaminé</code>;
    let recovered = <code className="code-removed">Rétablis</code>;
    let recovered_singular = <code className="code-removed">Rétabli</code>;
    let dead = <code className="code-dead">Morts</code>;
    let selfQuarantined = <code className="code-quarantined">s’est mis en quarantaine</code>;

    // noinspection HtmlRequiredAltAttribute
    return (
      <div className="post-content">
        <div>
          <h1>Épidémie</h1>
          <h5 className="author">par Kevin Simler<br/>16 mars 2020<br/><small>(traduction de Boris Schapira)</small></h5>
        </div>
        <div>
          <span className="deemphasized">Article d’origine : <a href="https://meltingasphalt.com/outbreak/">English</a></span>
        </div>
        <div>
          <span className="deemphasized">Autre traductions : <a href="https://www.podemosaprender.org/brote/">español</a>, <a href="https://thecode.media/epidemic/">Русский язык</a></span>
        </div>
        <div>
          <a href="https://twitter.com/Harry_Stevens">Harry Stevens</a>, du Washington Post, a récemment publié une <em>très</em> élégante simulation de la manière dont une maladie comme le COVID-19 se répend. Si vous ne l’avez pas déjà fait, je vous recommande vraiment d’y <a href="https://www.washingtonpost.com/graphics/2020/health/corona-simulator-french/">jeter un œil</a>.
        </div>
        <div>
          Aujourd’hui, je voudrais approfondir avec un projet sur lequel j’ai travaillé: <strong>des simulations interactives</strong> d’une épidémie de maladie. « Interactive » signifie que vous pourrez ajuster des paramètres (comme les taux de transmission et de mortalité) et observer le déroulement de l’épidémie.
        </div>
        <div>
          À la fin de cet article, j’espère que vous aurez une meilleure compréhension (peut-être même une <em>intuition</em>) de ce qu’il faut faire pour contenir ce truc. Mais d’abord !…
        </div>
        {/*<div>*/}
        {/*  Last year, I wrote a <a href="https://meltingasphalt.com/interactive/going-critical/">viral article about viral growth</a>.*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  It featured <strong>playable simulations</strong> of things that spread across a population. Things like viruses (yes), but also ideas, fashions, and other trends.*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  Today, in light of our current crisis, I wanted a chance to revisit these simulations. And you can play with them in just a moment. But first...*/}
        {/*</div>*/}
        <div>
          <span style={{backgroundColor: '#FFC'}}><strong>UN AVERTISSEMENT IMPORTANT</strong></span>:
        </div>
        <div>
          <strong>Ceci n’est <em>pas</em> une tentative de modélisation du COVID-19.</strong>
        </div>
        <div>
          Ce qui suit est une représentation <em>simplifiée</em> d’un phénomène de contagion. Notre objectif est d’apprendre comment se passe une épidémie <em>en général</em>.
        </div>
        <div>
          <span>AVERTISSEMENT #2</span>: Je ne suis pas un épidémiologiste ! Je m’en remets aux experts en maladies infectieuses (et vous devriez en faire autant). J’ai presque certainement fait des erreurs dans cet article, mais je les corrigerai aussi vite que possible. Si vous constatez des problèmes, merci de <a href="https://meltingasphalt.com/contact/">me contacter (formulaire en anglais)</a>.
        </div>
        <div>
          Vous êtes prêts ?
        </div>
        <div>
          Alors c’est parti.
        </div>
        <div>
          <h3>Une grille de personnes</h3>
        </div>
        <div>
        Nous allons construire notre modèle lentement, brique après brique.
        </div>
        <div>
          La première chose dont une maladie a besoin est une <strong>population</strong>, c’est-à-dire, l’ensemble des personnes qui peuvent potentiellement attraper la maladie. Les nôtres vivront dans des rangées et des colonnes bien ordonnées, comme la grille 9 × 9 que vous voyez ici :
        </div>
        <Figure>
          <Grid daysIncubating={0}
                daysSymptomatic={1}
                gridRows={9}
                gridCols={9}
                nodeSize={30}
                nug={1}
                randomSeed={100}
                personHours={4}
                showPlaybackControls={false}
                speed={0.4}
                transmissionProbability={1}
                travelRadius={1}
          />
        </Figure>
        <div>
        Chaque carré représente une seule personne. La pauvre âme au centre, comme vous l’avez peut-être deviné, est {infected_singular}. Pendant ce temps, tous les autres sont {susceptible} de l’être.
        </div>
        <div>
          <h3>Temps</h3>
        </div>
        <div>
          Maintenant, incorporons le temps dans notre modèle.
        </div>
        <div>
          Le bouton « Étape » (ci-dessous) fait avancer la simulation d’un jour par clic. Vous pouvez également appuyer sur le bouton ▷ pour voir les choses se dérouler d’elles-mêmes :
        </div>
        <Figure>
          <Grid daysIncubating={0}
                daysSymptomatic={10000000000}
                gridRows={9}
                gridCols={9}
                nodeSize={30}
                nug={1}
                randomSeed={100}
                personHours={4}
                showInteractions={false}
                speed={0.4}
                transmissionProbability={1}
                travelRadius={1}
          />
        </Figure>
        <div>
          Oh non. On dirait que tout le monde a éternué sur ses voisins immédiats (nord, est, sud, ouest) et que le monde entier est tombé malade.
        </div>
        <div>
          <h3>Rétablissement</h3>
        </div>
        <div>
          Mais les gens ne restent pas malades éternellement. Voyons ce qui se passe lorsqu’ils se rétablissent après 2 étapes (c’est-à-dire 2 jours) :
        </div>
        <Figure>
          <Grid daysIncubating={0}
                daysSymptomatic={2}
                gridRows={9}
                gridCols={9}
                nodeSize={30}
                nug={1}
                randomSeed={100}
                personHours={4}
                showInteractions={false}
                speed={0.4}
                transmissionProbability={1}
                travelRadius={1}
          />
        </Figure>
        <div>
          Super, maintenant les gens peuvent passer de {infected} à {recovered}.
        </div>
        <div>
          Voici une légende bien pratique :
        </div>
        <div>
          <ul>
            <li><NodeLegend type="susceptible"/> &nbsp;<b>Susceptibles</b></li>
            <li><NodeLegend type="infected"/> &nbsp;<b>Contaminés</b></li>
            <li><NodeLegend type="removed"/> &nbsp;<b>Rétablis</b></li>
          </ul>
        </div>
        <div>
          Pour les besoins de notre simulation, une fois que quelqu’un est {recovered_singular}, il ne peut pas être contaminé à nouveau. Cela est heureusement (et probablement) vrai pour COVID-19, mais ce n’est pas certain.
        </div>
        <div>
          <h3>Période d’incubation</h3>
        </div>
        <div>
          Lors des discussions sur COVID-19, vous avez peut-être entendu dire que la maladie a une longue <strong>période d’incubation</strong>. Il s’agit de la période qui s’écoule entre le moment où une personne contracte la maladie et l’apparition des premiers symptômes.
        </div>
        <div>
          Avec COVID-19, il semble que les patients soient contagieux pendant toute la période d’incubation. Ils ne se rendent peut-être même pas compte qu’ils sont malades, mais ils sont toujours capables de contaminer d’autres personnes.
        </div>
        <div>
          Nous allons reproduire cette caractéristique dans notre modélisation de la maladie (mais n’oubliez pas que nous n’essayons pas de modéliser COVID-19 avec précision !).
        </div>
        <div>
          Voici à quoi ressemble une période d’incubation :
        </div>
        <Figure>
          <Grid gridRows={25}
                gridCols={25}
                nodeSize={20}
                nug={1}
                randomSeed={100}
                personHours={4}
                showDaysPerStateControls={true}
                showInteractions={false}
                speed={0.4}
                transmissionProbability={1}
                travelRadius={1}
          />
        </Figure>
        <div>
          Dans la manière dont j’ai choisi de modéliser cette maladie, il n’y a pas de distinction importante entre les états rose et rouge. En ce qui concerne le virus, les deux états se comportent de la même manière.
        </div>
        <div>
          Néanmoins, je voulais inclure la période d’incubation comme un rappel (visuel) que des porteurs de COVID-19 se cachent parmi nous, cachés des statistiques officielles, ignorant totalement qu’ils sont infectés.
        </div>
        <div>
          … sans savoir qu’ils propagent la maladie à d’autres.
        </div>
        <div>
          Même {exposed_you}, qui lisez ces lignes, pouvez être concerné.
        </div>
        <div>
          <ul>
            <li><NodeLegend type="susceptible"/> &nbsp;<b>Susceptibles</b></li>
            <li><NodeLegend type="exposed"/> &nbsp;<b>Contaminés (période d’incubation, pas de symptômes)</b></li>
            <li><NodeLegend type="infected"/> &nbsp;<b>Contaminés (avec symptômes)</b></li>
            <li><NodeLegend type="removed"/> &nbsp;<b>Rétablis</b></li>
          </ul>
        </div>
        <div>
          <h3>Probabilité de contamination</h3>
        </div>
        <div>
          Ok, ça suffit.
        </div>
        <div>
          Les vraies maladies ne se propagent pas avec une certitude absolue. Elles se propagent de manière probabiliste.
        </div>
        <div>
          Introduisons donc un nouveau paramètre : le <strong>taux de transmission</strong>. Cela permet de contrôler la probabilité qu’une infection se transmette d’une personne à l’autre.
        </div>
        <div>
          Pouvez-vous trouver une valeur pour le taux de transmission qui empêche la maladie de se propager à l’ensemble de la population ?
        </div>
        <Figure>
          <Grid gridRows={51}
                gridCols={51}
                maxTransmissionRate={1}
                nodeSize={10}
                nug={5}
                randomSeed={99}
                personHours={4}
                showDaysPerStateControls={true}
                showInteractions={false}
                showProTip={true}
                showTransmissionProbabilitySlider={true}
                speed={0.9}
                transmissionProbability={0.5}
                travelRadius={1}
          />
        </Figure>
        <div>
          Q : Quel est le taux de transmission <em>le plus grand</em> pour lequel la maladie ne semble pas pouvoir se propager indéfiniment (par exemple, atteindre les quatre bords de la grille) ?
        </div>
        <div style={{marginLeft: '2em'}}>
          {showSpoilerButton}
        </div>
        <div>
          Dans mes expériences, il semble se situer autour de <span className={spoilerOrNot}>0,35</span>, peut-être <span className={spoilerOrNot}>0,34</span>. En dessous de ça, j’ai vu la contamination s’estomper à chaque fois. Au-dessus, elle infecte généralement la majeure partie de la grille.
        </div>
        <div>
          Voici comment la contamination fonctionne dans notre modélisation de la maladie.
        </div>
        <div>
          Chaque jour, chaque personne a un nombre fixe de <strong>rencontres</strong> avec les personnes à proximité.
        </div>
        <div>
          Jusqu’à présent, nous avons permis aux gens de n’interagir qu’avec leurs voisins immédiats, pour un total de 4 rencontres par jour. Nous allons modifier ces hypothèses ci-dessous.
        </div>
        <div>
          Lors de chaque rencontre, le taux de transmission détermine la probabilité que quelqu’un de {infected_singular} transmette la maladie à une personne {susceptible_singular}. Plus le taux de transmission est élevé, plus la probabilité de transmission de la maladie est grande.
        </div>
        <div>
          Dans la vraie vie, il existe de nombreux types de rencontres différentes. Vous pouvez frôler quelqu’un sur le trottoir. Ou vous asseoir à côté d’eux dans un bus. Peut-être partagerez-vous un cornet de glace. Chacune de ces rencontres entraînerait une probabilité différente de transmettre l’infection. Mais dans notre modèle, par souci de simplicité, toutes les rencontres ont le même taux de transmission.
        </div>
        <div>
          ——
        </div>
        <div>
          Pendant que vous continuez à jouer avec ces simulations (ci-dessus et ci-dessous) et à réfléchir à leur pertinence pour le coronavirus/COVID-19, gardez ceci à l’esprit :
        </div>
        <div>
          Le taux de transmission dépend en partie de la <em>maladie elle-même</em> (son caractère naturellement contagieux), mais aussi de <em>l’environnement</em> dans lequel évolue la maladie. Cela comprend à la fois l’environnement physique (par exemple, la température et l’humidité de l’air) et l’environnement social (par exemple, le comportement des personnes).
        </div>
        <div>
          Par exemple, lorsque les gens se lavent les mains et portent des masques pour contenir leur toux, le taux de transmission par rencontre diminue, même si le virus lui-même ne change pas.
        </div>
        <div>
          Pour tout processus de croissance virale, il est possible de trouver un taux de transmission suffisamment bas pour arrêter complètement la propagation. C’est ce qu’on appelle le « seuil critique », et vous pouvez en apprendre davantage à ce sujet <a href="https://meltingasphalt.com/interactive/going-critical">ici (en anglais)</a>.
        </div>
        <div>
          Mais le COVID-19 est tellement contagieux qu’il est difficile de descendre en dessous du seuil critique de contagion. Nous ne pouvons nous laver les mains qu’un certain nombre de fois par jour. Même le port d’un masque en public ne suffira pas à réduire suffisamment la contagion (bien que chaque progrès reste utile).
        </div>
        <div>
          Nous <em>pourrions</em> tous porter des combinaisons de protection contre les substances dangereuses chaque fois que nous quittons la maison ; techniquement, cela résoudrait le problème de la contagion (sans changer nos schémas d’interaction sociale). Mais puisque c’est peu pratique, envisageons d’autres moyens d’empêcher cette maladie de nous dévorer.
        </div>
        <div>
          <h3>Déplacements</h3>
        </div>
        <div>
          Nous avons fait une autre hypothèse irréaliste : nous n’avons permis aux gens de n’interagir qu’avec leurs voisines et voisins immédiates.
        </div>
        <div>
          Que se passe-t-il lorsque nous laissons les gens se déplacer plus loin (nous supposons toujours 4 rencontres par jour, un paramètre que nous discuterons dans la prochaine section) ?
        </div>
        <div>
          En abaissant le curseur du <strong>rayon de déplacement</strong> ci-dessous, vous verrez un échantillon des rencontres que la personne du centre aura faite en une journée (nous ne pouvons pas dessiner les rencontres de <em>tout le monde</em> parce que ce serait illisible. Il faudra plutôt faire appel à votre imagination). Notez que dans notre modèle, contrairement à la vie réelle, chaque jour apporte une nouvelle série (aléatoire) de rencontres.
        </div>
        <Figure>
          <Grid degree={24}
                gridRows={51}
                gridCols={51}
                maxTransmissionRate={1}
                nodeSize={10}
                nug={5}
                personHours={4}
                randomSeed={99}
                showAliveFraction={true}
                showInteractions={true}
                // showTransmissionProbabilitySlider={true}
                showTravelRadiusSlider={true}
                speed={0.8}
                travelRadius={15}
          />
        </Figure>
        <div>
          Notez que si vous limitez les déplacements dès le début (par exemple, à un rayon de 2 unités), vous pouvez ralentir considérablement la contagion.
        </div>
        <div>
          Mais que se passe-t-il lorsque vous commencez avec des déplacements libres, que vous laissez l’infection se répandre à peu près partout et que vous ne faites que restreindre les déplacements <em>plus tard</em> ?
        </div>
        <div>
          En d’autres termes, à quel stade de la courbe de contagion faut-il réduire les déplacements pour qu’ils puissent ralentir l’épidémie de manière significative ?
        </div>
        <div>
          Allez-y, essayez. Commencez par un rayon de 25. Puis jouez la simulation, en faisant une pause lorsque vous atteignez environ 10 % de contagion. Réduisez ensuite le rayon de déplacement à 2 et reprenez. Que se passe-t-il ?
        </div>
        <div>
          Vous l’aurez compris : les restrictions dans les déplacements ne sont utiles que lorsqu’elles sont appliquées tôt, au moins dans le but d’aplatir la courbe.
        </div>
        <div>
          Mais les restrictions de déplacement peuvent être utiles, même aux derniers stades d’une épidémie, pour au moins deux raisons :
        </div>
        <div>
          <ol>
            <li>Les bus, les trains et les aéroports sont des lieux où les gens se rassemblent dans des endroits exigus. Lorsque les gens cessent d’utiliser ces modes de transport, ils réduisent le nombre de rencontres avec des personnes potentiellement contaminées (nous y reviendrons plus loin).</li>
            <li>Il est essentiel de réduire les déplacements <em>conjointement avec des mesures de confinement régionales</em>. Si une région maîtrise l’épidémie, mais que les régions voisines sont toujours sous tension, vous devez protéger la région maitrisée (nous n’allons pas explorer les mesures de confinement dans cet article. Vous pouvez en savoir plus <a href="https://necsi.edu/beyond-contact-tracing">ici (en anglais)</a>).</li>
          </ol>
        </div>
        <div>
          <h3>Rencontres</h3>
        </div>
        <div>
          Très bien, commençons à vraiment creuser le sujet.
        </div>
        <div>
          Dans la simulation ci-dessous, vous pouvez faire varier le nombre de <forts>rencontres par jour</forts>.
        </div>
        <div>
          Commençons à 20. Quelle est la valeur minimale dont nous avons besoin pour contenir l’épidémie ?
        </div>
        <Figure>
          <Grid degree={24}
                gridRows={51}
                gridCols={51}
                personHours={20}
                nodeSize={10}
                nug={5}
                randomSeed={100}
                showAliveFraction={true}
                showInteractions={true}
                showPersonHoursSlider={true}
                showTransmissionProbabilitySlider={true}
                showTravelRadiusSlider={true}
                speed={0.8}
                transmissionProbability={0.3}
                travelRadius={10}
          />
        </Figure>
        {/*<div>*/}
        {/*  Here’s another question you might try to answer: <em>For a fixed number of encounters (e.g., 5 per day), how much do you need to reduce the travel radius to keep the disease in check?</em>*/}
        {/*</div>*/}
        <div>
          Comme vous pouvez le voir, la réduction du nombre de rencontres par jour a un <em>effet dramatique</em> sur l’épidémie. Elle aplatit facilement la courbe, et a même le potentiel (lorsqu’elle est prise très au sérieux) d’éteindre complètement une épidémie.
        </div>
        <div>
          C’est l’effet que nous espérons obtenir en parlant de « distance sociale ». C’est pourquoi tant de personnes implorent leurs responsables politique d’arrêter les manifestations et de fermer les écoles, et pourquoi nous devrions tous nous tenir à l’écart des bars, des cafés et des restaurants, et travailler le plus possible à domicile.
        </div>
        <div>
          La NBA a rendu un immense service à ses fans en annulant le reste de la saison. Maintenant, nous devons faire de même et <em>annuler tout</em>.
        </div>
        <div>
          D’après ce que je comprends (encore une fois, je ne suis pas un expert), c’est le levier le plus important dont nous disposons pour lutter contre ce truc.
        </div>
        <div>
          <h3>Morts</h3>
        </div>
        <div>
          Tous les patients ne guérissent pas d’une maladie. Beaucoup finissent par mourir.
        </div>
        <div>
          Introduisons donc le <strong>taux de mortalité</strong>.
        </div>
        <div>
          Dans notre simulation, le taux de mortalité est la probabilité qu’un patient contaminé meure finalement de la maladie, en supposant qu’il reçoive des soins médicaux normaux&#8239;/&#8239;adéquats.
        </div>
        <div>
          <span className="deemphasized">(mise à jour : une version antérieure de cet article établissait une distinction entre le taux de létalité et le taux de mortalité, mais ne définissait pas correctement ces termes. Pour éviter toute ambiguité, supprimons cette distinction et n’utilisons que le terme « taux de mortalité »)</span>
        </div>
        <div>
          Le taux de mortalité du COVID-19 a été estimé entre 1 % et<a href="https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(20)30195-X/fulltext">6 % (en anglais)</a>. Il pourrait s’avérer inférieur à 1 %, s’il y a beaucoup de cas non diagnostiqués. Il est nettement plus élevé lorsque le système médical est surchargé (plus d’informations à ce sujet dans une minute).
        </div>
        <div>
          Dans notre modélisation de la maladie, partons d’un taux de mortalité de 3 % (vous pouvez faire varier le paramètre ci-dessous) :
        </div>
        <Figure>
          <Grid gridRows={101}
                gridCols={101}
                nodeSize={5}
                nug={5}
                randomSeed={100}
                showAliveFraction={true}
                showDeaths={true}
                showDeathRateSlider={true}
                showPersonHoursSlider={true}
                showTransmissionProbabilitySlider={true}
                showTravelRadiusSlider={true}
                speed={1}
                transmissionProbability={0.3}
          />
        </Figure>
        <div>
          Ces points noirs isolés, ça a peut-être l’air de rien. Mais n’oubliez pas que chacun d’entre eux est une vie humaine perdue à cause de la maladie.
        </div>
        <div>
          <h3>Capacité des hôpitaux</h3>
        </div>
        <div>
          Nous allons introduire ci-dessous un nouveau curseur. Il contrôle la <strong>capacité des hôpitaux</strong>.
        </div>
        <div>
          Il s’agit du nombre de patients (exprimé en pourcentage de la population) qui peuvent être traités par notre système médical à tout moment.
        </div>
        <div>
          Pourquoi la capacité des hôpitaux est-elle importante ?
        </div>
        <div>
          Lorsque le nombre de patients dépasse les capacités du système, ils ne peuvent pas recevoir le traitement dont ils ont besoin. Et par conséquent, ils souffrent de complications beaucoup plus graves. Comme nous l’avons vu en Italie, certains peuvent être laissés pour mort dans les couloirs.
        </div>
        <div>
          J’ai entendu des gens parler de la capacité des hôpitaux en termes de « nombre de lits » ou de « nombre de lits en soins intensifs ». Je pense que de simples « lits » peuvent être installés dans un gymnase en très peu de temps. Je pense que le véritable goulot d’étranglement est l’équipement médical (en particulier les ventilateurs). Mais je n’en suis pas sûr. C’est peut-être le personnel médical.
        </div>
        <div>
          Concrètement, cela compte <em>énormément</em>. Nous devons identifier le goulot d’étranglement et faire de notre mieux pour alléger la pression qui s’y exerce. Mais pour une simulation, nous pouvons nous contenter d’en faire abstraction en supposant qu’il y a une capacité limitée quelque part dans le système. N’oubliez pas que nous n’essayons pas de modéliser la réalité avec trop de précision.
        </div>
        <div>
          Dans notre modélisation de la maladie, voici comment le système médical fait défaut :
        </div>
        <div>
          <strong>Lorsqu’il y a plus de contaminations que la capacité de l’hôpital, le taux de mortalité <em>double</em>.</strong>
        </div>
        <div>
          Essayons. Portez une attention particulière au <em>taux de mortalité à l’entrée</em> (la valeur sur le curseur), qui définit la fréquence des décès, même dans les meilleures circonstances, par rapport au <em>taux de mortalité réel</em> (mis en évidence sous le graphique), qui nous indique comment le système se comporte sous tension.
        </div>
        <Figure>
          <Grid gridRows={101}
                gridCols={101}
                hospitalCapacityPct={0.05}
                nodeSize={5}
                nug={5}
                personHours={15}
                randomSeed={100}
                showAliveFraction={true}
                showDeaths={true}
                showDeathRateSlider={true}
                showHospitalCapacitySlider={true}
                // showPersonHoursSlider={true}
                // showTransmissionProbabilitySlider={true}
                // showTravelRadiusSlider={true}
                speed={1}
                transmissionProbability={0.28}
                travelRadius={15}
          />
        </Figure>
        <div>
          <h3>« Aplatir la courbe »</h3>
        </div>
        <div>
          Vous en avez déjà entendu parler. Vous savez pourquoi c’est important. Mais maintenant, vous êtes sur le point de le percevoir.
        </div>
        <div>
          C’est votre dernier test de la journée.
        </div>
        <div>
          Le taux de mortalité à l’entrée est fixé à 3 %. La capacité des hôpitaux est fixée à 5 %.
        </div>
        <div>
          Jouez la simulation et notez le taux de mortalité réel : 6 %. Essayez ensuite de faire baisser ce chiffre.
        </div>
        <div>
          En d’autres termes, aplatissez la courbe :
        </div>
        <Figure>
          <Grid gridRows={101}
                gridCols={101}
                hospitalCapacityPct={0.05}
                nodeSize={5}
                nug={5}
                personHours={15}
                randomSeed={100}
                showAliveFraction={true}
                showDeaths={true}
                // showDeathRateSlider={true}
                // showHospitalCapacitySlider={true}
                showPersonHoursSlider={true}
                showTransmissionProbabilitySlider={true}
                showTravelRadiusSlider={true}
                speed={1}
                transmissionProbability={0.4}
                travelRadius={15}
          />
        </Figure>
        <div>
          Quelle que soit la manière dont cela a fonctionné pour vous en simulation, la réalité va être <em>beaucoup plus difficile</em>. Les personnes réelles ne réagissent pas comme les curseurs d’une interface.
        </div>
        <div>
          Et le pire c’est que même si nous parvenons à « aplatir la courbe » suffisamment pour espacer significativement la charge de travail, nous sommes toujours en position de perdre des millions et des millions de vies.
        </div>
        <div>
          Peut-être que nous n’en perdrons pas autant que dans le pire des cas ; peut-être que nous ne les perdrons pas dans les couloirs de l’hôpital. Mais tant que le virus continuera à se propager (ce qui semble être le cas) il y aura une quantité impensable de souffrance dans notre avenir.
        </div>
        <div>
          À moins que nous ne prenions les bonnes mesures dès aujourd’hui.
        </div>
        <div>
          Arrêtez de vous déplacer. Arrêtez de sortir. Arrêtez de rendre visite à vos parents et à vos amis. Arrête de manger au restaurant. Arrête tout ce que vous pouvez. Si vous êtes en responsabilité de quelque chose, <em>annulez tout</em>. Verrouillez. Tout. Maintenant.
        </div>
        <div>
          Je vous en prie : prenez des mesures décisives dès maintenant.
        </div>
        <div>
          Le COVID-19 vient nous chercher, et il ne sera pas arrêté par des demi-mesures.
        </div>




        <div>
          &nbsp;
        </div>
        <div>
          &nbsp;
        </div>
        <div>
          ——
        </div>
        <div>
          &nbsp;
        </div>
        {/*<div>*/}
        {/*  Thanks for reading. If this has been helpful, I hope you'll consider sharing.*/}
        {/*</div>*/}
        <div>
          <b>Licence</b>
        </div>
        <div>
          <a href="https://creativecommons.org/share-your-work/public-domain/cc0/">CC0</a> — aucun droit réservé. Vous êtes libre d’utiliser cette œuvre comme bon vous semble, y compris en la copiant, en la modifiant et en la distribuant sur votre propre site.
        </div>
        <div>
          <a href="https://github.com/kevinsimler/outbreak">Code source original</a> · <a href="https://github.com/borisschapira/outbreak">Code source de la version française</a>
        </div>
        <div>
          <b>Modélisation complète</b>
        </div>
        <div>
          Le modèle complet, avec tous les curseurs visibles, se trouve tout en bas de la page.
        </div>
        <div>
          <b>Remerciements</b>
        </div>
        <div>
          Je voudrais remercier <a href="https://twitter.com/nsbarr">Nick Barr</a>, <a href="https://twitter.com/origiful">Ian Padgham</a>, <a href="https://twitter.com/frooblor">Diana Huang</a>, Kellie Jack, <a href="https://twitter.com/btnaughton">Brian Naughton</a>, <a href="https://twitter.com/yaneerbaryam">Yaneer Bar-Yam</a>, et <a href="https://twitter.com/adamdangelo">Adam D’Angelo</a> pour leurs commentaires et leurs encouragements bienvenus.
        </div>
        <div>
          <b>Pour en savoir plus</b>
        </div>
        <div>
          <ul>
            <li><a href="https://medium.com/tomas-pueyo/coronavirus-agissez-aujourdhui-2bd1dc7838f6">Coronavirus : Agissez Aujourd’hui</a> — Tomas Pueyo explique pourquoi nous avons systématiquement sous-estimé ce phénomène et pourquoi il faut que cela change. Lisez-le.</li>
            <li><a href="https://medium.com/@joschabach/flattening-the-curve-is-a-deadly-delusion-eea324fe9727">Don’t "Flatten the Curve," Stop It! (en anglais)</a> — Joscha Bach fait quelques calculs sur la capacité des hôpitaux et conclut « qu’aplatir la courbe » ne sera pas suffisant ; nous devons arrêter complètement l’épidémie.</li>
            <li><a href="https://www.washingtonpost.com/graphics/2020/health/corona-simulator-french/">L’excellente simulation</a> du Washington Post — une utilisation brillante des boules de billard pour montrer la contagion et la distanciation sociale.</li>
            <li><a href="https://meltingasphalt.com/interactive/going-critical/">Going Critical (en anglais)</a> — ma précédente réflexion sur les processus de diffusion et de croissance virale, y compris les réactions nucléaires et la croissance de la connaissance.</li>
          </ul>
        </div>

        {this.renderEndOfPostDivider(true)}

        <div className="subscription-footer">
          <a href="https://meltingasphalt.com"><strong>Melting Asphalt</strong></a> (dont est issue cette traduction) est maintenu par <span className="nohyphen">Kevin</span> <span className="nohyphen">Simler</span>.<br/>Il ne publie que <em>très rarement</em>, donc vous pourriez vouloir être notifié·e des futures publications<br/>
          {this.renderSubscribeForm()}
          {/*<div style={{textAlign: 'center', fontSize: '10pt', color: '#666', marginTop: '0.5em'}}>(This is a <em>very low frequency</em> mailing list. Pinky swear.)</div>*/}
          <br/>Vous pouvez aussi le <a href="https://twitter.com/KevinSimler"><strong>retrouver sur Twitter</strong></a>.
          <div>&nbsp;</div>
        </div>




        <div>
          &nbsp;
        </div>
        <div>
          <a name="self-quarantine"/>
          <h3>Quarantaine volontaire</h3>
        </div>
        <div>
          (Merci <a href="https://twitter.com/jasonlegate">Jason Legate</a> pour avoir suggéré et codé cet ajout au modèle de la maladie.)
        </div>
        <div>
          Dans la simulation ci-dessous, vous pouvez faire varier le <strong></strong>taux de quarantaine volontaire<strong></strong>, c’est-à-dire la probabilité qu’un patient choisisse de s’isoler une fois qu’il devient symptomatique. Un patient qui {selfQuarantined} sera dessiné en bleu au lieu de rouge.
        </div>
        <div>
          En outre, vous pouvez faire varier leur degré de rigueur à l’aide des paramètres <strong>rigueur de la quarantaine volontaire</strong>. À 100 % de rigueur, les patients qui s’isolent n’ont aucune rencontre avec d’autres personnes. À 0 % de rigueur, ils ont leur nombre normal de rencontres. Et ça varie linéairement entre les deux.
        </div>
        <div>
          Commençons par le taux de quarantaine volontaire à 25 % et une rigueur également à 25 %. Quelles mesures faut-il prendre pour contenir l’épidémie ?
        </div>
        <Figure>
          <Grid degree={24}
                gridRows={51}
                gridCols={51}
                personHours={20}
                nodeSize={10}
                nug={5}
                randomSeed={100}
                showAliveFraction={true}
                showInteractions={true}
                showPersonHoursSlider={true}
                showTransmissionProbabilitySlider={true}
                showChanceOfIsolationAfterSymptomsSlider={true}
                showDecreaseInEncountersAfterSymptomsSlider={true}
                showTravelRadiusSlider={true}
                speed={0.8}
                transmissionProbability={0.21}
                travelRadius={20}
          />
        </Figure>
        <div>
          Comme vous pouvez le voir, si les gens se mettent volontairement en quarantaine (une fois qu’ils présentent des symptômes) et s’ils sont stricts quant à leur isolement, la propagation peut être atténuée. Malheureusement, comme les patients sont contagieux pendant la période d’incubation (avant qu’ils n’aient la possibilité de remarquer leurs propres symptômes), il est difficile d’arrêter complètement la propagation.
        </div>
        <div>
          Pour la plupart des maladies, la quarantaine volontaire ne résoudra pas le problème à elle seule. C’est plutôt un outil parmi d’autres (notamment une meilleure hygiène, des distances sociales, des restrictions de déplacement, etc.) qui <em>tous ensemble</em> peuvent permettre de maîtriser une épidémie. La grande leçon à retenir est que chaque stratégie est complémentaire de toutes les autres.
        </div>
        <div>
          <h3>Modélisation complète</h3>
        </div>
        <Figure>
          <Grid gridRows={101}
                gridCols={101}
                // highlight="transmissionRate"
                hospitalCapacityPct={0.05}
                nodeSize={5}
                nug={5}
                randomSeed={100}
                showAliveFraction={true}
                showAllControls={true}
                // showDaysPerStateControls={true}
                showDeaths={true}
                showTransmissionProbabilitySlider={true}
                showChanceOfIsolationAfterSymptomsSlider={true}
                // showPersonHoursSlider={true}
                // showTransmissionProbabilitySlider={true}
                // showTravelRadiusSlider={true}
                speed={1}
          />
        </Figure>

      </div>
    );
  }

  renderSubscribeForm() {
    return (
      <form method="post" action="https://meltingasphalt.us8.list-manage.com/subscribe/post?u=0bc9d741e167733d20c520ea6&amp;id=57ebd9b4a6" id="mc4wp-form-1" className="form mc4wp-form"><input type="email" id="mc4wp_email" name="EMAIL" placeholder="Votre email" required />
        <input type="submit" value="Vous abonner" />
        <textarea name="_mc4wp_required_but_not_really" style={{display: "none"}}/><input type="hidden" name="_mc4wp_form_submit" value="1" /><input type="hidden" name="_mc4wp_form_instance" value="1" /><input type="hidden" name="_mc4wp_form_nonce" value="8a45344b67" />
      </form>
    )
  }

  renderEndOfPostDivider(showTimestamp: boolean) {
    let timestamp = "";
    let divider = <span>——</span>;
    if (showTimestamp) {
      timestamp = "Publié initialement le 16 mars 2020.";
      divider = <img src="https://meltingasphalt.com/wp-content/themes/responsive/core/images/flourish.svg" width={50} alt="——" />;
    }

    return (
      <div style={{textAlign: "center"}}>
        <div className="end-of-post-divider">
          {divider}
        </div>
        <div className="signature-line">
          {timestamp}
        </div>
      </div>
    );
  }

  renderHeader() {
    return (
        <div id="header">
          <div id="logo" className="branded">
            <span className="site-name">
              <a href="https://meltingasphalt.com/" title="Melting Asphalt" rel="home">
                <img id="nav-logo" src="https://meltingasphalt.com/wp-content/themes/responsive/core/images/ma.svg" />
                                        &nbsp;&nbsp;Melting Asphalt
              </a>
            </span>
          </div>
        </div>
    );
  }

  render() {
    return (
      <div className="main-container">
        <div className="header">
          {this.renderHeader()}
        </div>
        <div className="blank-l"/>
        <div className="content">
          {this.renderMainPost()}
        </div>
        <div className="blank-r"/>
        <div className="footer"/>
      </div>
    );
  }
}

export default App
