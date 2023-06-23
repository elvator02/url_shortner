const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  shortUrls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShortUrl'
  }]
});

module.exports = mongoose.model('User', userSchema);
