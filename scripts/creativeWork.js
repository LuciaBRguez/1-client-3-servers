// Array of creativeWork objects
let creativeWorkArray = [];


class CreativeWork {
    constructor(contentPost, id) {
        this.contentPost = contentPost;
        this.id = id;
    }
}


class UI {
    getCreativeWork(creativeWork) {
       const contentGet = document.getElementById('content-get');
       const element = document.createElement('div');
       let contentPost = creativeWork.contentPost;

       // Add post content on get
       document.getElementById('get').addEventListener('submit', function(e){
            element.innerHTML = `
                <textarea readonly class="form-control" rows="10">${contentPost}</textarea><br>
            `;

            contentGet.appendChild(element);

            // Prevent default on form submit
            e.preventDefault();
        })
    }

    deleteCreativeWork(id) {
        creativeWorkArray.forEach(function(value, index, array){

            if (id == value.id) {
                console.log("array completo: "+creativeWorkArray);
                creativeWorkArray.splice(index, 1);
                console.log("array con objeto eliminado: "+creativeWorkArray);
            }
        });

    }

    getCreativeWorkId() {

    }
}


// DOM event
document.getElementById('post').addEventListener('submit', function(e){
  
    // Catch post content
    const contentPost = document.getElementById('content-post').value;
    console.log(contentPost);

    // Convert to JSON to catch id
    let json = JSON.parse(contentPost);
    let id = json.id;
    console.log(id);

    // Create a new Object CreativeWork
    const creativeWork = new CreativeWork(contentPost, id);
    console.log(creativeWork);
    creativeWorkArray.push(creativeWork);
    console.log(creativeWorkArray);

    // Resest post content
    // document.getElementById('post').reset();
    
    // Create a new UI post
    const ui = new UI();
    ui.getCreativeWork(creativeWork);

    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('delete-id').addEventListener('submit', function(e){ 
    
    // Create a new UI delete
    const ui = new UI();
    const id = document.getElementById('content-delete-id').value;
    ui.deleteCreativeWork(id);
    
    // Aquí habría que mandarle al get un array con todos los objets creativeWork, no sólo un creativeWork. Hay que editar la función getCreativeWork.
    // ui.getCreativeWork(creativeWork);

    // Prevent default on form submit
    e.preventDefault();
});
