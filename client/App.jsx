import React from 'react';
import Widget from './Widget.jsx';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showWidget: false,
      productID: null
    }

    this.frameRef = React.createRef();

    this.toggleWidget = this.toggleWidget.bind(this);
    this.closeWidget = this.closeWidget.bind(this);
    this.openWidget = this.openWidget.bind(this);
  }

  componentDidMount(){
    let links = document.links;
    for(const link of links){

      if(link.href.startsWith('https://gum.co')){
        link.setAttribute('class', 'gum-widget');
      }
    }
  }
  toggleWidget(){
    this.setState((state) => ({showWidget: !state.showWidget}))
  };

  openWidget(event){
    if(event.target.className === 'gum-widget'){
      event.preventDefault();
      this.toggleWidget();
      document.body.style.position = 'fixed';
      this.setState({productID: `${event.target.pathname.slice(1)}`})
    }
  };

  closeWidget(event){
    event.preventDefault();
    this.toggleWidget();
    document.body.style.position = '';
  };

  render(){
    return (
      <>
      <div>
        <a href='https://gum.co/vnowM' onClick={this.openWidget}>UI Design Principle e-Book by Michael Filipuk</a>
      </div>
      <div>
        <a href='https://gum.co/JVVDa' onClick={this.openWidget}>Pegasus Design System Pro - Figma by Pegasus Design</a>
      </div>
      <div>
        <a href='https://gum.co/OEfbk' onClick={this.openWidget}>My Bizzy Kitchen - Skinny Pizza Dough Edition by My Bizzy Kitchen</a>
      </div>
      <div>
        <a href='https://gum.co/zABss' onClick={this.openWidget}>The 6 Figure Blueprint by trishonna</a>
      </div>
      <div>
        <a href='https://google.com/' onClick={this.openWidget}>Google</a>
      </div>
      <Widget show={this.state.showWidget} productID={this.state.productID} close={this.closeWidget} ref={this.frameRef}></Widget>
      </>
    )
  }
}

export default App;