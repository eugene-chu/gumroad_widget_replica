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
  inset: 25% 25% auto 25%;
  background: rgb(255, 255, 255);
  border: 1px rgb(136, 136, 136);
  border-radius: 4px;
  margin-right: -50%;
  width: 1440px;
  height: 3000px;
  padding: 1em;
  z-index: 1050;
`;

let Widget = (props) => {
  let {show, productID, ref} = props;
  let url = `https://gum.co/${productID}`;
  
  if(!show){
    return null;
  }

  return (
    <>
      <WidgetBackground onClick={props.close} />
      <OverlayWidget className='overlayWidget' allowFullScreen='true' allowpaymentrequest='true' src={url} ref={ref} 
        onLoad={(event) => settingAttr(event)}/>
    </>
  );
}

let settingAttr = (event) => {
  event.preventDefault();
  debugger;
  return null;
};

export default Widget