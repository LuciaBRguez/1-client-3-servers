class CreativeWork {
    constructor(contentPost) {
        this.contentPost = contentPost;
    }
}

class UI {
    putCreativeWork(creativeWork) {
       const contentGet = document.getElementById('content-get');
       const element = document.createElement('div');
       //let creativeWorkList = [];

       document.getElementById('get').addEventListener('submit', function(e){
            element.innerHTML = `
                <textarea readonly class="form-control" rows="10">${creativeWork.contentPost}</textarea><br>
            `;

            contentGet.appendChild(element);
            //creativeWorkList.push(creativeWork.contentPost);
            
            e.preventDefault();
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

    e.preventDefault();
})
