var React = require('react');

var bigfactTemplate = require('./sub_types/bigfact.rt'),
    blockquoteTemplate = require('./sub_types/blockquote.rt'),
    blurbTemplate = require('./sub_types/blurb.rt'),
    qandaTemplate = require('./sub_types/q_and_a.rt'),
    quoteTemplate = require('./sub_types/quote.rt'),
    summaryTemplate = require('./sub_types/summary.rt'),
    textTemplate = require('./text.rt');

var textElementType = {
  'bigfact': bigfactTemplate,
  'blockquote': blockquoteTemplate,
  'blurb':blurbTemplate,
  'q-and-a':qandaTemplate,
  'quote':quoteTemplate,
  'summary':summaryTemplate,
  'text': textTemplate
}

class TextElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      element: this.props.storyElement
    }
  }

  getElementTypeOrSubtype() {
    return this.state.element.subtype || this.state.element.type;
  }

  render() {
    return textElementType[this.getElementTypeOrSubtype()].call(this);
  }
};

module.exports = TextElement;
