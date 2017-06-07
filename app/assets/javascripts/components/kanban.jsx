class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <div>
         <form onSubmit={this.handleSubmit}>
          <label>
            Custom Column Name:
            <input type="text" />
          </label>
          <br/>

        <div className="radio">
          <label>
            <input type="radio" value="option1" checked={true} />
            Option 1
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option2" />
            Option 2
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option3" />
            Option 3
          </label>
        </div>
          
          <br/>
          <input type="submit" value="Submit" />
        </form>

      </div>
       );
     } else {
       return null;
     }
   }

   createNewColumn_() {
     console.log(this)
     this.setState(prevState => ({
       showForm: !this.state.showForm
     }));
   }

}