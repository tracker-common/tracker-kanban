class Card extends React.Component {
  render(){
    return (
        <div className="card">
          <p className="story_name">{this.props.data["name"]} </p>
          <p className="summary"> {this.props.data["current_state"]} </p>
        </div>
    );
  }
};
