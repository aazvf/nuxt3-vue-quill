# Nuxt 3 notes app

Live static site: [http://nuxt3-vue-quill.s3-website-eu-west-1.amazonaws.com/](http://nuxt3-vue-quill.s3-website-eu-west-1.amazonaws.com/)

Built with:

 - [nuxt 3](https://github.com/nuxt/framework)
 - [vue-quill](https://github.com/vueup/vue-quill)
 - [tailwind](https://github.com/tailwindlabs/tailwindcss)
 - [localforage](https://github.com/localForage/localForage)


Don't write any serious notes here, I built this in a few hours using vue-quill, all I did was use localstorage to save notes client side.

Pretty sure I went wrong with how I implemented composables & syncing to localstorage...



## Production

`npm run build && npm run generate`


Edit the "deploy" script in `package.json` to use your own s3 bucket and aws profile, then `npm run deploy`


