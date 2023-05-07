import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogLists: [], isLoading: true}

  componentDidMount = () => {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()

    const updateData = data.map(eachItem => ({
      id: eachItem.id,
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      imageUrl: eachItem.image_url,
      title: eachItem.title,
      topic: eachItem.topic,
    }))

    this.setState({blogLists: updateData, isLoading: false})
  }

  render() {
    const {isLoading, blogLists} = this.state

    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" height={50} width={50} color="#00BFFF" />
        ) : (
          blogLists.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
