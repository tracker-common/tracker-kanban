
class App extends React.Component {
   render() {
      return (
         <div className="column_container">
            <div className="column_title">
            STORIES
                  {this.props.data.unstarted.map(function(column, i){
                    return (
                      <div className="column_layout">
                        <Card data={column} key={i}/>
                    </div>
                    )
                  })}
            </div>

            <div className="column_title">
            IN-PROGRESS
            {this.props.data.inProgress.map(function(column, i){
              return (
                <div className="column_layout">
                  <Card data={column} key={i}/>
              </div>
              )
            })}
            </div>

            <div className="column_title">
            DELIVERED
            {this.props.data.delivered.map(function(column, i){
              return (
                <div className="column_layout">
                  <Card data={column} key={i}/>
              </div>
              )
            })}
            </div>

            <div className="column_title">
            ACCEPTED
            {this.props.data.accepted.map(function(column, i){
              return (
                <div className="column_layout">
                  <Card data={column} key={i}/>
              </div>
              )
            })}
            </div>
         </div>
      );
   }
}
