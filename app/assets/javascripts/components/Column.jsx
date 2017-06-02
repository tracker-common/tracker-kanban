class Column extends React.Component{

  render() {
    return (
      <div className="column_layout">
        <p className="column_title">
            {this.props.data["name"]}
        </p>
        {this.props.data.stories.map(function(card, i){
          return (
            <Card card={card} key={i}/>
          )
        })}
      </div>
    );
  }
};
