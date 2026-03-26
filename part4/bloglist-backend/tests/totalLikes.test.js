const { test, describe } = require('node:test')
const assert = require('node:assert')
const totalLikes = require('../utils/list_helper').totalLikes
const helper = require('./test_helper')
const Blog = require('../models/blog')


describe('total likes', () => {
    const blogs = helper.initialBlog
    
    test('of empty list is zero', () => {
        const result = totalLikes([])
        assert.strictEqual(result, 0)
    })
  
    test('when list has only one blog, equals the likes of that', () => {
        const listWithOneBlog = [blogs[0]]

        const result = totalLikes(listWithOneBlog)
        assert.strictEqual(result, listWithOneBlog[0].likes)
    })
    
    test('a bigger list is calculated right', () =>{
        let likeCount = 0
    
        blogs.map(blog => {
            likeCount += blog.likes
        })

        const result = totalLikes(blogs)
        assert.strictEqual(result, likeCount)

    })
})