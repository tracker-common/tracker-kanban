
class App extends React.Component {
   render() {
      return (
         <div>
            <Header/>
            <div className="column_container">
                  {console.log(this.props.data)}
                  {this.props.data.columns.map(function(column, i){
                    return (
                      <Column name={column} key={i}/>
                    )
                  })}
              </div>
            <Column />
         </div>
      );
   }
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Header</h1>
         </div>
      );
   }
}

class TableRow extends React.Component {
   render() {
      return (
         <tr>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.age}</td>
         </tr>
      );
   }
}
