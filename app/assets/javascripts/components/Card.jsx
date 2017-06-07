class Card extends React.Component {
  handleClick() {
    this.props.card["current_state"] = "rejected"
  }
  renderUserMessage(){
      if (this.props.card["current_state"] === 'delivered'){
        return (
          <span>
          <p><button>Accept</button></p>
          <p><button onClick={this.handleClick}>Reject</button></p>
          </span>
        );
      }
    }

  renderLabel() {
    console.log(this.props.card["labels"].length)
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
          <p className="story_name"> {this.props.card["name"]} </p>
          <p className="summary"> {this.props.card["current_state"]} </p>
          <p className="story_type"> {this.props.card["story_type"]} </p>
          {this.renderLabel()}
          {this.renderUserMessage()}
        </div>
    );
  }
};
