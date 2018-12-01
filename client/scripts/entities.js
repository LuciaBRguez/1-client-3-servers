// Node
function getEntitiesNode(){

    $.ajax({
        
        method:'GET',
        url:"http://localhost:3000",

        success:function(entities){

            // Create div with id="element-content-entities"
            //const element = document.createElement('select');
            //element.setAttribute("id", "select");;

            let firstEntity = entities.first;
            let secondEntity =  entities.second;
            let thirdEntity =  entities.third;

            // Add options entities into select with id="select"
            document.getElementById("select").options.add(new Option(""+firstEntity+"","1"));
            document.getElementById("select").options.add(new Option(""+secondEntity+"","1"));
            document.getElementById("select").options.add(new Option(""+thirdEntity+"","1"));

            alert('GET entities successful')
        }

    }).fail(function(){
        alert('GET entities failed')
    });
    
}
