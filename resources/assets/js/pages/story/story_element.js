var Quintype = require("quintype-js"),
    React = require('react');

var string = require('../../utils/string');


var bigfactTemplate = require('./story_elements/sub_types/bigfact.rt'),
    blockquoteTemplate = require('./story_elements/sub_types/blockquote.rt'),
    blurbTemplate = require('./story_elements/sub_types/blurb.rt'),
    imageTemplate = require('./story_elements/image.rt'),
    jsembedTemplate = require('./story_elements/js_embed.rt'),
    qandaTemplate = require('./story_elements/sub_types/q_and_a.rt'),
    quoteTemplate = require('./story_elements/sub_types/quote.rt'),
    soundcloudTemplate = require('./story_elements/soundcloud.rt'),
    summaryTemplate = require('./story_elements/sub_types/summary.rt'),
    textTemplate = require('./story_elements/text.rt'),
    youtubeTemplate = require('./story_elements/youtube.rt');

var storyElements = {
  'bigfact': bigfactTemplate,
  'blockquote': blockquoteTemplate,
  'blurb': blurbTemplate,
  'image': imageTemplate,
  'jsembed': jsembedTemplate,
  'q-and-a': qandaTemplate,
  'quote': quoteTemplate,
  'soundcloud-audio': soundcloudTemplate,
  'summary': summaryTemplate,
  'text': textTemplate,
  'youtube-video': youtubeTemplate
}

class StoryElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storyElement: this.props.storyElement,
      config: this.props.config
    }
  }

  decodeBase64Data(data) {
    return string.base64ToUtf8(data);
  }

  focusedImageUrl(imageS3Key, imageMetadata, aspectRatio, width) {
    var image_path = new Quintype.FocusedImage(imageS3Key, imageMetadata)
                                 .path(aspectRatio, {w: width, fmt: 'pjpg', auto: 'compress'});
    return `//${this.state.config['cdn-image']}/${image_path}`;
  }

  getElementTypeOrSubtype() {
    return this.state.storyElement.subtype || this.state.storyElement.type;
  }

  render() {
    return storyElements[this.getElementTypeOrSubtype()].call(this);
  }
}

module.exports = StoryElement;
