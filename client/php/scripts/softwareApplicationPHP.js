class UI {

    postSoftwareApplication(){

        // Catch post content
        const contentPost = document.getElementById('content-post').value;

        $.ajax({
            method:'POST',
            data:contentPost,
            url:"http://localhost/phpServer.php/softwareApplication",

            success:function(){
                alert('POST successful');
            }

        }).fail(function(){
            alert('POST failed');
        });
    
    }


    getSoftwareApplication() {
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Accept","application/ld+json");
            },

            method:'GET',
            url:"http://localhost/phpServer.php/softwareApplication",

            success:function(softwareApplicationString){  

                // Parse JSON
                let softwareApplicationArray = JSON.parse(softwareApplicationString);

                // Load div with id="content-get"
                const contentGet = document.getElementById('content-get');

                // Clean div with id="content-get"
                contentGet.innerHTML = "";

                // softwareApplicationArray loop to catch the objects softwareApplication
                for (let i=0; i<softwareApplicationArray.length; i++){

                    // Create div with id="element-content-get"
                    const element = document.createElement('div');
                    element.setAttribute("id", "element-content-get");
                    
                    // softwareApplication to String
                    let softwareApplication = JSON.stringify(softwareApplicationArray[i]);

                    // Add contentPost into div with id="element-content-get"
                    element.innerHTML = `
                        <textarea readonly class="form-control" rows="10">${softwareApplication}</textarea><br>
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


    deleteSoftwareApplication() {

        // Catch id value from input with id="id-delete-id"
        const id = document.getElementById('id-delete-id').value;

        $.ajax({

            method:'DELETE',
            url:"http://localhost/phpServer.php/softwareApplication/"+id,

            success:function(){
                alert('DELETED successful');
            }

        }).fail(function(){
            alert('DELETE failed');
        });
    }


    getIdSoftwareApplication() {

        // Catch id value from input with id="id-get-id"
        const id = document.getElementById('id-get-id').value;

        $.ajax({

            method:'GET',
            url:"http://localhost/phpServer.php/softwareApplication/"+id,
            
            success:function(softwareApplicationString){

                // Parse JSON
                let softwareApplication = JSON.parse(softwareApplicationString);
                
                // Load div with id="content-get-id"
                const contentGetId = document.getElementById('content-get-id');

                // Clean div with id="content-get-id"
                contentGetId.innerHTML = "";

                // Create div with id="element-content-get-id"
                const element = document.createElement('div');
                element.setAttribute("id", "element-content-get-id");

                // Add contentPost into div with id="element-content-get-id"
                element.innerHTML = `
                    <textarea readonly class="form-control" rows="10">${softwareApplication}</textarea><br>
                `;

                // Add child with id="element-content-get-id" inside div with id="content-get" if not exist
                contentGetId.appendChild(element);      

                alert('GET/id successful');
            }

        }).fail(function(){
            alert('GET/id failed');
        });
    }


    putSoftwareApplication() {

        // Catch put content
        const contentPut = document.getElementById('content-put').value;

        // Catch id value from input with id="id-put-id"
        const id = document.getElementById('id-put-id').value;

        $.ajax({
            method:'PUT',
            data:contentPut,
            url:"http://localhost/phpServer.php/softwareApplication/"+id,
            success:function(){
                alert('PUT successful');
            }

        }).fail(function(){
            alert('PUT failed');
        });
    }
}


document.getElementById('post').addEventListener('submit', function(e){
    // Create a new UI postsoftwareApplication
    const ui = new UI();
    ui.postSoftwareApplication();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('get').addEventListener('submit', function(e){
    // Create a new UI getSoftwareApplication
    const ui = new UI();
    ui.getSoftwareApplication();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('delete-id').addEventListener('submit', function(e){
    // Create a new UI deleteSoftwareApplication
    const ui = new UI();
    ui.deleteSoftwareApplication();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('get-id').addEventListener('submit', function(e){
    // Create a new UI getIdSoftwareApplication
    const ui = new UI();
    ui.getIdSoftwareApplication();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('put-id').addEventListener('submit', function(e){
    // Create a new UI getIdSoftwareApplication
    const ui = new UI();
    ui.putSoftwareApplication();
    // Prevent default on form submit
    e.preventDefault();
});