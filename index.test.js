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

    test('User can have one profile', async ()=> {
        await db.sync({force: true})
        const newUser = await User.create(usersSeed[1])
        const newProfile = await Profile.create(profilesSeed[1])

        await newUser.setProfile(newProfile)

        const associatedProfile = await newUser.getProfile()
        expect(associatedProfile).toBeInstanceOf(Profile)
    })

    test('User can have many posts', async () => {
        await db.sync({force: true})
        const newUser = await User.create(usersSeed[0])
        const postOne = await Post.create(postsSeed[0])
        const postTwo = await Post.create(postsSeed[1])

        await newUser.setPosts([postOne, postTwo])
        
        const associatedPosts = await newUser.getPosts()
        expect(associatedPosts.length).toBe(2)
        expect(associatedPosts[0]).toBeInstanceOf(Post)
        
        // Eager loading test
        // const userWithPosts = await User.findByPk(1, {
        //     include: Post
        // })
        // console.log(JSON.stringify(userWithPosts, null, 2))

    })

    test('Post can have many comments', async() => {
        await db.sync({force: true})
        const newPost = await Post.create(postsSeed[1])
        const comments = await Comment.bulkCreate(commentsSeed)

        await newPost.setComments(comments)

        const associatedComents = await newPost.getComments()
        expect(associatedComents.length).toBe(5)
        expect(associatedComents[1]).toBeInstanceOf(Comment)
        // console.log(JSON.stringify(associatedComents, null, 2))
    })

    test('Likes can have many Users', async() => {
        await db.sync({force: true})
        const newLike = await Like.create(likesSeed[0])
        const userOne = await User.create(usersSeed[0])
        const userTwo = await User.create(usersSeed[1])

        // ASK ABOUT SETUSERS VS ADDUSER
        await newLike.addUser(userOne)
        await newLike.addUser(userTwo)

        // await newLike.setUsers(userOne)
        // await newLike.setUsers(userTwo)

        const associatedUsers = await newLike.getUsers()
        expect(associatedUsers.length).toBe(2)
        expect(associatedUsers[0]).toBeInstanceOf(User)

        
        console.log(JSON.stringify(associatedUsers, null, 2))
    })

})