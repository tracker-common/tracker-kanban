class App extends React.Component {
   render() {
      return (
         <div className="column_container">
                  {this.props.data.columns.map(function(column, i){
                    return (
                      <Column data={column} key={i}/>
                    )
                  })}
            </div>
      );
   }
}
