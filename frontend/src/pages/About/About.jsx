import './About.css';
import logo from '../../netflicslogo.ico';
function About() {
  return (
    <div className="AboutBigContainer">
      <img className="logonetflicsAbout" src={logo} alt="Logo"></img>
      <div className="About">
        Netflics est une plateforme de streaming de premier plan, reconnue pour
        son système de recommandation exceptionnel et son engagement ferme
        envers la protection des données des utilisateurs. Grâce à des
        algorithmes avancés et à l'intelligence artificielle, Netflics analyse
        en profondeur les préférences de visionnage de chaque utilisateur.
        <br></br>Cette analyse détaillée permet au système de suggérer des
        films, des séries et des documentaires parfaitement adaptés aux goûts
        individuels, rendant l'expérience de divertissement non seulement
        personnalisée mais aussi enrichissante. Que vous soyez amateur de
        thrillers palpitants, de comédies légères ou de drames intenses,
        Netflics veille à ce que vous découvriez toujours du contenu qui vous
        captivera.<br></br>Mais Netflics ne s'arrête pas là. La protection des
        données des utilisateurs est une priorité absolue pour la plateforme. En
        utilisant des protocoles de chiffrement de pointe et en respectant les
        normes internationales les plus strictes en matière de sécurité des
        données, Netflics garantit que toutes les informations personnelles de
        ses abonnés sont traitées avec le plus grand soin et restent toujours
        sécurisées.<br></br> Les utilisateurs peuvent ainsi profiter de leur
        contenu préféré en toute tranquillité, sachant que leur vie privée est
        scrupuleusement protégée. Netflics s'engage également à être transparent
        sur la manière dont les données sont collectées et utilisées, offrant
        ainsi une confiance renouvelée à ses abonnés. Choisir Netflics, c'est
        opter pour une expérience de streaming personnalisée et sécurisée, où
        chaque utilisateur est au centre de toutes les attentions.
      </div>
    </div>
  );
}

export default About;
