class App extends React.Component {
   render() {
      return (
         <div>
            <div className="column_container">
                  {console.log(this.props.data)}
                  {this.props.data.columns.map(function(column, i){
                    return (
                      <Column name={column} key={i}/>
                    )
                  })}
              </div>
         </div>
      );
   }
}
