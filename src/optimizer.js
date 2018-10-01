

class Optimizer {

  constructor(file, options) {
    this.optimize(file, options)
  }

  optimize(file, options) {
    const image = new Image()
      
    return new Promise((resolve, reject) => {      
      const reader = new FileReader();      
      reader.onload = ({ target }) => {
        const { result } = target;

        resolve({
          url: result        
        });
      };

      reader.onerror = () => {
        reject(new Error('Failed to load the image with FileReader.'));
      };
      reader.readAsDataURL(file);  
      
    })
    .then(data => new Promise((resolve, reject) => {      
      image.onload = () => resolve({
          ...data,
          nWidth: image.naturalWidth,
          nHeight: image.naturalHeight
      })
      image.onerror = () => {
          reject(new Error('Failed to load the image'))
      }
      image.src = data.url
    }))
    .then(({nWidth, nHeight}) => new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')      
        
      canvas.width = nWidth
      canvas.height = nHeight

      context.fillStyle = 'transparent'
      context.fillRect(0, 0, nWidth, nHeight)
      context.save()
      context.translate(nWidth / 2, nHeight / 2)                
      context.rotate(0)
      context.scale(1, 1)

      context.drawImage(
        image,
        Math.floor(-nWidth / 2),
        Math.floor(-nHeight / 2),
        Math.floor(nWidth),
        Math.floor(nHeight)
      )

      context.restore()
        
      const done = (img) =>{        
        resolve(img)

        if (options.success) {
          options.success.call(this, img);
        }
      }  
      canvas.toBlob(done, 'image/jpeg', 0.5)      
    }))    
    .catch((err) => {
      console.error(err)

      options.error.call(this, err);
    })

  }
}

export default Optimizer