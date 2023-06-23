const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const User = require('./models/user');
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./jwtauth.js");
const PORT = process.env.PORT || 5000

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve static files

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.get('/register', (req, res) => {
  res.render('register',{ error: null});
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.render('register', { error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({ username, password: hashedPassword });

    res.redirect('/login');
  } catch (error) {
    console.log(error);
    return res.render('register', { error: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    
    if (!user) {
      return res.render('login', { error: 'Invalid username' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.render('login', { error: 'Invalid password' });}
       else {
      const accessToken = createTokens(user);
      req.user = {};
      req.user.id = user._id; // Store the user object ID

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 1 * 1 * 1000, //time of 1 hr
        httpOnly: true, // storing the cookie in http so that user can't see it
      });
    }

    res.redirect('/urlshortner');
  } catch (error) {
    console.log(error);
    res.send('Error logging in');
  }
});


app.get('/urlshortner', validateToken, async (req, res) => {
  try {
    let searchQuery = req.query.q || '';
    searchQuery = searchQuery.trim();

    let shortUrls;
    if (searchQuery !== '') {
      shortUrls = await ShortUrl.find({
        $or: [
          { full: { $regex: searchQuery, $options: 'i' } },
          { short: { $regex: searchQuery, $options: 'i' } },
          { notes: { $regex: searchQuery, $options: 'i' } }
        ],
        user: req.user.id
      });
    } else {
      shortUrls = await ShortUrl.find({ user: req.user.id });
    }

    res.render('index', {
      shortUrls,
      searchResults: shortUrls,
      searchQuery
    });
  } catch (error) {
    console.log(error);
    res.send('Error fetching short URLs');
  }
});

app.post('/shortUrls', validateToken, async (req, res) => {
  const { fullUrl, notes } = req.body;
  const user = req.user.id;

  try {
    await ShortUrl.create({ full: fullUrl, notes, user });
    res.redirect('/urlshortner');
  } catch (error) {
    console.log(error);
    res.send('Error creating short URL');
  }
});

app.get('/autocomplete', validateToken, async (req, res) => {
  const query = req.query.q;

  try {
    const shortUrls = await ShortUrl.find({
      $or: [
        { full: { $regex: query, $options: 'i' } },
        { short: { $regex: query, $options: 'i' } },
        { notes: { $regex: query, $options: 'i' } }
      ],
      user: req.user.id
    }).limit(5); // Limit the autocomplete results to a maximum of 5

    res.json(shortUrls);
  } catch (error) {
    console.log(error);
    res.send('Error fetching autocomplete results');
  }
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) {
    return res.sendStatus(404);
  }

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.post('/logout', (req, res) => {
  // Clear the access token cookie
  res.clearCookie('access-token');

  // Redirect the user to the login page
  res.redirect('/login');
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
