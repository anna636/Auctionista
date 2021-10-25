import React from 'react'

function CreateNewListing() {
  return (
    <div className="newListingWrapper" style={styles.wrapper}>
      <div className="form" style={styles.form}>
        
      </div>
      <div className="coolImg">
        <img
          src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
          alt=""
          style={styles.coolImg}
        />
      </div>
    </div>
  );
}

export default CreateNewListing

const styles = {
  wrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  coolImg: {
    width: "100%",
  },
  form: {
    width: "100%",
    backgroundColor: "rgb(226, 89, 55)",
  },
};
