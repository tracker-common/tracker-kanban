class Column extends React.Component{
  constructor(props) {
    super(props);
    this.state = {showEditForm: false, state_value: '', column_name: '', label_value: '', position_value: 0}
    this.handleColumnNameChange = this.handleColumnNameChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(props.handleUpdate);
    this.handleUpdate = props.handleUpdate;
    console.log("YDRGJUH", this.handleUpdate);
    console.log(props);
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

  handlePositionChange(event){
    this.setState({position_value: event.target.value});
  }

  handleLabelChange(event){
    this.setState({label_value: event.target.value});
  }

  retrieveCards() {
    console.log("retrieving");
    var current_cards = this.props.filter.columns;
    var current_state = this.state.state_value;
    var current_label = this.state.label_value;
    var custom_stories = []
    translation_states = {unstarted: "READY", rejected: "READY", started:"IN-PROGRESS", delivered: "DELIVERED", finished: "FINISHED", accepted: "DONE"}
    var state = translation_states[current_state]
    for (var columns in current_cards) {
      if (current_cards[columns]["name"] == state) {
        for (var card_value in current_cards[columns]["stories"]) {
          for (var label_value in current_cards[columns]["stories"][card_value]["labels"]) {
            if (current_label == current_cards[columns]["stories"][card_value]["labels"][label_value]["name"]) {
              custom_stories.push(current_cards[columns]["stories"][card_value]);
              current_cards[columns]["stories"].splice(card_value, 1);
            }
          }
        }
      }
    }
    return custom_stories;
  }

  handleSubmit(event){
    //this.handleUpdate(this.props.data.name, this.state)
    var x = this.handleUpdate(this.props.data.name, this.state);
    console.log(x);
    event.preventDefault();
    // console.log("Name state: "+this.state.column_name+" Story state: "+this.state.state_value+" Label state: "+this.state.label_value+" Position state: "+this.state.position_value);
    // var s = this.retrieveCards()
    // var column = {name: this.state.column_name, stories: s}
    // var l = this.props.filter.columns
    // l.splice(this.state.position_value, 0, column);
    // this.setState({info: l})

    // $.ajax({
    //   method: 'PUT',
    //   data: {
    //     state_value: this.state.state_value,
    //     column_name: this.state.column_name,
    //     label_value: this.state.label_value,
    //     position_value: this.state.position_value,
    //   },
    //   url: '/project_page/editColumn',
    // });
    // console.log("column has been changed")
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
                  <option value={label}>{label}</option>
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
              <input type="submit" value="Submit" />
            </div>
        </form>
      )
    }
  }

  render() {
    return (
      <div className="column_layout">
        <div className="column_title">
            {this.props.data["name"]}
            {this.customColEdit()}
        </div>
        {this.props.data.stories.map(function(card, i){
          return (
            <Card card={card} key={i}/>
          )
        })}
      </div>
    );
  }
};
