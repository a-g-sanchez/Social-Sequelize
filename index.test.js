const { Comment, Like, Post, Profile, User } = require("./index");
const { describe, test, expect } = require('@jest/globals')
const { db } = require('./db/connection.js');
const commentsSeed = require('./seed/comments.json')
const likesSeed = require('./seed/likes.json')
const postsSeed = require('./seed/posts.json')
const profilesSeed = require('./seed/profiles.json')
const usersSeed = require('./seed/users.json')

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
        await Comment.bulkCreate(commentsSeed)
        await Like.bulkCreate(likesSeed)
        await Post.bulkCreate(postsSeed)
        await Profile.bulkCreate(profilesSeed)
        await User.bulkCreate(usersSeed)
    })
    
    // Write your tests here

    test('Comment model should have seed data', async() => {
        const allComments = await Comment.findAll()
        expect(allComments[0]).toBeInstanceOf(Comment)
    })
    
    test('Like model should have seed data', async() => {
        const allLikes = await Like.findAll()
        expect(allLikes[0]).toBeInstanceOf(Like)
    })

    test('Post model should have seed data', async() => {
        const allPosts = await Post.findAll()
        expect(allPosts[0]).toBeInstanceOf(Post)
    })
    
    test('Profile model should have seed data', async() => {
        const allProfiles = await Profile.findAll()
        expect(allProfiles[0]).toBeInstanceOf(Profile)
    })

    test('User model should have seed data', async() => {
        const allUsers = await User.findAll()
        expect(allUsers[0]).toBeInstanceOf(User)
    }
    )

    


})