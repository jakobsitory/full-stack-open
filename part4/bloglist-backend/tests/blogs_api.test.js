// const assert = require('node:assert')
// const { test, after, beforeEach } = require('node:test')
// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const app = require('../app')
// const helper = require('./test_helper')
// const Note = require('../models/note')

// const api = supertest(app)

// beforeEach(async () => {
//   await Note.deleteMany({})
//   await Note.insertMany(helper.initialNotes)
// })

// test('notes are returned as json', async () => {
//   await api
//     .get('/api/notes')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('all notes are returned', async () => {
//   const notes = await helper.notesInDb()

//   assert.strictEqual(notes.length, helper.initialNotes.length)
// })

// test('a valid note can be added ', async () => {
//   const newNote = {
//     content: 'async/await simplifies making async calls',
//     important: true,
//   }

//   await api
//     .post('/api/notes')
//     .send(newNote)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const notesAtEnd = await helper.notesInDb()
//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

//   const contents = notesAtEnd.map((n) => n.content)
//   assert(contents.includes('async/await simplifies making async calls'))
// })

// after(async () => {
//   await mongoose.connection.close()
// })
