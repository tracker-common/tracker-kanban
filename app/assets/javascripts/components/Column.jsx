class Column extends React.Component{
  render() {
    return (
      <div className="column_layout">
        <p className="column_title">
          {this.props.name}
          <Card />
        </p>
      </div>
    );
  }
};
