require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'TheRiceBot',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'thericefields',
    results: 25
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {

    if (comment.author === 'TheRiceBot') {
	return;
}

    if (comment.body === ':(') {
        console.log('Turned 1 frown horizontally.');
        comment.reply('Lets turn that "(" around horizontally! :)\n- - -\n^^^I ^^^am ^^^a ^^^bot. ^^^| ^^^[Contact](https://www.reddit.com/message/compose/?to=stebulous) ^^^| ^^^[GitHub](https://github.com/Crystal-Development/reddit-rice-bot)');
    }

    if (/\brice\b/g.test(comment.body)) {
        console.log('Reacted to 1 person saying "rice"');
        comment.reply('Heh.\n- - -\n^^^I ^^^am ^^^a ^^^bot. ^^^| ^^^[Contact](https://www.reddit.com/message/compose/?to=stebulous) ^^^| ^^^[GitHub](https://github.com/Crystal-Development/reddit-rice-bot)');
    }
});
