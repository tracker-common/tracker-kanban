class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

   render() {
     console.log('state', this.state)
      return (
        <div>
          <button onClick={this.doTheThing_.bind(this)}>Click me</button>
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
       return (<div>OFREARM</div>);
     } else {
       return null;
     }
   }

   doTheThing_() {
     console.log(this)
     this.setState(prevState => ({
       showForm: !this.state.showForm
     }));
   }
}
