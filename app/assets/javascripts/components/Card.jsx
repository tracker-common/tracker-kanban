class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleCardLeft = this.handleCardLeft.bind(this);
    this.handleCardRight = this.handleCardRight.bind(this);
    this.handleRejectClick = this.handleRejectClick.bind(this);
    this.handleAcceptClick = this.handleAcceptClick.bind(this);
    this.handleStartClick - this.handleStartClick.bind(this);
  }
  handleRejectClick(event) {
    this.props.onChangeCard(this.props.card["name"] ,this.props.card["current_state"], "rejected_delivered", this.props.columnName);
  }
  handleAcceptClick() {
    this.props.onChangeCard(this.props.card["name"] ,this.props.card["current_state"], "accepted", this.props.columnName);
  }
  handleStartClick() {
    this.props.onChangeCard(this.props.card["name"] ,this.props.card["current_state"], "start", this.props.columnName);
  }
  handleCardLeft() {
    this.props.onChangeCard(this.props.card["name"] ,this.props.card["current_state"], "left", this.props.columnName);
  }
  handleCardRight() {
    this.props.onChangeCard(this.props.card["name"] ,this.props.card["current_state"], "right", this.props.columnName);
  }

  renderUserMessage(){
      if (this.props.card["current_state"] === 'delivered'){
        return (
          <span>
            <p><button onClick={this.handleAcceptClick.bind(this)}>Accept</button>
            <span> </span>
            <button onClick={this.handleRejectClick.bind(this)}>Reject</button></p>
          </span>
        );
      } else if (this.props.card["current_state"] === 'unstarted' || this.props.card["current_state"] === 'rejected' ) {
        return (
          <span>
            <p><button onClick={this.handleStartClick.bind(this)}>Start</button></p>
          </span>
        );
      }
      if (this.props.card["current_state"] !== 'accepted'){
        return (
          <span>
            <p><button onClick={this.handleCardLeft.bind(this)}>⇦</button>
            <span> </span>
            <button onClick={this.handleCardRight.bind(this)}>⇨</button></p>
          </span>
        )
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
}
