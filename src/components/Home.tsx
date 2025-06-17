//import ReactPlayer from 'react-player';
import styles from "./Home.module.scss";
import logo from "/src/assets/images/logo.png";
//import video from "/src/assets/videos/accueil.mp4";

function Home(){
    return(
    <div className={styles.logoContainer} 
    >
      {/* Gauche : espace vide avec logo centré */}
      <div className={styles.logoContainer}>
        {/* Logo centré */}
        <img
          src={logo}// ton logo dans /public/logo.png
          alt="Logo"
          style={{ maxWidth: '60%', maxHeight: '60%' }}
        />
      </div>

      {/* Droite : vidéo
      <div className={styles.videoWrapper}>
        <ReactPlayer
          url={video}// vidéo dans /public/videos/accueil.mp4
          playing
          loop
          muted
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
          controls={false}
        />
      </div>
      */}
    </div>
    
    )

}
export default Home