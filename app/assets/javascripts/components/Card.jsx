class Card extends React.Component {
  render() {
    return (
        <div className="card">
          <p className="story_name"> {this.props.data["name"]} </p>
          <p><button>Button</button></p>
        </div>
    );
  }
};
