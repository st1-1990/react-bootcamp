const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3001

app.listen(PORT, () => {           /** Aca se pasa un callback ya que el servidor ne inicia de forma asincrona, osea que le decimos que cuando termine de ejecutar el servidor ejecute el conslo.log*/
  console.log(`Server running on port ${PORT}`)
})

app.use(cors())
app.use(express.json()) /* Con este le decimos que soporte las request y luego las parsee para tenerlo disponible en el request.body */

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/api/notes/:id', (request, response) => { /* Aca recuperamos la nota cuyo id sea igual al que le enviamos en la request*/
    const id = Number(request.params.id  )           /* Aca debemos pasar a number el id ya que todo lo que se envie por el request se toma como string */
    const note = notes.find(note => note.id === id)

    if(note){
        response.json(note)
    } else{
        response.status(404).end()
    }
    
  })
  app.delete('/api/notes/:id', (request, response) => { 
    const id = Number(request.params.id  )           /* leminamos un nota, pero para esto se necesita de una herramienta como postman o REST Clinet */
    const note = notes.find(note => note.id === id)
    response.status(204).end

  })

  app.post('/api/notes', (request, response) =>{
    const note = request.body

    if(!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max (...ids)

    const newNote = {
        id: maxId +1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    /* notes = [...notes, newNote] */
    notes = notes.concat(newNote)

    response.json(note)
  })
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })
  
