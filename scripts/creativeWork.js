// Array of creativeWork objects
let creativeWorkArray = [];


class CreativeWork {
    constructor(contentPost, id) {
        this.contentPost = contentPost;
        this.id = id;
    }
}


class UI {

    postCreativeWork(){

        // Catch post content
        const contentPost = document.getElementById('content-post').value;
        console.log(contentPost);

        // Convert to JSON to catch id
        let json = JSON.parse(contentPost);
        let id = json.id;
        console.log(id);

        // Create a new Object CreativeWork if it doens't exist
        const creativeWork = new CreativeWork(contentPost, id);
        console.log(creativeWork);
        
        // Add new object to creativeWorkArray if other wasn't added previously with the same id
        let result = creativeWorkArray.filter(obj => obj.id === id);
        if (result.length === 0){
            creativeWorkArray.push(creativeWork);
        }

        console.log(creativeWorkArray);

        // Resest post content
        // document.getElementById('post').reset();
        
    }


    getCreativeWork() {
        
        // Load div with id="content-get"
        const contentGet = document.getElementById('content-get');

        // Clean div with id="content-get"
        contentGet.innerHTML = "";

        // creativeWorkArray loop to catch the objects CreativeWork
        creativeWorkArray.forEach(function(value, index, array){

            // Create div with id="element-content"
            const element = document.createElement('div');
            element.setAttribute("id", "element-content");
            
            // Catch value of the attribute contentPost of the object
            let contentPost = value.contentPost;

                // Add contentPost into div with id="element-content"
                element.innerHTML = `
                    <textarea readonly class="form-control" rows="10">${contentPost}</textarea><br>
                `;

                // Add child with id="element-content" inside div with id="content-get" if not exist
                contentGet.appendChild(element);
                
        });
       
    }


    deleteCreativeWork() {

        // Catch id value from input with id="content-delete-id"
        const id = document.getElementById('content-delete-id').value;

        // If an object with this id exists then delete it from creativeWorkArray
        creativeWorkArray.forEach(function(value, index, array){
            if (id == value.id) {
                creativeWorkArray.splice(index, 1);
            }
        });
    }

}



document.getElementById('post').addEventListener('submit', function(e){
    // Create a new UI
    const ui = new UI();
    ui.postCreativeWork();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('get').addEventListener('submit', function(e){
    // Create a new UI
    const ui = new UI();
    ui.getCreativeWork();
    // Prevent default on form submit
    e.preventDefault();
});

document.getElementById('delete-id').addEventListener('submit', function(e){
    // Create a new UI
    const ui = new UI();
    ui.deleteCreativeWork();
    // Prevent default on form submit
    e.preventDefault();
});