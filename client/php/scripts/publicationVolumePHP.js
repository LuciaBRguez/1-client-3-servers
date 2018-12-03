class PublicationVolume {
    constructor(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber){
        super(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree);
        this.pageStart = pageStart;
        this.pageEnd = pageEnd;
        this.pagination = pagination;
        this.volumeNumber = volumeNumber;
    }
}


class UI {

    postPublicationVolume(){

        // Catch post content
        const contentPost = document.getElementById('content-post').value;

        $.ajax({
            method:'POST',
            data:contentPost,
            url:"http://localhost/phpServer.php/publicationVolume",

            success:function(){
                alert('POST successful');
            }

        }).fail(function(){
            alert('POST failed');
        });
    
    }


    getPublicationVolume() {
        $.ajax({

            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Accept","application/ld+json");
            },

            method:'GET',
            url:"http://localhost/phpServer.php/publicationVolume",

            success:function(publicationVolumeString){  

                console.log(publicationVolumeString);
                
                // Parse JSON
                let publicationVolumeArray = JSON.parse(publicationVolumeString);

                // Load div with id="content-get"
                const contentGet = document.getElementById('content-get');

                // Clean div with id="content-get"
                contentGet.innerHTML = "";

                // publicationVolumeArray loop to catch the objects publicationVolume
                for (let i=0; i<publicationVolumeArray.length; i++){

                    // Create div with id="element-content-get"
                    const element = document.createElement('div');
                    element.setAttribute("id", "element-content-get");
                    
                    // publicationVolume to String
                    let publicationVolume = JSON.stringify(publicationVolumeArray[i]);

                    // Add contentPost into div with id="element-content-get"
                    element.innerHTML = `
                        <textarea readonly class="form-control" rows="10">${publicationVolume}</textarea><br>
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


    deletePublicationVolume() {

        // Catch id value from input with id="id-delete-id"
        const id = document.getElementById('id-delete-id').value;

        $.ajax({

            method:'DELETE',
            url:"http://localhost/phpServer.php/publicationVolume/"+id,

            success:function(){
                alert('DELETED successful');
            }

        }).fail(function(){
            alert('DELETE failed');
        });
    }


    getIdPublicationVolume() {

        // Catch id value from input with id="id-get-id"
        const id = document.getElementById('id-get-id').value;

        $.ajax({

            method:'GET',
            url:"http://localhost/phpServer.php/publicationVolume/"+id,
            
            success:function(publicationVolumeString){

                // Parse JSON
                let publicationVolume = JSON.parse(publicationVolumeString);
                
                // Load div with id="content-get-id"
                const contentGetId = document.getElementById('content-get-id');

                // Clean div with id="content-get-id"
                contentGetId.innerHTML = "";

                // Create div with id="element-content-get-id"
                const element = document.createElement('div');
                element.setAttribute("id", "element-content-get-id");

                // Add contentPost into div with id="element-content-get-id"
                element.innerHTML = `
                    <textarea readonly class="form-control" rows="10">${publicationVolume}</textarea><br>
                `;

                // Add child with id="element-content-get-id" inside div with id="content-get" if not exist
                contentGetId.appendChild(element);      

                alert('GET/id successful');
            }

        }).fail(function(){
            alert('GET/id failed');
        });
    }


    putPublicationVolume() {

        // Catch put content
        const contentPut = document.getElementById('content-put').value;

        // Catch id value from input with id="id-put-id"
        const id = document.getElementById('id-put-id').value;

        $.ajax({
            method:'PUT',
            data:contentPut,
            url:"http://localhost/phpServer.php/publicationVolume/"+id,
            success:function(){
                alert('PUT successful');
            }

        }).fail(function(){
            alert('PUT failed');
        });
    }
}


document.getElementById('post').addEventListener('submit', function(e){
    // Create a new UI postPublicationVolume
    const ui = new UI();
    ui.postPublicationVolume();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('get').addEventListener('submit', function(e){
    // Create a new UI getPublicationVolume
    const ui = new UI();
    ui.getPublicationVolume();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('delete-id').addEventListener('submit', function(e){
    // Create a new UI deletePublicationVolume
    const ui = new UI();
    ui.deletePublicationVolume();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('get-id').addEventListener('submit', function(e){
    // Create a new UI getIdPublicationVolume
    const ui = new UI();
    ui.getIdPublicationVolume();
    // Prevent default on form submit
    e.preventDefault();
});


document.getElementById('put-id').addEventListener('submit', function(e){
    // Create a new UI putPublicationVolume
    const ui = new UI();
    ui.putPublicationVolume();
    // Prevent default on form submit
    e.preventDefault();
});