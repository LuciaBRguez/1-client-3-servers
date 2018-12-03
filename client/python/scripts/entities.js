// Node
function getEntitiesPython(){

    $.ajax({
        
        method:'GET',
        url:"http://156.35.95.76:5000",

        success:function(entitiesString){

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
