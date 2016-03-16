var getContent = function(template) {
  var data = Blaze.getData(template.view);
  if (data && data.template) {
    var div = $('<div class="content">').get(0);

    if (_.has(data, 'data'))
      Blaze.renderWithData(Template[data.template], data.data, div);
    else
      Blaze.render(Template[data.template], div);

    // we flush here to ensure that Blaze has actually put content down already
    //   (qtip is about to use the content to position the tooltip)
    //
    // For this reason at the moment, tooltips can't change size reactively.
    Tracker.flush();
    return div;
  } else {
    return template.$('.tooltip-content').clone();
  }
};

Template.tooltip.rendered = function() {
  var self = this;

  var options = {
    content: {
      text: function() { return getContent(self); }
    },
    position: {
      container: self.$('.tooltip-trigger').parents('.content'),
      viewport: true,
      my: 'top center',
      at: 'bottom center',
      adjust: {method: 'shift flip'}
    },
    style: {
      classes: 'tooltip',
      tip: {
        corner: true,
        width: 8,
        height: 5
      }
    },

    show: {
      solo: true
    },
    hide: {
      delay: 500,
      fixed: true
    }
  };

  if (self.data) {
    if (self.data.mode === 'click') {
      options.show.event = 'click';
      options.hide.event = 'unfocus';
      options.hide.delay = 0;
    }
    if (self.data.mode === 'toggle') {
      options.show.event = 'click';
      options.hide.event = 'click unfocus';
      options.hide.delay = 0;
    }
    delete self.data.mode;
  }
  self.qtip = self.$('.tooltip-trigger').qtip(options).qtip('api');
};

Template.tooltip.destroyed = function() {
  if (this.qtip)
    this.qtip.destroy();
};