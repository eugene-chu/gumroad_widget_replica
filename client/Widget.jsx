import React from 'react';
import styled from 'styled-components';

const WidgetBackground = styled.div`
  position: fixed;
  inset: 0px;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const OverlayWidget = styled.iframe`
  position: absolute;
  inset: 5vh 10vw auto 10vh;
  border: 1px rgb(136, 136, 136);
  border-radius: 4px;
  width: 90vw;
  height: 90vh;
  z-index: 1050;
`;

let Widget = (props) => {
  let {show, productID} = props;
  let url = `https://gum.co/${productID}`;
  
  if(!show){
    return null;
  }

  return (
    <>
      <WidgetBackground id='overlay-background'onClick={props.close} />
      <OverlayWidget id='overlay-widget' allowFullScreen={true} allowpaymentrequest={true} src={url}/>
    </>
  );
}
export default Widget