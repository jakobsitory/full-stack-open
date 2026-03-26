const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostLikes = require('../utils/list_helper').mostLikes
const helper = require('./test_helper')
const Blog = require('../models/blog')


describe('most blogs', () => {
    const blogs = helper.initialBlog
    
    test('of empty list is undefined', () => {
        const result = mostLikes([])
        assert.strictEqual(result, undefined)
    })
  
    test('when list has only one blog, return the blog author', () => {
        const listWithOneBlog = [blogs[0]]
        const expected = {
            "author": listWithOneBlog[0].author,
            "likes": 7
        }

        const result = mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, expected)
    })
  
    test('a bigger list returns the blog author with most likes gets returned', () => {
        const expected = {
            "author": 'Edsger W. Dijkstra',
            "likes": 17
        }

        const result = mostLikes(blogs)
        assert.deepStrictEqual(result, expected)
    })
})