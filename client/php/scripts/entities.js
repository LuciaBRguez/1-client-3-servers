// Node
function getEntitiesNode(){

    $.ajax({
        
        method:'GET',
        url:"http://localhost/phpServer.php",

        success:function(entitiesString){

            console.log(entitiesString);

            let entities = JSON.parse(entitiesString);

            // Get entities
            let firstEntity = entities.first;
            let secondEntity =  entities.second;
            let thirdEntity =  entities.third;

            // Add options entities into select with id="select"
            document.getElementById("select").options.add(new Option(""+firstEntity+"",""+firstEntity+".html"));
            document.getElementById("select").options.add(new Option(""+secondEntity+"",""+secondEntity+".html"));
            document.getElementById("select").options.add(new Option(""+thirdEntity+"",""+thirdEntity+".html"));
        }

    }).fail(function(){
        alert('GET entities failed')
    });
    
}
