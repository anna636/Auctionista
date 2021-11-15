import { Link } from 'react-router-dom'


const CustomModal = (prop) => {
  let styleType = () => {
    if (prop.prop.show) {
      if (prop.prop.colour === "green") {
        return styles.showGreen;
      }
      if (prop.prop.colour === "red") {
        return styles.showRed;
      }
      return styles.show;
    } else if (!prop.prop.show) {
      return styles.hide;
    }
  };

  function close() {
    prop.func(false);
  }

  return (
    <div style={styleType()} className="customModal">
      <div className="closeModal" style={styles.closeModal}>
        <p>
          <i className="bi bi-x-square" color="white" onClick={close}></i>
        </p>
      </div>
      <div className="header" style={styles.header}>
        <p>{prop.prop.header}</p>
      </div>
      <div className="mainInfo" style={styles.mainInfo}>
        <p>{prop.prop.text}</p>
      </div>
      {prop.prop.auctionItem && (
        <div>
          <Link to={`/details/${prop.prop.auctionItem.id}`}>{prop.prop.auctionItem.title}</Link>
        </div>
      )}
      <div className="modalFooter" style={styles.modalFooter}>
        <p>{prop.prop.footerText}</p>
      </div>
    </div>
  );
};

export default CustomModal;

const styles = {
  hide: {
    display: "none",
  },

  show: {
    display: "block",
    position: "fixed",
    width: "30vw",
    height: "30vh",
    backgroundColor: "black",
    right: "35vw",
    top: "40vh",
    borderRadius: "20px",
    opacity: "0.8",
    gridTemplateRows: "20% 50% 30%",
    padding: "1vw",
    color: "white",
  },
  showGreen: {
    display: "block",
    position: "fixed",
    width: "30vw",
    height: "30vh",
    backgroundColor: "green",
    right: "35vw",
    top: "40vh",
    borderRadius: "20px",
    opacity: "0.8",
    gridTemplateRows: "20% 50% 30%",
    padding: "1vw",
    color: "white",
  },
  showRed: {
    display: "block",
    position: "fixed",
    width: "30vw",
    height: "30vh",
    backgroundColor: "red",
    right: "35vw",
    top: "40vh",
    borderRadius: "20px",
    opacity: "0.8",
    gridTemplateRows: "20% 50% 30%",
    padding: "1vw",
    color: "white",
  },
  closeModal: {
    textAlign: "right",
    cursor: "pointer",
  },
  modalFooter: {
    borderTop: "1px solid white",
  },
  mainInfo: {
    fontSize: "1.3em",
    fontWeight: "bold",
  },
  header: {
    fontSize: "2em",
    fontWeight: "bold",
  },
};
