class Card extends React.Component {
  handleRejectClick() {
    console.log("You have Rejected")
  }
  handleAcceptClick() {
    console.log("You have Accepeted")
  }
  handleStartClick() {
    console.log("You have Started")
  }

  renderUserMessage(){
      if (this.props.card["current_state"] === 'delivered'){
        return (
          <span>
            <p><button onClick={this.handleAcceptClick}>Accept</button>
            <span> </span>
            <button onClick={this.handleRejectClick}>Reject</button></p>
          </span>
        );
      } else if (this.props.card["current_state"] === 'unstarted') {
        return (
          <span>
            <p><button onClick={this.handleStartClick}>Start</button></p>
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
  renderLabel() {
    if (this.props.card["labels"].length != 0){
      return (
        <span>
        <p>{this.props.card["labels"][0]["name"]}</p>
        </span>
      );
    }
  }
  render() {
    return (
        <div className="card">
          <p className="story_name">
            {this.renderStoryType()}
            {this.props.card["name"]}
          </p>
          <p className="summary"> {this.props.card["current_state"]} </p>
          {this.renderLabel()}
          {this.renderUserMessage()}
        </div>
    );
  }
};
