const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostBlogs = require('../utils/list_helper').mostBlogs
const helper = require('./test_helper')
const Blog = require('../models/blog')


describe('most blogs', () => {
    const blogs = helper.initialBlogs
    
    test('of empty list is undefined', () => {
        const result = mostBlogs([])
        assert.strictEqual(result, undefined)
    })
  
    test('when list has only one blog, return the blog author', () => {
        const listWithOneBlog = [blogs[0]]
        const expected = {
            "author": listWithOneBlog[0].author,
            "blogs": 1
        }

        const result = mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, expected)
    })
  
    test('a bigger list returns the blog author with most blogs gets returned', () => {
        const expected = {
            "author": 'Robert C. Martin',
            "blogs": 3
        }

        const result = mostBlogs(blogs)
        assert.deepStrictEqual(result, expected)
    })
})