import { reactive } from 'vue'

export const store = reactive({
    images: [],
    comments: [],
    updateLikes(image){
        //update state
        const updatedImages = JSON.parse(JSON.stringify(this.images))
        const match = updatedImages.find(target => target.id === image.id)
        match.likes++
        this.images = updatedImages
        //update server
        return fetch(`http://localhost:8000/images/${image.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(image)
        })
    },
    deletePost(image) {
        //update state
        let updatedImages = this.images.filter(targetImage => {
          return image.id != targetImage.id
        })
        this.images = updatedImages
    
        //update server
        return fetch(`http://localhost:8000/images/${image.id}`, {
          method: 'DELETE'
      })
    },
    deleteComment(comment) {
        //update state
        let updatedComments = this.comments.filter(targetComment => {
          return comment.content != targetComment.content
        })
        this.comments = updatedComments
        //update server
        return fetch(`http://localhost:8000/comments/${comment.id}`, {
          method: 'DELETE'
        })
    },
    async addComment(image, text){
        //update state
        let updatedComments = JSON.parse(JSON.stringify(this.comments))
        updatedComments.push({content: text, imageId: image.id})
        this.comments = updatedComments
        //update server
        return await fetch('http://localhost:8000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({content: text, imageId: image.id})
        }).then(resp => resp.json())
    },
    async addPost(title, url) {
        //update state
        let updatedImages = JSON.parse(JSON.stringify(this.images))
        updatedImages.push({title: title, image: url, likes: 0, comments: []})
        this.images = updatedImages
        //update server
        return await fetch('http://localhost:8000/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title: title, image: url, likes: 0, comments: []})
        }).then(resp => resp.json())
    }
})