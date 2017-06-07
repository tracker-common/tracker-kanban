class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {state_value: 'unstarted', column_name: '', label_value: 'design'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleColumnNameChange = this.handleColumnNameChange.bind(this);
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

  handleSubmit(event){

    $.ajax({
      method: 'GET',
      data: {
        project_id: this.props.data.project_id,
        state_value: this.state.state_value,
        column_name: this.state.column_name,
        label_value: this.state.label_value
      },
      url: '/project_page/createNewColumn',
    });
    console.log("State: " + this.state.state_value);
    console.log("column Name: " + this.state.column_name);
    console.log("Label Value: " + this.state.state_value);
  }


   render() {
     console.log('state', this.state)
      return (
        <div>
          <button onClick={this.createNewColumn_.bind(this)}>Create New Column</button>
          {this.showForm()}
          <div className="column_container">
                  {this.props.data.columns.map(function(column, i){
                    return (
                      <Column data={column} key={i}/>
                    )
                  })}
          </div>
        </div>
      );
   }

   showForm() {
     if (this.state.showForm) {
       return (
         <form onSubmit={this.handleSubmit} action="/project_page/createNewColumn">
         <div style={{display: 'flex', justifyContent: 'center'}}>
             <label>
               Custom column name:
               <input type="text" value={this.state.column_name} name="column_name" onChange={this.handleColumnNameChange}/>
             </label>
           <br/>
           </div>
         <div style={{display: 'flex', justifyContent: 'center'}}>
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
           </div>      <div style={{display: 'flex', justifyContent: 'center'}}>
           <label>
             Pick the label:
             <select value={this.state.label_value} onChange={this.handleLabelChange} name="label_value">
               <option value="design">design</option>
               <option value="needs design">needs design</option>
               <option value="story cards">story cards</option>
             </select>
           </label>
           <br/>
           </div>
           <input value={this.props.data.project_id} name="project_id" hidden></input>
         <div style={{display: 'flex', justifyContent: 'center'}}>
           <input type="submit" value="Submit" />
           </div>
         </form>

       );
     } else {
       return null;
     }
   }

   nameChanged(event) {
      console.log("This was called" + event.target.value);
      this.setState(prevState => ({
        name: event.target.value
      }));
   }

   handleSubmit_() {
     console.log(this.state.name)
     console.log("You have clicked submit " );
   }

   createNewColumn_() {
     console.log("This is being clicked!")
     this.setState(prevState => ({
       showForm: !this.state.showForm
     }));
   }

}
