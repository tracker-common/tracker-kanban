class Column extends React.Component{
  constructor(props) {
    super(props);
    this.state = {showEditForm: false, state_value: '', column_name: '', label_value: ''}
  }

  customColEdit() {
    if(this.props.data["name"] !== "READY"
      && this.props.data["name"] !== "IN-PROGRESS"
      && this.props.data["name"] !== "FINISHED"
      && this.props.data["name"] !== "DELIVERED"
      && this.props.data["name"] !== "DONE") {
      return (
        <span> <button className="editButton" onClick={this.editColumn_.bind(this)}> </button>{this.showEditForm()}</span>
      )
    }
  }

  editColumn_() {
    console.log("Column is being edited!")
    this.setState(prevState => ({
      showEditForm: !this.state.showEditForm
    }));
  }

  showEditForm() {
    if(this.state.showEditForm) {
      return (
        <form>
        <div>
            <label>
              Edit column name:
              <input type="text" value={this.state.column_name} name="column_name" onChange={this.handleColumnNameChange}/>
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
