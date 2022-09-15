const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blogPost of helper.initialBlogPosts) {
    let blogPostObject = new Blog(blogPost)
    await blogPostObject.save()
  }
})

test('blog posts are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blog posts are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogPosts.length)
})

test('name of ID property is correct', async () => {
  const response = await api.get(`/api/blogs/${helper.initialBlogPosts[0]._id}`)
  // console.log(helper.initialBlogPosts[0]._id, response)
  expect(response.body.id).toBeDefined()
})

test('blog post is submitted', async () => {
  const newBlogPost = {
    author: 'Willy Wonka',
    url: 'https://goatse.cx',
    title: 'A tour around the Chocolate Factory',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogPostsAtEnd = await helper.blogPostsInDb()
  expect(blogPostsAtEnd).toHaveLength(helper.initialBlogPosts.length + 1)

  const posts = blogPostsAtEnd.map(x => x.title)
  expect(posts).toContain(
    'A tour around the Chocolate Factory'
  )
})

test('"likes" propery set to 0 if not defined', async () => {
  const newBlogPost = {
    author: 'Willy Wonka',
    url: 'https://goatse.cx',
    title: 'A tour around the Chocolate Factory',
  }

  const savedBlogPost = await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(+savedBlogPost.body.likes).toBe(0)
})
