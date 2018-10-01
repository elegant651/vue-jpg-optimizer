<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    
    <input type="file" id="file" accept="image/*">

    <img />
  </div>
</template>

<script>

import Optimizer from '../optimizer'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  mounted () {

    document.getElementById('file').addEventListener('change', (e) => {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

      var preview = document.querySelector('img');      
      const opt = new Optimizer(file, {
        success(imgfile) {
          const reader  = new FileReader();

          reader.addEventListener("load", function () {
            preview.src = reader.result;            
          }, false);
                    
          reader.readAsDataURL(imgfile);          
        },
        error(e) {
          console.error(e.message)
        }
      })      
    });  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
