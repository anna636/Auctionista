import React from 'react'

function Footer() {
  return (
    <div style={styles.footer}>
      <div className="location" style={styles.text}>
        <h5>Location</h5>
        <p>Lund</p>
        <p>Kalkstensvägen 6</p>
      </div>
      <div className="Social media" style={styles.social}>
        <h5>Find us on social media</h5>
        <div style={styles.media}>
          <a
            href="https://www.youtube.com/channel/UCHG3LC-q_d-2JcXypSWzItw"
            title="Youtube Link"
            target="_blank"
            rel="noreferrer"
            style={styles.a}
          >
            <img
              style={styles.img}
              src="https://cdn-icons.flaticon.com/png/512/2875/premium/2875384.png?token=exp=1634977892~hmac=9d070c0d542ae489b859be50c1596c02"
              alt=""
            />
          </a>

          <a
            href="https://www.facebook.com/teknikhogskolan/"
            title="Facebook Link"
            target="_blank"
            rel="noreferrer"
            style={styles.a}
          >
            <img
              style={styles.img}
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt=""
            />
          </a>

          <a
            href="https://www.linkedin.com/school/teknikhogskolan/"
            title="Linkedin Link"
            target="_blank"
            rel="noreferrer"
            style={styles.a}
          >
            <img
              style={styles.img}
              src="https://cdn-icons.flaticon.com/png/512/3536/premium/3536505.png?token=exp=1634977916~hmac=0ebccf092be3ca483acce953bd7ee9fc"
              alt=""
            />
          </a>

          <a
            href="https://www.instagram.com/teknikhogskolan/"
            title="Instagram Link"
            target="_blank"
            rel="noreferrer"
            style={styles.a}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
              style={styles.img}
              alt=""
            />
          </a>
        </div>
      </div>
      <div className="About" style={styles.social}>
        <h5>About us</h5>
        <p style={styles.text}>
          This website was made as a part of school project. Considering that
          animal world is amazing our group of developers decided to use this
          theme as a main theme of the website
        </p>
      </div>
    </div>
  );
}

export default Footer


const styles = {
  footer: {
    width: "100%",
    height: "22vh",
    backgroundColor: "black",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "5vw",
    padding: "1vw 4vw",
    color: "rgba(255, 255, 255, 0.55)",
  },

  text: {
    paddingBottom: "2vh",
  },
  img: {
    width: "25%",
  },
  a: {
    width: "100%",
    marginRight: "2vw",
  },
  media: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "3vh",
  },
  social: {
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    margin: "0",
  },
};