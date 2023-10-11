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
    })
    
    // Write your tests here

    test('Comment model should have seed data', async() => {
        const newComment = await Comment.create(commentsSeed[0])
        expect(newComment).toBeInstanceOf(Comment)
    })
    
    test('Like model should have seed data', async() => {
        const newLike = await Like.create(likesSeed[0])
        expect(newLike).toBeInstanceOf(Like)
    })

    test('Post model should have seed data', async() => {
        const newPost = await Post.create(postsSeed[0])
        expect(newPost).toBeInstanceOf(Post)
    })
    
    test('Profile model should have seed data', async() => {
        const newProfile = await Profile.create(profilesSeed[0])
        expect(newProfile).toBeInstanceOf(Profile)
    })

    test('User model should have seed data', async() => {
        const newUser = await User.create(usersSeed[0])
        expect(newUser).toBeInstanceOf(User)
    }
    )

    test('User association test between profile', async ()=> {
        await db.sync({force: true})
        const newUser = await User.create(usersSeed[1])
        const newProfile = await Profile.create(profilesSeed[1])

        await newUser.setProfile(newProfile)

        const associatedProfile = await newUser.getProfile()
        expect(associatedProfile).toBeInstanceOf(Profile)
    })

    test('User association test with posts', async () => {
        await db.sync({force: true})
        const newUser = await User.create(usersSeed[0])
        const postOne = await Post.create(postsSeed[0])
        const postTwo = await Post.create(postsSeed[1])

        await newUser.setPosts([postOne, postTwo])
        
        const associatedPosts = await newUser.getPosts()
        expect(associatedPosts.length).toBe(2)
        
        // Eager loading test
        const userWithPosts = await User.findByPk(1, {
            include: Post
        })
        console.log(JSON.stringify(userWithPosts, null, 2))

    })

})