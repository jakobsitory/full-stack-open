const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://fullstack:${password}@cluster0.vl1rfci.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

if (!password) {
  console.log('give password as argument')
  process.exit(1)
}


mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (!name && !number) {
  return Contact.find()
  .then(result => {
      console.log("phonebook:")
      result.forEach(contact => {
        console.log(`${contact.name} ${contact.number} `)
      })
      mongoose.connection.close()
      process.exit(1)
    })
}

if (name && number) {
  // Create new contact
  const contact = new Contact({
    name: name,
    number: number,
  })

  return contact.save()
  .then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    process.exit(1)
  })
}

console.log ('provide a name and number to create a new contact')
mongoose.connection.close()
process.exit(1)