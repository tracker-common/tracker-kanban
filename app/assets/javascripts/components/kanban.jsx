class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {state_value: 'unstarted', column_name: '', label_value: this.props.d[0], position_value: 0, info: this.props.data.columns, showEditForm: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleColumnNameChange = this.handleColumnNameChange.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    // this.requestLiveUpdate = this.requestLiveUpdate.bind(this);
  }

  retrieveCards() {
    var current_cards = this.state.info;
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

  componentDidMount() {
    console.log("It mounted");
  }

  handleChange(event) {
    this.setState({state_value: event.target.value});
  }

  handleLabelChange(event){
    this.setState({label_value: event.target.value});
  }

  handleColumnNameChange(event){
    this.setState({column_name: event.target.value});
  }

  handlePositionChange(event){
    this.setState({position_value: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    var s = this.retrieveCards();
    var column = {name: this.state.column_name, stories: s};
    var l = this.state.info;
    l.splice(this.state.position_value, 0, column);
    this.setState({info: l});

    $.ajax({
      method: 'GET',
      data: {
        project_id: this.props.data.project_id,
        state_value: this.state.state_value,
        column_name: this.state.column_name,
        label_value: this.state.label_value,
        position_value: this.state.position_value,
      },
      url: '/project_page/createNewColumn',
    });
  }



   render() {
     var id = this.props.project_id
     var filt=this.props.data
     //alert(filt.columns)
    //  console.log('state', this.state)
    //  console.log(this.props.data.columns)
      return (
        <div>
          <button onClick={this.createNewColumn_.bind(this)}>Create New Column</button>
          {this.showForm()}
          <div className="column_container">
                  {this.state.info.map(function(column, i){
                    return (
                      <Column data={column} id={id} filter={filt} key={i} />
                    )
                  })}
          </div>
        </div>
      );
   }

  //  requestLiveUpdate(state) {
  //    // setInterval(function(){
  //          // get parameters
  //         var token = this.props.token;
  //         var projectId = this.props.project_id
   //
  //           // compose request URL
  //         var url = 'https://www.pivotaltracker.com/services/v5';
  //         url += '/projects/' + projectId;
  //         url += '/?fields=name,stories(id,name,current_state,story_type,labels)';
   //
  //         // do API request to get story names
  //         $.ajax({
  //           url: url,
  //           beforeSend: function(xhr) {
  //             xhr.setRequestHeader('X-TrackerToken', token);
  //           }
  //         }).done(function(project) {
  //           let info = state.info;
  //           console.log(info);
   //
  //           for (var index in project["stories"]){
  //             let v = project["stories"][index].current_state;
  //             switch(v) {
  //                case "unstarted":
  //                for (column_value in info){
  //                  if (info[column_value] == "READY") {
   //
  //                  }
  //                }
  //                break;
  //                case "started":
  //                break;
  //                case "delivered":
  //                break;
  //                case "finished":
  //                break;
  //                case "accepted":
  //                break;
  //                case "rejected":
  //                break;
  //                default:
  //              }
  //           }
  //          });
   //
  //    // }, 10000);
   //
  //  }

   showForm() {
     if (this.state.showForm) {
       return (
         <form onSubmit={this.handleSubmit} action="/project_page/createNewColumn">
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
       );
     } else {
       return null;
     }
   }

   nameChanged(event) {
      this.setState(prevState => ({
        name: event.target.value
      }));
   }

   createNewColumn_() {
     this.setState(prevState => ({
       showForm: !this.state.showForm
     }));
   }

}
