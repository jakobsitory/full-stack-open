const { test, describe } = require('node:test')
const assert = require('node:assert')
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const helper = require('./test_helper')
const Blog = require('../models/blog')


describe('favorite blog', () => {
    const blogs = helper.initialBlog

    test('of empty list is undefined', () => {
        const result = favoriteBlog([])
        assert.strictEqual(result, undefined)
    })
  
    test('when list has only one blog, return the blog', () => {
        const listWithOneBlog = [blogs[0]]

        const result = favoriteBlog(listWithOneBlog)
        assert.strictEqual(result, listWithOneBlog[0])
    })
    
    test('a bigger list returns the favorite blog gets returned', () =>{
        const favorite = blogs[2]

        const result = favoriteBlog(blogs)
        assert.strictEqual(result, favorite)

    })
})