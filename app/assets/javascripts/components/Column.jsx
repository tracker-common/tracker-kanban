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

  showEditForm() {
    if(this.state.showEditForm) {
      return (
        <form>
        <div>
            <label>
              Custom column name:
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
          <div>
          <label>
            Pick the Position:
            <select value={this.state.position_value} onChange={this.handlePositionChange} name="position_value">
              {this.props.data.columns.map(function(label, i){
                return (
                  <option value={i}>{(i+1)}</option>
                )
              })}

               <option value={this.props.data.columns.length}>{this.props.data.columns.length+1}</option>
            </select>
          </label>
          <br/>
          </div>
          <input value={this.props.data.project_id} name="project_id" hidden></input>
        <div>
          <input type="submit" value="Submit" />
          </div>
        </form>
      )
    }
  }

  editColumn_() {
    console.log("Column is being edited!")
    this.setState(prevState => ({
      showEditForm: !this.state.showEditForm
    }));
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
