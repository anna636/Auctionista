import { useState, useRef } from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from "react-bootstrap/Overlay";

import Button from "react-bootstrap/Button";
import { Tooltip } from "bootstrap";

function TooltipHelp() {
   const [show, setShow] = useState(false);
   const target = useRef(null);
  return (
    <div>
      <div style={styles.tooptip}>
        <p ref={target} onClick={() => setShow(!show)}>
          ❔
        </p>
      </div>
      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              backgroundColor: "rgba(255, 100, 100, 0.85)",
              padding: "2px 10px",
              color: "white",
              borderRadius: 3,
              ...props.style,
              maxWidth:"30vw"
            }}
          >
            The deadline of your auction is decided by the service and takes 3 days.
            If reservation price was not fullfilled untill this period, your item will not be sold.
            To get more information please read our guide to the website on our information page.
          </div>
        )}
      </Overlay>
    </div>
  );
}

export default TooltipHelp;

const styles = {
  tooptip: {
    borderRadius: "50%",
    width:"150%",
    backgroundColor: "black",
    opacity: "0.6",
    cursor:"pointer"
  }
}