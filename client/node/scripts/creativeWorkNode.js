class UI {

    postCreativeWork(){

        // Catch post content
        const contentPost = document.getElementById('content-post').value;

        $.ajax({
            method:'POST',
            data:contentPost,
            url:"http://http://156.35.95.76:3000/creativeWork",

            success:function(){
                alert('POST successful');
            }

        }).fail(function(){
            alert('POST failed');
        });
    
    }


    getCreativeWork() {
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Accept","application/ld+json");
            },

            method:'GET',
            url:"http://156.35.95.76:3000/creativeWork",

            success:function(creativeWorkArray){  

                // Load div with id="content-get"
                const contentGet = document.getElementById('content-get');

                // Clean div with id="content-get"
                contentGet.innerHTML = "";

                // creativeWorkArray loop to catch the objects CreativeWork
                for (let i=0; i<creativeWorkArray.length; i++){

                    // Create div with id="element-content-get"
                    const element = document.createElement('div');
                    element.setAttribute("id", "element-content-get");
                    
                    // creativeWork to String
                    let creativeWork = JSON.stringify(creativeWorkArray[i]);

                    // Add contentPost into div with id="element-content-get"
                    element.innerHTML = `
                        <textarea readonly class="form-control" rows="10">${creativeWork}</textarea><br>
                    `;

                    // Add child with id="element-content-get" inside div with id="content-get" if not exist
                    contentGet.appendChild(element);
                }
                alert('GET successful');
            }

        }).fail(function(){
            alert('GET failed');
        });
    }


    deleteCreativeWork() {

        // Catch id value from input with id="id-delete-id"
        const id = document.getElementById('id-delete-id').value;

        $.ajax({

            method:'DELETE',
            url:"http://156.35.95.76:3000/creativeWork/"+id,

            success:function(){
                alert('DELETED successful');
            }

        }).fail(function(){
            alert('DELETE failed');
        });
    }


    getIdCreativeWork() {

        // Catch id value from input with id="id-get-id"
        const id = document.getElementById('id-get-id').value;

        $.ajax({

            method:'GET',
            url:"http://156.35.95.76:3000/creativeWork/"+id,
            
            success:function(creativeWork){

                // Load div with id="content-get-id"
                const contentGetId = document.getElementById('content-get-id');

                // Clean div with id="content-get-id"
                contentGetId.innerHTML = "";

                // Create div with id="element-content-get-id"
                const element = document.createElement('div');
                element.setAttribute("id", "element-content-get-id");

                // Add contentPost into div with id="element-content-get-id"
                element.innerHTML = `
                    <textarea readonly class="form-control" rows="10">${creativeWork}</textarea><br>
                `;

                // Add child with id="element-content-get-id" inside div with id="content-get" if not exist
                contentGetId.appendChild(element);      

                alert('GET/id successful');
            }

        }).fail(function(){
            alert('GET/id failed');
        });
    }


    putCreativeWork() {

        // Catch put content
        const contentPut = document.getElementById('content-put').value;

        // Catch id value from input with id="id-put-id"
        const id = document.getElementById('id-put-id').value;

        $.ajax({
            method:'PUT',
            data:contentPut,
            url:"http://156.35.95.76:3000/creativeWork/"+id,
            success:function(){
                alert('PUT successful');
            }

        }).fail(function(){
            alert('PUT failed');
        });
    }
}


document.getElementById('post').addEventListener('submit', function(e){
    // Create a new UI postCreativeWork
    const ui = new UI();
    ui.postCreativeWork();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('get').addEventListener('submit', function(e){
    // Create a new UI getCreativeWor
    const ui = new UI();
    ui.getCreativeWork();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('delete-id').addEventListener('submit', function(e){
    // Create a new UI deleteCreativeWork
    const ui = new UI();
    ui.deleteCreativeWork();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('get-id').addEventListener('submit', function(e){
    // Create a new UI getIdCreativeWork
    const ui = new UI();
    ui.getIdCreativeWork();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('put-id').addEventListener('submit', function(e){
    // Create a new UI getIdCreativeWork
    const ui = new UI();
    ui.putCreativeWork();
    // Prevent default on form submit
    e.preventDefault();
});