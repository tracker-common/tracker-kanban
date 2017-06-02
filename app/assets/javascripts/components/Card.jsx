class Card extends React.Component {
  handleClick() {
    this.props.card["current_state"] = "rejected"
  }
  renderUserMessage(){
      if (this.props.card["current_state"] === 'delivered'){
        return (
          <span>
          <p><button>Accept</button> <button onClick={this.handleClick}>Reject</button></p>
          </span>
        );
      }
  }
  renderStoryType(){
    if(this.props.card["story_type"] === "feature") {
      return (<span className="feature"> </span>);
    }
    if(this.props.card["story_type"] === "bug") {
      return (<span className="bug"> </span>);
    }
    if(this.props.card["story_type"] === "chore") {
      return (<span className="chore"> </span>);
    }
  }
  render() {
    return (
        <div className="card">
          <p className="story_name">
            {this.renderStoryType()}
            {this.props.card["name"]}
          </p>
          <p className="summary">{this.props.card["current_state"]}</p>
          {this.renderUserMessage()}
        </div>
    );
  }
};
