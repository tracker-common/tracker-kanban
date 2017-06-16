class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleCardLeft = this.handleCardLeft.bind(this);
    this.handleCardRight = this.handleCardRight.bind(this);
    this.handleRejectClick = this.handleRejectClick.bind(this);
    this.handleAcceptClick = this.handleAcceptClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.state = {position_value: this.props.position_value};
  }
  handleRejectClick(event) {
    this.props.onChangeCard(this.props.card["name"], this.state.position_value, this.props.card["current_state"], "rejected_delivered", this.props.columnName);
  }
  handleAcceptClick() {
    this.props.onChangeCard(this.props.card["name"], this.state.position_value, this.props.card["current_state"], "accepted", this.props.columnName);
  }
  handleStartClick() {
    this.props.onChangeCard(this.props.card["name"], this.state.position_value, this.props.card["current_state"], "start", this.props.columnName);
  }
  handleCardLeft() {
    console.log("IN LEFT")
    this.props.onChangeCard(this.props.card["name"], this.state.position_value, this.props.card["current_state"], "left", this.props.columnName);
  }
  handleCardRight() {
    console.log("IN RIGHT")
    this.props.onChangeCard(this.props.card["name"], this.state.position_value, this.props.card["current_state"], "right", this.props.columnName);
  }

  renderUserMessage(){
      if (this.props.card["current_state"] === 'delivered'){
        return (
          <span>
            <p><button className="reject_button" onClick={this.handleRejectClick.bind(this)}>Reject</button>
            <span> </span>
            <button className="accept_button" onClick={this.handleAcceptClick.bind(this)}>Accept</button></p>
          </span>
        );
       } 
      else if (this.state.position_value === 0){
        return (
          <span>
            <p><button className="direction_button_right" onClick={this.handleCardRight.bind(this)}>⇨</button></p>
          </span>
        )
      }
      else if (this.state.position_value === (this.props.last_position)){
        return (
          <span>
            <p><button className="direction_button_left" onClick={this.handleCardLeft.bind(this)}>⇦</button></p>
          </span>
        )
      }
      else {
        return (
          <span>
            <p><button className="direction_button_right" onClick={this.handleCardRight.bind(this)}>⇨</button>
            <span> </span>
            <button className="direction_button_left" onClick={this.handleCardLeft.bind(this)}>⇦</button></p>
          </span>
        )
      }
  }
  renderLabel() {
    if (this.props.card["labels"].length != 0){
      return (
        <span>
        <p className="labels">{this.props.card["labels"][0]["name"]}</p>
        </span>
      );
    }
  }
  render() {
    return (
        <div className="card">
          <p className="card_title">
            {this.props.card["story_type"]}
          </p>
          <p className="name"> {this.props.card["name"]} </p>
          {this.renderLabel()}
          {this.renderUserMessage()}
        </div>
    );
  }
}
