const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
const api = supertest(app)

const blogs = [
  {
      id:"5a422a851b54a676234d17f7",
      title:"React patterns",
      author:"Michael Chan",
      url:"https://reactpatterns.com/",
      likes:7
  },
  {
      id:"5a422aa71b54a676234d17f8",
      title:"Go To Statement Considered Harmful",
      author:"Edsger W. Dijkstra",
      url:"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes:5
  },
  {
      id:"5a422b3a1b54a676234d17f9",
      title:"Canonical string reduction",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
  },
  {
      id:"5a422b891b54a676234d17fa",
      title:"First class tests",
      author:"Robert C. Martin",
      url:"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes:10
  },
  {
      id:"5a422ba71b54a676234d17fb",
      title:"TDD harms architecture",
      author:"Robert C. Martin",
      url:"http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes:0
  },
  {
      id:"5a422bc61b54a676234d17fc",
      title:"Type wars",
      author:"Robert C. Martin",
      url:"http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes:2
  }
]

beforeEach(async () => {
  
  await User.deleteMany({})
  
  await Blog.deleteMany({})
  const noteObjects = blogs
    .map(blog => new Blog(blog))
  const promiseArray = noteObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
describe('Get blog informantion', () =>{
  let headers = {}
  beforeEach(async () => {
    const user = {
      username: 'root',
      name: 'root',
      password: 'password'
    }

    await api.post('/api/users').send(user)
    const login = await api.post('/api/login').send(user)
    headers = {Authorization:`Bearer ${login.body.Token}`}
  })

  test.only('blog is posted', async () =>{

    const response = await api.get('/api/blogs').set(headers)
    const initB = response.body.length
    console.log('initB', initB)
  
    const blog = {
      title: "ahmed post",
      author: "owlen",
      url: "www.xddMOTS.com",
      likes: 0
    }
  
    const posti = await api.post('/api/blogs').send(blog).set(headers)
    console.log('posti.body', posti.body)
  
    const responseSec = await api.get('/api/blogs').set(headers)
    const finalB = responseSec.body.length
    expect(finalB).toEqual(initB + 1)
    
  })
  
})

afterAll(async () => {
  await mongoose.connection.close()
})
