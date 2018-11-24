class CreativeWork {
    constructor(contentPost) {
        this.contentPost = contentPost;
    }
}

class UI {
    putCreativeWork(creativeWork) {
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

            // Convert to JSON to catch id
            let json = JSON.parse(contentPost);
            let id = json.id;
            console.log(id);

        })
    }

    deleteCreativeWork() {

    }

    getCreativeWork() {

    }

    getCreativeWorkId() {

    }
}

// DOM event
document.getElementById('post').addEventListener('submit', function(e){
    const contentPost = document.getElementById('content-post').value;

    // Create a new Object CreativeWork
    console.log(contentPost);
    const creativeWork = new CreativeWork(contentPost);
    console.log(creativeWork);

    // Create a new UI
    const ui = new UI();
    ui.putCreativeWork(creativeWork);

    // Prevent default on form submit
    e.preventDefault();
})
