const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
    return maxId + 1
}



let persons = [{
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/info', (req, res) => {
    res.send(`
    <p>Phone has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})



app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(204).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        console.log('deleted')
        persons = persons.filter(person => person.id !== id)
        res.status(200).json(person)
    } else {
        res.status(204).end()
    }
})

app.put('/api/persons/:id', (req, res) => {
    const body = req.body
    const id = Number(req.params.id)
    let person = persons.find(person => person.id === id)
    console.log(person);
    if (person) {
        personBody = {
            id: person.id,
            name: body.name,
            number: body.number
        }
        console.log(personBody)
        person = personBody
        res.json(person)

    } else {
        res.status(204).end()
    }
})


app.post('/api/persons', (req, res) => {
    const body = req.body
    const personToDelete = persons.find(person => person.name === body.name)

    if (!body.name && !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    if (personToDelete !== undefined && body.name === personToDelete.name) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    console.log('pushed')
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})