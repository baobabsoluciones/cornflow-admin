<template>
  <div
    id="app"
    class="flex w-full h-screen items-center justify-center text-center"
  >
    <div
      class="p-12 bg-gray-100 border border-gray-300"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        id="assetsFieldHandle"
        ref="file"
        type="file"
        multiple
        name="fields[assetsFieldHandle][]"
        class="w-px h-px opacity-0 overflow-hidden absolute"
        accept=".pdf,.jpg,.jpeg,.png"
        @change="onChange"
      >

      <label
        for="assetsFieldHandle"
        class="block cursor-pointer"
      >
        <div>
          Explain to our users they can drop files in here
          or <span class="underline">click here</span> to upload their files
        </div>
      </label>
      <ul
        v-if="filelist.length"
        v-cloak
        class="mt-4"
      >
        <li
          v-for="(file, id) in filelist"
          :key="id"
          class="text-sm p-1"
        >
          {{ file.name }}<button
            class="ml-2"
            type="button"
            title="Remove file"
            @click="remove(id)"
          >
            remove
          </button>
          <button
            class="ml-2"
            type="button"
            title="Send file"
            @click="upload(id)"
          >
            send
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    delimiters: ['${', '}'], // Avoid Twig conflicts
    data () {
      return {
        filelist: [], // Store our uploaded files
      }
    },
    methods: {
      onChange () {
        this.filelist = this.$refs.file.files
        const file = this.filelist[this.filelist.length - 1]
        console.log(file)
        this.$emit('on-load-file', file)
      },
      remove (i) {
        this.filelist.splice(i, 1)
      },
      dragover (event) {
        event.preventDefault()
        // Add some visual fluff to show the user can drop its files
        if (!event.currentTarget.classList.contains('bg-green-300')) {
          event.currentTarget.classList.remove('bg-gray-100')
          event.currentTarget.classList.add('bg-green-300')
        }
      },
      dragleave (event) {
        // Clean up
        event.currentTarget.classList.add('bg-gray-100')
        event.currentTarget.classList.remove('bg-green-300')
      },
      drop (event) {
        event.preventDefault()
        this.$refs.file.files = event.dataTransfer.files
        this.onChange() // Trigger the onChange event manually
        // Clean up
        event.currentTarget.classList.add('bg-gray-100')
        event.currentTarget.classList.remove('bg-green-300')
      },
      upload (i) {
        const file = this.filelist[i]
        console.log('uploading!')
        console.log(file)
        this.$emit('upload-file', file)
      },
    },
  }
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
