Package.describe({
  name: 'percolate:tooltips',
  summary: 'Basic qtip tooltips for Meteor',
  version: '1.0.0',
  git: 'https://github.com/percolatestudio/tooltips.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use('templating');
  api.addFiles([
    'jquery.qtip.js',
    'jquery.qtip.css',
    'tooltip.html',
    'tooltip.js'
  ], 'client');
});
