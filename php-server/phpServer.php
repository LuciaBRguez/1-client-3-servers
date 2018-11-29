<?php

// Content negotiation
// Convert to JSON
function creativeWorkToJSON()
{
    global $creativeWorkArray;
    $json ='[';
    for ($i = 0; $i < sizeof($creativeWorkArray); $i++) {
        $json = $json.'{'.'"@context":"http://schema.org","@type":"CreativeWork",'.' "id":'.$creativeWorkArray[$i]->getId().', "alternativeHeadline":"'.$creativeWorkArray[$i]->getAlternativeHeadline().'","commentCount":'.$creativeWorkArray[$i]->getCommentCount().', "copyrightYear":'.$creativeWorkArray[$i]->getCopyrightYear().', "inLanguage":'.$creativeWorkArray[$i]->getInLanguage().', "isAccessibleForFree":'.$creativeWorkArray[$i]->getIsAccessibleForFree().' }';
        if($i < (sizeof($creativeWorkArray)-1)){
            $json = $json.',';
        }
    }
    $json = $json.']';
    return $json;
}

// Convert to HTML
function creativeWorkToHTML(){
    global $creativeWorkArray;
    $html = "<ul>";
    foreach ($creativeWorkArray as &$creativeWork) {
        $html = $html."<li>".$creativeWork->getId()." ".$creativeWork->getAlternativeHeadline()." ".$creativeWork->getCommentCount()." ".$creativeWork->getCopyrightYear()." ".$creativeWork->getInLanguage()." ".$creativeWork->getIsAccessibleForFree()."</li>";
    }
    $html = $html."</ul>";
    return $html;
}

// Convert to text
function creativeWorkToText(){
    global $creativeWorkArray;
    $text="";
    foreach ($creativeWorkArray as &$creativeWork) {
        $text = $text.$creativeWork->getId()." ".$creativeWork->getAlternativeHeadline()." ".$creativeWork->getCommentCount()." ".$creativeWork->getCopyrightYear()." ".$creativeWork->getInLanguage()." ".$creativeWork->getIsAccessibleForFree()."\n";
    }
    return $text;
}

// Classes creativeWork, publicationVolume, softwareApplication
class CreativeWork{
    private $id;
    private $alternativeHeadline;
    private $commentCount;
    private $copyrightYear;
    private $inLanguage;
    private $isAccessibleForFree;
    function __construct($id, $alternativeHeadline, $commentCount, $copyrightYear, $inLanguage, $isAccessibleForFree){
        $this->id = $id;
        $this->alternativeHeadline = $alternativeHeadline;
        $this->commentCount = $commentCount;
        $this->copyrightYear = $copyrightYear;
        $this->inLanguage = $inLanguage;
        $this->isAccessibleForFree = $isAccessibleForFree;
    }
    function getId(){
        return $this->id;
    }
    function getAlternativeHeadline(){
        return $this->alternativeHeadline;
    }
    function getCommentCount(){
        return $this->commentCount;
    }
    function getCopyrightYear(){
        return ($this->copyrightYear);
    }
    function getInLanguage(){
        return $this->inLanguage;
    }
    function getIsAccessibleForFree(){
        if($this->isAccessibleForFree)
            return "true";
        return "false";
    }
}

// Array creativeWorkArray
global $creativeWorkArray;
$creativeWorkArray = Array();
$idCreativeWork = 1;

// new Objects creativeWork
$creativeWorkArray[] = new CreativeWork(0, "creativeWork", 8, 1999, "English", false);
$creativeWorkArray[] = new CreativeWork(1, "creativeWork2", 8, 1999, "English", false);

// Processing URI
if (isset($_SERVER['PATH_INFO'])) {
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'))[0];
    if(count(explode('/', trim($_SERVER['PATH_INFO'],'/')))==2){
        $id = explode('/', trim($_SERVER['PATH_INFO'],'/'))[1];
    }else
        $id = null;
} else {
    $request = null;
}

// Format response
$format = $_SERVER['HTTP_ACCEPT'] or 'html';

// Entities methods
if (!$request){
    switch ($_SERVER['REQUEST_METHOD']) {
        case "GET":
            echo "{\"1\":\"CreativeWork\",\"2\":\"PublicationVolume\",\"3\":\"SoftwareApplication\"}";
            break;
        default:
            http_response_code(404);
            echo "Not allowed.";
            break;
    }

    // creativeWork
}elseif (strcmp('creativeWork', $request) === 0 && $id == null){
    switch ($_SERVER['REQUEST_METHOD']) {
        case "GET":
            switch ($format) {
                case 'application/ld+json':
                    header('Content-type: application/ld+json');
                    echo json_encode(creativeWorkToJSON());
                    break;
                case 'text/plain':
                    header('Content-type: text/plain');
                    echo creativeWorkToText();
                    break;
                default:
                    header('Content-type: text/html');
                    echo creativeWorkToHTML();
                    break;
            }
            break;
        case "PUT":
            http_response_code(404);
            echo "PUT not allowed over every Creative Work.";
            break;
        case "POST":
            $creativeWork = json_decode(file_get_contents('php://input'));
            if($creativeWork->alternativeHeadline == null) {
                http_response_code(405);
                echo "alternativeHeadline can't be null.";
            }elseif($creativeWork->commentCount == null) {
                http_response_code(405);
                echo "commentCount can't be null.";
            }elseif($creativeWork->copyrightYear == null) {
                http_response_code(405);
                echo "copyrightYear can't be null.";
            }elseif($creativeWork->inLanguage == null) {
                http_response_code(405);
                echo "inLanguage can't be null.";
            }elseif($creativeWork->isAccessibleForFree == null) {
                http_response_code(405);
                echo "isAccessibleForFree can't be null.";
            }else{
                $idCreativeWork++;
                $newCreativeWork = new CreativeWork($idCreativeWork, $creativeWork->alternativeHeadline, $creativeWork->commentCount, $creativeWork->copyrightYear, $creativeWork->inLanguage, $creativeWork->isAccessibleForFree);
                global $creativeWorkArray;
                $creativeWorkArray[]= $newCreativeWork;
                echo $newCreativeWork->getId()."";
            }
            break;
        case "DELETE":
            http_response_code(404);
            echo "DELETE not allowed over every creativeWork.";
            break;
        default:
            http_response_code(404);
            echo "Not allowed.";
            break;
    }
}elseif (strcmp('creativeWork', $request) === 0 && $id != null){
    switch ($_SERVER['REQUEST_METHOD']) {
        case "GET":
            $getId = false;
            for($i = 0; $i < sizeof($creativeWorkArray); $i++) {
                if ($creativeWorkArray[$i]->getId() == $id) {
                    echo json_encode('{'.'"@context":"http://schema.org","@type":"CreativeWork",'.' "id":'.$id.', "alternativeHeadline":"'.$creativeWorkArray[$i]->getAlternativeHeadline().'","commentCount":'.$creativeWorkArray[$i]->getCommentCount().', "copyrightYear":'.$creativeWorkArray[$i]->getCopyrightYear().', "inLanguage":'.$creativeWorkArray[$i]->getInLanguage().', "isAccessibleForFree":'.$creativeWorkArray[$i]->getIsAccessibleForFree().' }');
                    $getId = true;
                }
            }
            if(!$getId){
                http_response_code(404);
                echo "not allowed";
            }
            break;
        case "PUT":
            $put = false;
            $creativeWork = json_decode(file_get_contents('php://input'));
            if($creativeWork->alternativeHeadline == null) {
                http_response_code(405);
                echo "alternativeHeadline can't be null.";
            }elseif($creativeWork->commentCount == null) {
                http_response_code(405);
                echo "commentCount can't be null.";
            }elseif($creativeWork->copyrightYear == null) {
                http_response_code(405);
                echo "copyrightYear can't be null.";
            }elseif($creativeWork->inLanguage == null) {
                http_response_code(405);
                echo "inLanguage can't be null.";
            }elseif($creativeWork->isAccessibleForFree == null) {
                http_response_code(405);
                echo "isAccessibleForFree can't be null.";
            }else {
                for($i = 0; $i < sizeof($creativeWork); $i++){
                    if($creativeWorkArray[$i]->getId()== $id){
                        $put = true;
                        global $creativeWorkArray;
                        $creativeWorkArray[$i] = new CreativeWork($idCreativeWork, $creativeWork->alternativeHeadline, $creativeWork->commentCount, $creativeWork->copyrightYear, $creativeWork->inLanguage, $creativeWork->isAccessibleForFree);
                    }
                }
                if(!$put) {
                    http_response_code(404);
                    echo "not allowed";
                }
            }
            break;
        case "POST":
            http_response_code(404);
            echo "POST not allowed over a particular Creative Work";
            break;
        case "DELETE":
            $delete = false;
            for($i = 0; $i < sizeof($creativeWorkArray); $i++) {
                if ($creativeWorkArray[$i]->getId() == $id) {
                    $delete = true;
                    unset($creativeWorkArray[$i]);
                }
            }
            if(!$delete) {
                http_response_code(404);
                echo "not allowed";
            }
            break;
        default:
            http_response_code(404);
            echo "not allowed";
            break;
    }
}else{
    http_response_code(404);
    echo "not allowed";
}