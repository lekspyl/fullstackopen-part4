const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogPosts = await Blog.find({})
  return response.json(blogPosts)
})

blogRouter.get('/:id', async (request, response) => {
  const blogPost = await Blog.findById(request.params.id)
  if (blogPost) {
    response.json(blogPost)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlogPost = await blog.save()
  return response.status(201).json(savedBlogPost)
})

module.exports = blogRouter
