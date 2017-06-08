class Column extends React.Component{
  constructor(props) {
    super(props);
    this.state = {showEditForm: false, state_value: '', column_name: '', label_value: ''}
    this.handleColumnNameChange = this.handleColumnNameChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      showEditForm: !this.state.showEditForm,
      column_name: this.props.data["name"]
    }));
  }

  handleColumnNameChange(event){
    this.setState({column_name: event.target.value});
  }

  handleChange(event) {
    this.setState({state_value: event.target.value});
  }

  showEditForm() {
    if(this.state.showEditForm) {
      return (
        <form className="editColumnForm">
        <div>
            <label>
              Edit column name:
              <input type="text" value={this.state.column_name} name="column_name" onChange={this.handleColumnNameChange}/>
            </label>
          <br/>
          </div>

          <div>
            <label>
              Pick the story type:
              <select value={this.state.state_value} name="state_value" onChange={this.handleChange}>
                <option value="unstarted">unstarted</option>
                <option value="started">started</option>
                <option value="delivered">delivered</option>
                <option value="finished">finished</option>
                <option value="accepted">accepted</option>
                <option value="rejected">rejected</option>
              </select>
            </label>
            <br/>
            </div>

            <div>
            <label>
              Pick the label:
              <select value={this.state.label_value} onChange={this.handleLabelChange} name="label_value">
                {this.props.d.map(function(label, i){
                  return (
                    <option value={label}>{label}</option>
                  )
                })}
              </select>
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
