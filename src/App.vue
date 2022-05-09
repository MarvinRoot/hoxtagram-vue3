<script setup>
import { watch } from "@vue/runtime-core";
import { store } from './components/store'
import './App.css'
import './index.css'
watch(async function fetchData() {
  await fetch('http://localhost:8000/images').then(resp => resp.json())
  .then(imagesFromServer => store.images = imagesFromServer)

  await fetch('http://localhost:8000/comments').then(resp => resp.json())
  .then(commentsFromServer => store.comments = commentsFromServer)
})
</script>

<template>
  <div class="App">
    <img className="logo" src="assets/hoxtagram-logo.png" />
    <section className="image-container">

      <form 
      class="comment-form image-card"
      @submit.prevent="store.addPost(newTitle, newUrl)">
        <h2 class="title">New Post</h2>
        <input
        v-model="newTitle"
        class="comment-input"
        type="text"
        name="title"
        id="title"
        placeholder="Add a title..."
        >
        <input 
        v-model="newUrl"
        class="comment-input"
        type="url"
        name="image"
        id="image"
        placeholder="Add an image url..."
        >
        <button class="comment-button" type="submit">Post</button>
      </form>

      <article v-for="(item, itemIndex) in store.images" :key="itemIndex" class="image-card">
        <h2 class="title">{{item.title}}</h2>
        <button class="comment-button" @click="store.deletePost(item)">Delete Post</button>
        <img class="image" :src="`${item.image}`">
        <div class="likes-section">
          <span class="likes">{{item.likes}} likes</span>
          <button class="like-button"
          @click="store.updateLikes(item)">♥</button>
        </div>
        <ul class="comments">
          <li v-for="(comment, commentIndex) in store.comments.filter(comment => comment.imageId === item.id)" :key="commentIndex">{{comment.content}}
          <button class="comment-button"
          @click="store.deleteComment(comment)">Delete Comment</button>
          </li>
        </ul>

        <form @submit.prevent="store.addComment(item, newComment)" class="comment-form" >
          <input 
          v-model= "newComment"
          class="comment-input"
          type="text"
          name="comment"
          placeholder="Add a comment...">

          <button class="comment-button" type="submit">Post</button>
        </form>
      </article>
    </section>
  </div>
</template>

<style>

</style>
