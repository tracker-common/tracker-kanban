class Card extends React.Component {
  render(){
    return (
        <div className="card">
          <p className="story_name"> {this.props.card["name"]} </p>
          <p className="summary"> {this.props.card["current_state"]} </p>
          <p><button>Button</button></p>
        </div>
    );
  }
};
