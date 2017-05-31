class Kanban extends React.Component {
  render () {
    return (
      <div>
        <div> {this.props.text} </div>
      </div>
    );
  }
}

Kanban.propTypes = {
  text: React.PropTypes.string
}
