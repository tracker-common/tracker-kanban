class Column extends React.Component{
  constructor(props) {
    super(props);
    this.state = {showEditForm: false, state_value: '', column_name: '', label_value: '', position_value: 0, max_value: 5}
    this.handleColumnNameChange = this.handleColumnNameChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = props.handleUpdate;
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
    var labels = new Set();
    for (var i = 0; i < this.props.filter.columns.length; i++) {
      var value = this.props.filter.columns[i]
      for (var j = 0; j < value["stories"].length; j++) {
        var story = value["stories"][j]
        if (story["labels"][0] != null) {
          labels.add(story["labels"][0]["name"])
        }
      }
    }
    var lTitles = [];
    labels.forEach(function(value) {
      lTitles.push(value);
    });

    this.setState(prevState => ({
      showEditForm: !this.state.showEditForm,
      column_name: this.props.data["name"],
      label_value: lTitles[0],
      state_value: "unstarted",
      max_value: 3
    }));
  }

  handleColumnNameChange(event){
    this.setState({column_name: event.target.value});
  }

  handleChange(event) {
    this.setState({state_value: event.target.value});
  }

  handlePositionChange(event){
    this.setState({position_value: event.target.value});
  }

  handleLabelChange(event){
    this.setState({label_value: event.target.value});
  }


  handleMaxChange(event){
    this.setState({max_value: event.target.value});
  }

  handleSubmit(event){
    //this.handleUpdate(this.props.data.name, this.state)
    //console.log(this.state.column_name)
    this.handleUpdate(this.props.data.name, this.state, this.state.column_name);
    //console.log(x);
    event.preventDefault();
  }

  showEditForm() {
    var labels = new Set();
    for (var i = 0; i < this.props.filter.columns.length; i++) {
      var value = this.props.filter.columns[i]
      for (var j = 0; j < value["stories"].length; j++) {
        var story = value["stories"][j]
        if (story["labels"][0] != null) {
          labels.add(story["labels"][0]["name"])
        }
      }
    }
    var lTitles = [];
    labels.forEach(function(value) {
      lTitles.push(value);
    });

    if(this.state.showEditForm) {

      return (
        <form className="editColumnForm" onSubmit={this.handleSubmit}>
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
              <select value={this.state.label_value} name="label_value" onChange={this.handleLabelChange}>
              {lTitles.map(function(label, i){
                return(
                  <option value={label} key={i}>{label}</option>
                  )
              })}
              </select>
            </label>
            </div>

            <div>
            <label>
            Pick the position:
              <select value={this.state.position_value} name="position_value" onChange={this.handlePositionChange}>
              {this.props.filter.columns.map(function(label, i){
                return(
                  <option value={i} key={i}>{i+1}</option>
                  )
              })}
              </select>
            </label>
            </div>

            <div>
            <label>
            Max stories shown:
              <select value={this.state.max_value} name="max_value" onChange={this.handleMaxChange}>
                <option value={1}>{1}</option>
                <option value={2}>{2}</option>
                <option value={3}>{3}</option>
                <option value={4}>{4}</option>
                <option value={5}>{5}</option>
                <option value={6}>{6}</option>
                <option value={7}>{7}</option>
                <option value={8}>{8}</option>
                <option value={9}>{9}</option>
                <option value={10}>{10}</option>
              </select>
            </label>
            <br/>
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
        </form>
      )
    }
  }

  render() {
    var self = this;
    return (
      <div className="column_layout">
        <div className="column_title">
            {this.props.data["name"]}
            {this.customColEdit()}
        </div>
        {this.props.data.stories.map(function(card, i){
          if (i < self.state.max_value){
            return (
              <Card card={card} key={i}/>
            )
          }
        })}
      </div>
    );
  }
};
