// Node
function getEntitiesNode(){

    $.ajax({
        
        method:'GET',
        url:"http://localhost:3000",

        success:function(entities){

            // Get entities
            let firstEntity = entities.first;
            let secondEntity =  entities.second;
            let thirdEntity =  entities.third;

            // Add options entities into select with id="select"
            document.getElementById("select").options.add(new Option(""+firstEntity+"","entity"));
            document.getElementById("select").options.add(new Option(""+secondEntity+"","entity"));
            document.getElementById("select").options.add(new Option(""+thirdEntity+"","entity"));
        }

    }).fail(function(){
        alert('GET entities failed')
    });
    
}
