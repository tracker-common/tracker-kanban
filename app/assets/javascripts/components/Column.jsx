class Column extends React.Component{
  constructor(props) {
    super(props);
    this.state = {showEditForm: false, state_value: '', column_name: '', label_value: ''}
    this.handleChange = this.handleChange.bind(this);
  }

  customColEdit() {
    if(this.props.data["name"] !== "READY" && this.props.data["name"] !== "IN-PROGRESS" && this.props.data["name"] !== "FINISHED" && this.props.data["name"] !== "DELIVERED" && this.props.data["name"] !== "DONE") {
      return (
        <span> <button className="editButton" onClick={this.editColumn_.bind(this)}> </button>{this.showEditForm()}</span>
      )
    }
  }

  editColumn_() {
    this.setState(prevState => ({
      showEditForm: !this.state.showEditForm
    }));
  }

  handleChange(event) {
     console.log("You are in Column: ", event.target.value);
     var value = event.target.value;
     console.log(this.props.onChangeInput);
 }

  showEditForm() {
    console.log("X", this.props.callbackFromParent);
    if(this.state.showEditForm) {
      return (
        <form>
        <div>
            <label>
              Edit column name:
              <input type="text" value={this.props.value} onChange={this.handleChange}/>
            </label>
          <br/>
          </div>
        </form>
      )
    }
  }

  render() {
    return (
      <div className="column_layout">
        <p className="column_title">
            {this.props.data["name"]}
            {this.customColEdit()}
        </p>
        {this.props.data.stories.map(function(card, i){
          return (
            <Card card={card} key={i}/>
          )
        })}
      </div>
    );
  }
};
