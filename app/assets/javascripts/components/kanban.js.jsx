class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {state_value: 'unstarted', column_name: '', label_value: this.props.d[0], position_value: 0, info: this.props.data.columns, showEditForm: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleColumnNameChange = this.handleColumnNameChange.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleUpdateCardChange = this.handleUpdateCardChange.bind(this);
    this.switchColumns = this.switchColumns.bind(this);
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
        var temp_container = current_cards[columns]["stories"]
        var temp_values = [];
         for (var card_value in temp_container) {
           for (var labels_value in temp_container[card_value]["labels"]){
             if (current_label == temp_container[card_value]["labels"][labels_value]["name"]){
                temp_values.push(card_value);
                custom_stories.push(temp_container[card_value]);
                // current_cards[columns]["stories"].splice(card_value, 1);
             }
          }
        }
        for (var i = temp_values.length -1; i >= 0; i--){
          current_cards[columns]["stories"].splice(temp_values[i],1);
        }

      }
    }
    return custom_stories;
  }

  componentDidMount() {
    console.log("mounted");
  }

  handleUpdateCardChange(name, current_state, direction) {
    translation_states = {unstarted: "READY", rejected: "READY", started:"IN-PROGRESS", delivered: "DELIVERED", finished: "FINISHED", accepted: "DONE"}
    var state = translation_states[current_state]
    var current_columns = this.state.info;
    var temp_card;

    for (var columns in current_columns) {
      if (current_columns[columns]["name"] == state) {
        for (var card in current_columns[columns]["stories"]) {
          if (name == current_columns[columns]["stories"][card]["name"]) {
            temp_card = current_columns[columns]["stories"][card];
            current_columns[columns]["stories"].splice(card, 1);
            this.switchColumns(current_columns, temp_card, direction, current_state);
          }
        }
      }
    }
  }

  switchColumns(current_columns, card, direction, current_state) {
    translation_states = {unstarted: "READY", rejected: "READY", started:"IN-PROGRESS", delivered: "DELIVERED", finished: "FINISHED", accepted: "DONE"}
    console.log("CURRENT STATE IS:", direction);
    switch (direction) {
      case 'start':
      case 'rejected':
          card["current_state"] = "started";
          var state = translation_states[card["current_state"]];
          for (var column in current_columns) {
            if (current_columns[column]["name"] == state) {
              current_columns[column]["stories"].push(card);
            }
          }
          this.setState({info: current_columns});
          break;
      case 'accepted':
      card["current_state"] = "accepted";
      var state = translation_states[card["current_state"]];
      for (var column in current_columns) {
        if (current_columns[column]["name"] == state) {
          current_columns[column]["stories"].push(card);
        }
      }
      this.setState({info: current_columns});
      break;
      case 'rejected_delivered':
          card["current_state"] = "rejected";
          var state = translation_states[card["current_state"]];
          for (var column in current_columns) {
            if (current_columns[column]["name"] == state) {
              current_columns[column]["stories"].push(card);
            }
          }
          this.setState({info: current_columns});
      break;

      case 'left':
        switch (current_state) {
          case "started":
                  card["current_state"] = "unstarted";
                  var state = translation_states[card["current_state"]];
                  for (var column in current_columns) {
                    if (current_columns[column]["name"] == state) {
                      current_columns[column]["stories"].push(card);
                    }
                  }
                  this.setState({info: current_columns});
                break;
          case "finished":
                card["current_state"] = "started";
                var state = translation_states[card["current_state"]];
                for (var column in current_columns) {
                  if (current_columns[column]["name"] == state) {
                    current_columns[column]["stories"].push(card);
                  }
                }
                this.setState({info: current_columns});
              break;
          default:
          break;
        }
      break
      case 'right':
      switch (current_state) {
        case "started":
                card["current_state"] = "finished";
                var state = translation_states[card["current_state"]];
                for (var column in current_columns) {
                  if (current_columns[column]["name"] == state) {
                    current_columns[column]["stories"].push(card);
                  }
                }
                this.setState({info: current_columns});
              break;
        case "finished":
              card["current_state"] = "delivered";
              var state = translation_states[card["current_state"]];
              for (var column in current_columns) {
                if (current_columns[column]["name"] == state) {
                  current_columns[column]["stories"].push(card);
                }
              }
              this.setState({info: current_columns});
            break;
        default:
        break;
      }
    break



      default:
      break;

    }
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

    /* Send the data using post and put the results in a div */

      $.ajax({
        type: "PUT",
        url: '/project_page/createNewColumn',
        data: {
          project_id: this.props.data.project_id,
          state_value: this.state.state_value,
          column_name: this.state.column_name,
          label_value: this.state.label_value,
          position_value: this.state.position_value,
        },
        error:function(){
         alert('Unable to create column and send information.');
        }
      });
  }



   render() {
     var id = this.props.project_id
     var filt=this.props.data
      return (
        <div>
          <button onClick={this.createNewColumn_.bind(this)}>Create New Column</button>
          {this.showForm()}
          <div className="column_container">
                  {this.state.info.map(function(column, i){
                    return (
                      <Column data={column} id={id} filter={filt} key={i} onChange={this.handleUpdateCardChange}/>
                    )
                  }.bind(this))}
          </div>
        </div>
      );
   }

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
