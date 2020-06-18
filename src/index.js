import React from 'react';
import ReactDOM from 'react-dom';

class Intro extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div className="egg-intro-container">
    <h2 className="intro-eggland">You are the king of eggland. The population of eggs has boomed over the last few years. You must execute them all...</h2>
    <div className="start-container">
    <img className="slip" src="slip.png"/>
    </div>
    </div>)
  }
}
class Clicker extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      population:Math.random()*(10**8),
      rateOfDecrease:1,
      priceOfDecay:10,
      numberKilled:0,
      errMsg:"",
    };
    this.clicker="";
    this.handleUpgrade = this.handleUpgrade.bind(this)
  }
  componentDidMount(){
    this.tick = setInterval(()=>{this.setState({
      population:this.state.population - this.state.rateOfDecrease,
      numberKilled:this.state.numberKilled + this.state.rateOfDecrease
    });
    if(this.state.population < 0 | this.state.population ===0){
      clearInterval(this.tick);
      this.setState({
        population:0
      })
      alert("You have won. You have killed all eggs. But at what cost?")
    } },2000);
    this.setState({
      population:Math.ceil(5000000),
      rateOfDecrease:1,
      priceOfDecay:10,
      numberKilled:0,
      errMsg:"",
    })
    console.log(this.state);
  }
  componentWillUnmount() {
    this.tock = clearInterval(this.tick);
  }
  upgrade(){
    this.setState({
      rateOfDecrease:this.state.rateOfDecrease+4,
      priceOfDecay:this.state.priceOfDecay+42
      })
  }
  buy(){
    this.setState({
      numberKilled: this.state.numberKilled-this.state.priceOfDecay,
    })
    this.upgrade()
  }
  handleUpgrade(e){
    if(this.state.numberKilled>=this.state.priceOfDecay){
      this.buy()
      this.setState({
        errMsg:""
      })
    }
    else{
      this.setState({
        errMsg:"Not enough eggs"
      })
    }
  }
  render(){
    return (
      <div className="egg-container">
      <p className="egg-error">{this.state.errMsg}</p>
      <img className="egg-picture" src="Ellipse 1.png" width={(this.state.population/(1.8*10**4)).toString()+"px"} onClick={()=>{
        if(this.state.population > 0){
        this.setState({
          population:this.state.population - this.state.rateOfDecrease,numberKilled:this.state.numberKilled + this.state.rateOfDecrease
        });
        }
    }}/>
    <div className="egg-stats-container">
      <p className="egg-stats">number of eggs killed: {this.state.numberKilled}</p>
      <p className="egg-stats">rate of decrease: {this.state.rateOfDecrease}</p>
      <p className="egg-stats">population: {this.state.population}</p>
      </div>
      <button className="egg-upgrade"  onClick={this.handleUpgrade}>increase the number of eggs killed! costs {this.state.priceOfDecay} dead eggs</button>
      </div>
    )
  }
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      scene:true
    }
    this.onCLickChange = ()=>(this.setState({
      scene:<><Clicker/></>
    })).bind(this)
  }
  componentDidMount(){
    this.setState({
      scene:true
    })
  }
  render(){
    let scene = this.state.scene===true? <><Intro/><br/><div className="start-container"><button className="egg-start" onClick={()=>(this.setState({
      scene:<><Clicker/></>
    }))}>Start!</button></div></>:<><Clicker/></>;
    return (<>
      {scene}
      </>
    )
  }
}
ReactDOM.render(<App/>,document.getElementById("root"))
//credits-slip for the backstory