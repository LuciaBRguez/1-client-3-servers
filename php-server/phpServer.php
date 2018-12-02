<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

// Content negotiation
// Convert to JSON
function creativeWorkToJSON()
{
    global $creativeWorkArray;
    $json ='[';
    for ($i = 0; $i < sizeof($creativeWorkArray); $i++) {
        $json = $json.'{'.'"@context":"http://schema.org","@type":"CreativeWork",'.' "id":'.$creativeWorkArray[$i]->getId().', "alternativeHeadline":"'.$creativeWorkArray[$i]->getAlternativeHeadline().'","commentCount":'.$creativeWorkArray[$i]->getCommentCount().', "copyrightYear":'.$creativeWorkArray[$i]->getCopyrightYear().', "inLanguage":"'.$creativeWorkArray[$i]->getInLanguage().'", "isAccessibleForFree":'.$creativeWorkArray[$i]->getIsAccessibleForFree().' }';
        if($i < (sizeof($creativeWorkArray)-1)){
            $json = $json.',';
        }
    }
    $json = $json.']';
    return $json;
}
function creativeWorkToJSONWithoutBrackets()
{
    global $creativeWorkArray;
    $json ='';
    for ($i = 0; $i < sizeof($creativeWorkArray); $i++) {
        $json = $json.'{'.'"id":'.$creativeWorkArray[$i]->getId().', "alternativeHeadline":"'.$creativeWorkArray[$i]->getAlternativeHeadline().'","commentCount":'.$creativeWorkArray[$i]->getCommentCount().', "copyrightYear":'.$creativeWorkArray[$i]->getCopyrightYear().', "inLanguage":"'.$creativeWorkArray[$i]->getInLanguage().'", "isAccessibleForFree":'.$creativeWorkArray[$i]->getIsAccessibleForFree().' }';
        if($i < (sizeof($creativeWorkArray)-1)){
            $json = $json.',';
        }
    }
    return $json;
}
function publicationVolumeToJSON()
{
    global $publicationVolumeArray;
    $json ='[';
    for ($i = 0; $i < sizeof($publicationVolumeArray); $i++) {
        $json = $json.'{'.'"@context":"http://schema.org","@type":"PublicationVolume",'.' "id":' .$publicationVolumeArray[$i]->getId(). ', "alternativeHeadline":"'.$publicationVolumeArray[$i]->getAlternativeHeadline().'","commentCount":'.$publicationVolumeArray[$i]->getCommentCount().', "copyrightYear":'.$publicationVolumeArray[$i]->getCopyrightYear().', "inLanguage":"'.$publicationVolumeArray[$i]->getInLanguage().'", "isAccessibleForFree":'.$publicationVolumeArray[$i]->getIsAccessibleForFree().', "pageStart":'.$publicationVolumeArray[$i]->getPageStart().', "pageEnd":'.$publicationVolumeArray[$i]->getPageEnd(). ', "pagination":"'.$publicationVolumeArray[$i]->getPagination().'", "volumeNumber":'.$publicationVolumeArray[$i]->getVolumeNumber().' }';
        if($i < (sizeof($publicationVolumeArray)-1)){
            $json = $json.',';
        }
    }
    $json = $json.']';
    return $json;
}
function publicationVolumeToJSONWithoutBrackets()
{
    global $publicationVolumeArray;
    $json ='';
    for ($i = 0; $i < sizeof($publicationVolumeArray); $i++) {
        $json = $json.'{'.'"id":'.$publicationVolumeArray[$i]->getId().', "alternativeHeadline":"'.$publicationVolumeArray[$i]->getAlternativeHeadline().'","commentCount":'.$publicationVolumeArray[$i]->getCommentCount().', "copyrightYear":'.$publicationVolumeArray[$i]->getCopyrightYear().', "inLanguage":"'.$publicationVolumeArray[$i]->getInLanguage().'", "isAccessibleForFree":'.$publicationVolumeArray[$i]->getIsAccessibleForFree().', "pageStart":'.$publicationVolumeArray[$i]->getPageStart().', "pageEnd":'.$publicationVolumeArray[$i]->getPageEnd(). ', "pagination":"'.$publicationVolumeArray[$i]->getPagination().'", "volumeNumber":'.$publicationVolumeArray[$i]->getVolumeNumber().' }';
        if($i < (sizeof($publicationVolumeArray)-1)){
            $json = $json.',';
        }
    }
    return $json;
}
/*
function softwareApplicationToJSON()
{
    global $softwareApplication;
    $json ='[';
    for ($i = 0; $i < sizeof($softwareApplication); $i++) {
        $json = $json.'{' .'"@context":"http://schema.org","@type":"Article",'. ' "id":'.$softwareApplication[$i]->getId().', "alternativeHeadline":"'.$softwareApplication[$i]->getAlternativeHeadline().'","commentCount":'.$softwareApplication[$i]->getCommentCount().', "copyrightYear":'.$softwareApplication[$i]->getCopyrightYear().', "inLanguage":'.$softwareApplication[$i]->getInLanguage().', "isAccessibleForFree":'.$softwareApplication[$i]->getIsAccessibleForFree().', "applicationCategory":"'.$softwareApplication[$i]->getApplicationCategory().'", "applicationSubCategory":"'.$softwareApplication[$i]->getApplicationSubCategory(). '", "applicationSuite":'.$softwareApplication[$i]->getApplicationSuite().', "fileSize":'.$softwareApplication[$i]->getFileSize().' }';
        if($i<(sizeof($softwareApplication)-1)){
            $json = $json.',';
        }
    }
    $json = $json.']';
    return $json;
}*/


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
function publicationVolumeToHTML(){
    global $publicationVolumeArray;
    $html="<ul>";
    foreach ($publicationVolumeArray as &$publicationVolume) {
        $html = $html."<li>".$publicationVolume->getId()." ".$publicationVolume->getAlternativeHeadline()." ".$publicationVolume->getCommentCount()." ".$publicationVolume->getCopyrightYear()." ".$publicationVolume->getInLanguage()." ".$publicationVolume->getIsAccessibleForFree()." ".$publicationVolume->getPageStart()." ".$publicationVolume->getPageEnd()." ".$publicationVolume->getPagination()." ".$publicationVolume->getVolumeNumber()."</li>";
    }
    $html= $html."</ul>";
    return $html;
}/*
function softwareApplicationToHTML(){
    global $softwareApplication;
    $html="<ul>";
    for($i = 0; $i < sizeof($softwareApplication); $i++) {
        $html = $html."<li>" .$softwareApplication[$i]->getId()." ".$softwareApplication[$i]->getAlternativeHeadline()." ".$softwareApplication[$i]->getCommentCount()." ".$softwareApplication[$i]->getCopyrightYear()." ".$softwareApplication[$i]->getInLanguage()." ".$softwareApplication[$i]->getIsAccessibleForFree()." ".$softwareApplication[$i]->getApplicationCategory()." ".$softwareApplication[$i]->getApplicationSubCategory()." ".$softwareApplication[$i]->applicationSuite()." ".$softwareApplication[$i]->getFileSize()."</li>";
    }
    $html= $html."</ul>";
    return $html;
}*/


// Convert to text
function creativeWorkToText(){
    global $creativeWorkArray;
    $text="";
    foreach ($creativeWorkArray as &$creativeWork) {
        $text = $text.$creativeWork->getId()." ".$creativeWork->getAlternativeHeadline()." ".$creativeWork->getCommentCount()." ".$creativeWork->getCopyrightYear()." ".$creativeWork->getInLanguage()." ".$creativeWork->getIsAccessibleForFree()."\n";
    }
    return $text;
}
function publicationVolumeToText(){
    global $publicationVolumeArray;
    $text="";
    foreach ($publicationVolumeArray as &$publicationVolume) {
        $text= $text.$publicationVolume->getId()." ".$publicationVolume->getAlternativeHeadline()." ".$publicationVolume->getCommentCount()." ".$publicationVolume->getCopyrightYear()." ".$publicationVolume->getInLanguage()." ".$publicationVolume->getIsAccessibleForFree()." ".$publicationVolume->getPageStart()." ".$publicationVolume->getPageEnd()." ".$publicationVolume->getPagination()." ".$publicationVolume->getVolumeNumber()."\n";
    }
    return $text;
}/*
function softwareApplicationToText(){
    global $softwareApplication;
    $text="";
    for($i = 0; $i < sizeof($softwareApplication); $i++) {
    for($i = 0; $i < sizeof($softwareApplication); $i++) {
        $text = $text. $softwareApplication[$i]->getId()." ".$softwareApplication[$i]->getAlternativeHeadline()." ".$softwareApplication[$i]->getCommentCount()." ".$softwareApplication[$i]->getCopyrightYear()." ".$softwareApplication[$i]->getInLanguage()." ".$softwareApplication[$i]->getIsAccessibleForFree()." ".$softwareApplication[$i]->getApplicationCategory()." ".$softwareApplication[$i]->getApplicationSubCategory()." ".$softwareApplication[$i]->applicationSuite()." ".$softwareApplication[$i]->getFileSize()."\n";
    }
    return $text;
}*/


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
class PublicationVolume extends CreativeWork{
    private $pageStart;
    private $pageEnd;
    private $pagination;
    private $volumeNumber;
    function __construct($id, $alternativeHeadline, $commentCount, $copyrightYear, $inLanguage, $isAccessibleForFree, $pageStart, $pageEnd, $pagination, $volumeNumber){
        parent::__construct($id, $alternativeHeadline, $commentCount, $copyrightYear, $inLanguage, $isAccessibleForFree);
        $this->pageStart = $pageStart;
        $this->pageEnd = $pageEnd;
        $this->pagination = $pagination;
        $this->volumeNumber = $volumeNumber;
    }
    function getPageStart(){
        return $this->pageStart;
    }
    public function getPageEnd()
    {
        return $this->pageEnd;
    }
    public function getPagination()
    {
        return $this->pagination;
    }
    public function getVolumeNumber()
    {
        return $this->volumeNumber;
    }
}/*
class SoftwareApplication extends CreativeWork{
    private $applicationCategory;
    private $applicationSubCategory;
    private $applicationSuite;
    private $fileSize;
    function __construct($id, $alternativeHeadline, $commentCount, $copyrightYear, $inLanguage, $isAccessibleForFree, $applicationCategory, $applicationSubCategory, $applicationSuite, $fileSize){
        parent::__construct($id, $alternativeHeadline, $commentCount, $copyrightYear, $inLanguage, $isAccessibleForFree);
        $this->applicationCategory= $applicationCategory;
        $this->applicationSubCategory= $applicationSubCategory;
        $this->applicationSuite= $applicationSuite;
        $this->fileSize= $fileSize;
    }
    public function getApplicationCategory()
    {
        return $this->applicationCategory;
    }
    public function getApplicationSubCategory()
    {
        return $this->applicationSubCategory;
    }
    public function getApplicationSuite()
    {
        return $this->applicationSuite;
    }
    public function getFileSize()
    {
        return $this->fileSize;
    }
}*/

// Arrays creativeWorkArray, publicationVolumeArray, softwareApplicationArray
global $creativeWorkArray;
$creativeWorkArray = Array();
global $publicationVolumeArray;
$publicationVolumeArray = Array();
/*global $softwareApplicationArray;
$softwareApplicationArray = Array();*/
$idCreativeWork = -1;
$idPublicationVolume = -1;
/*$idSoftwareApplication = 1;*/


// Read file elements
// creativeWork
$jsonRead = file_get_contents("creativeWork.json");
$arrayRead = json_decode("[".$jsonRead."]", true);

    foreach ($arrayRead as $jsonObj){
        $id = $jsonObj['id'];
        $alternativeHeadline = $jsonObj['alternativeHeadline'];
        $commentCount = $jsonObj['commentCount'];
        $copyrightYear = $jsonObj['copyrightYear'];
        $inLanguage = $jsonObj['inLanguage'];
        $isAccessibleForFree = $jsonObj['isAccessibleForFree'];
        $creativeWorkArray[] = new CreativeWork($id, $alternativeHeadline, $commentCount, $copyrightYear, $inLanguage, $isAccessibleForFree);
    }
    if(sizeof($creativeWorkArray)!=0){
        $position = sizeof($creativeWorkArray)-1;
        $idCreativeWork = $creativeWorkArray[$position]->getId();
    }

// publicationVolume
$jsonReadPublicationVolume = file_get_contents("publicationVolume.json");
$arrayReadPublicationVolume = json_decode("[".$jsonReadPublicationVolume."]", true);

foreach ($arrayReadPublicationVolume as $jsonObj){
    $id = $jsonObj['id'];
    $alternativeHeadline = $jsonObj['alternativeHeadline'];
    $commentCount = $jsonObj['commentCount'];
    $copyrightYear = $jsonObj['copyrightYear'];
    $inLanguage = $jsonObj['inLanguage'];
    $isAccessibleForFree = $jsonObj['isAccessibleForFree'];
    $pageStart = $jsonObj['pageStart'];
    $pageEnd = $jsonObj['pageEnd'];
    $pagination = $jsonObj['pagination'];
    $volumeNumber = $jsonObj['volumeNumber'];
    $publicationVolumeArray[] = new PublicationVolume($id, $alternativeHeadline, $commentCount, $copyrightYear, $inLanguage, $isAccessibleForFree, $pageStart, $pageEnd, $pagination, $volumeNumber);
}
if(sizeof($publicationVolumeArray)!=0){
    $position = sizeof($publicationVolumeArray)-1;
    $idPublicationVolume = $publicationVolumeArray[$position]->getId();
}


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
            echo "{\"first\":\"creativeWork\",\"second\":\"publicationVolume\",\"third\":\"softwareApplication\"}";
            http_response_code(200);
            break;
        case "OPTIONS":
            http_response_code(200);
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
                case "OPTIONS":
                    http_response_code(200);
                    break;
                default:
                    header('Content-type: text/html');
                    echo creativeWorkToHTML();
                    break;
            }
            break;
        case "PUT":
            http_response_code(404);
            echo "PUT not allowed over every creativeWork.";
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
                global $creativeWorkArray;
                $idCreativeWork++;

                $arr = array('id' => $idCreativeWork, 'alternativeHeadline' => $creativeWork->alternativeHeadline, 'commentCount' => $creativeWork->commentCount, 'copyrightYear' => $creativeWork->copyrightYear, 'inLanguage' => $creativeWork->inLanguage, 'isAccessibleForFree' => $creativeWork->isAccessibleForFree);

                // Added creativeWork to file
                $jsonRead = file_get_contents("creativeWork.json");

                // If it's not empty add commas
                if($jsonRead!=null){
                    file_put_contents("creativeWork.json", ",".json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                }else{
                    file_put_contents("creativeWork.json", json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                }
                http_response_code(200);
            }
            break;
        case "DELETE":
            http_response_code(404);
            echo "DELETE not allowed over every creativeWork.";
            break;
        case "OPTIONS":
            http_response_code(200);
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
                    echo json_encode('{'.'"@context":"http://schema.org","@type":"CreativeWork",'.' "id":'.$id.', "alternativeHeadline":"'.$creativeWorkArray[$i]->getAlternativeHeadline().'", "commentCount":'.$creativeWorkArray[$i]->getCommentCount().', "copyrightYear":'.$creativeWorkArray[$i]->getCopyrightYear().', "inLanguage":"'.$creativeWorkArray[$i]->getInLanguage().'", "isAccessibleForFree":'.$creativeWorkArray[$i]->getIsAccessibleForFree().' }');
                    $getId = true;
                    http_response_code(200);
                }
            }
            if(!$getId){
                http_response_code(404);
                echo "Not allowed.";
            }
            break;
        case "PUT":
            global $put;
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
                $put = false;
                for($i = 0; $i < sizeof($creativeWorkArray); $i++){
                    if($creativeWorkArray[$i]->getId()== $id){
                        $put = true;
                        $creativeWorkArray[$i] = new CreativeWork($id, $creativeWork->alternativeHeadline, $creativeWork->commentCount, $creativeWork->copyrightYear, $creativeWork->inLanguage, $creativeWork->isAccessibleForFree);

                        file_put_contents("creativeWork.json", "");
                        for($j = 0; $j <sizeof($creativeWorkArray); $j++){
                            $arr = array('id' => $creativeWorkArray[$j]->getId(), 'alternativeHeadline' => $creativeWorkArray[$j]->getAlternativeHeadline(), 'commentCount' => $creativeWorkArray[$j]->getCommentCount(), 'copyrightYear' => $creativeWorkArray[$j]->getCopyrightYear(), 'inLanguage' => $creativeWorkArray[$j]->getInLanguage(), 'isAccessibleForFree' => $creativeWorkArray[$j]->getIsAccessibleForFree());

                            // Added creativeWork to file
                            $jsonRead = file_get_contents("creativeWork.json");

                            // If it's not empty add commas
                            if($jsonRead!=null){
                                file_put_contents("creativeWork.json", ",".json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                            }else{
                                file_put_contents("creativeWork.json", json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                            }
                        }
                        http_response_code(200);
                    }
                }
                if(!$put) {
                    http_response_code(404);
                    echo "Not allowed.";
                }
            }
            break;
        case "POST":
            http_response_code(404);
            echo "POST not allowed over a particular creativeWork.";
            break;
        case "DELETE":
            $delete = false;

            for($i = 0; $i < sizeof($creativeWorkArray); $i++) {
                if ($creativeWorkArray[$i]->getId() == $id) {
                    $delete = true;

                    file_put_contents("creativeWork.json", "");
                    for($j = 0; $j <sizeof($creativeWorkArray); $j++){
                        if ($creativeWorkArray[$j]->getId() != $id){
                            $arr = array('id' => $creativeWorkArray[$j]->getId(), 'alternativeHeadline' => $creativeWorkArray[$j]->getAlternativeHeadline(), 'commentCount' => $creativeWorkArray[$j]->getCommentCount(), 'copyrightYear' => $creativeWorkArray[$j]->getCopyrightYear(), 'inLanguage' => $creativeWorkArray[$j]->getInLanguage(), 'isAccessibleForFree' => $creativeWorkArray[$j]->getIsAccessibleForFree());

                            // Added creativeWork to file
                            $jsonRead = file_get_contents("creativeWork.json");

                            // If it's not empty add commas
                            if($jsonRead!=null){
                                file_put_contents("creativeWork.json", ",".json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                            }else{
                                file_put_contents("creativeWork.json", json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                            }
                        }
                    }
                    http_response_code(200);
                }
            }
            if(!$delete) {
                http_response_code(404);
                echo "Not allowed.";
            }
            break;
        case "OPTIONS":
            http_response_code(200);
            break;
        default:
            http_response_code(404);
            echo "Not allowed.";
            break;
    }

    // publicationVolume
}elseif (strcmp('publicationVolume', $request) === 0 && $id == null){
    switch ($_SERVER['REQUEST_METHOD']) {
        case "GET":
            switch ($format) {
                case 'application/ld+json':
                    header('Content-type: application/ld+json');
                    echo json_encode(publicationVolumeToJSON());
                    break;
                case 'text/plain':
                    header('Content-type: text/plain');
                    echo publicationVolumeToText();
                    break;
                case "OPTIONS":
                    http_response_code(200);
                    break;
                default:
                    header('Content-type: text/html');
                    echo publicationVolumeToHTML();
                    break;
            }
            break;
        case "PUT":
            http_response_code(404);
            echo "PUT not allowed over every publicationVolume.";
            break;
        case "POST":
            $publicationVolume = json_decode(file_get_contents('php://input'));
            if($publicationVolume->alternativeHeadline == null) {
                http_response_code(405);
                echo "alternativeHeadline can't be null.";
            }elseif($publicationVolume->commentCount == null) {
                http_response_code(405);
                echo "commentCount can't be null.";
            }elseif($publicationVolume->copyrightYear == null) {
                http_response_code(405);
                echo "copyrightYear can't be null.";
            }elseif($publicationVolume->inLanguage == null) {
                http_response_code(405);
                echo "inLanguage can't be null.";
            }elseif($publicationVolume->isAccessibleForFree == null) {
                http_response_code(405);
                echo "isAccessibleForFree can't be null.";
            }elseif($publicationVolume->pageStart == null) {
                http_response_code(405);
                echo "pageStart can't be null.";
            }elseif($publicationVolume->pageEnd == null) {
                http_response_code(405);
                echo "pageEnd can't be null.";
            }elseif($publicationVolume->pagination == null) {
                http_response_code(405);
                echo "pagination can't be null.";
            }elseif($publicationVolume->volumeNumber == null) {
                http_response_code(405);
                echo "volumeNumber can't be null.";
            }else{
                global $publicationVolumeArray;
                $idPublicationVolume++;

                $arr = array('id' => $idPublicationVolume, 'alternativeHeadline' => $publicationVolume->alternativeHeadline, 'commentCount' => $publicationVolume->commentCount, 'copyrightYear' => $publicationVolume->copyrightYear, 'inLanguage' => $publicationVolume->inLanguage, 'isAccessibleForFree' => $publicationVolume->isAccessibleForFree, 'pageStart' => $publicationVolume->pageStart, 'pageEnd' => $publicationVolume->pageEnd, 'pagination' => $publicationVolume->pagination, 'volumeNumber' => $publicationVolume->volumeNumber);

                // Added publicationVolume to file
                $jsonReadPublicationVolume = file_get_contents("publicationVolume.json");

                // If it's not empty add commas
                if($jsonReadPublicationVolume!=null){
                    file_put_contents("publicationVolume.json", ",".json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                }else{
                    file_put_contents("publicationVolume.json", json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                }
                http_response_code(200);
            }
            break;
        case "DELETE":
            http_response_code(404);
            echo "DELETE not allowed over every publicationVolume.";
            break;
        case "OPTIONS":
            http_response_code(200);
            break;
        default:
            http_response_code(404);
            echo "Not allowed.";
            break;
    }
}elseif (strcmp('publicationVolume', $request) === 0 && $id != null){
    switch ($_SERVER['REQUEST_METHOD']) {
        case "GET":
            $getId = false;
            for($i = 0; $i < sizeof($publicationVolumeArray); $i++) {
                if ($publicationVolumeArray[$i]->getId() == $id) {
                    echo json_encode('{'.'"@context":"http://schema.org","@type":"publicationVolume",'.' "id":'.$id.', "alternativeHeadline":"'.$publicationVolumeArray[$i]->getAlternativeHeadline().'", "commentCount":'.$publicationVolumeArray[$i]->getCommentCount().', "copyrightYear":'.$publicationVolumeArray[$i]->getCopyrightYear().', "inLanguage":"'.$publicationVolumeArray[$i]->getInLanguage().'", "isAccessibleForFree":'.$publicationVolumeArray[$i]->getIsAccessibleForFree().', "pageStart":'.$publicationVolumeArray[$i]->getPageStart().', "pageEnd":'.$publicationVolumeArray[$i]->getPageEnd().', "pagination":"'.$publicationVolumeArray[$i]->getPagination().'", "volumeNumber":'.$publicationVolumeArray[$i]->getVolumeNumber().' }');
                    $getId = true;
                    http_response_code(200);
                }
            }
            if(!$getId){
                http_response_code(404);
                echo "Not allowed.";
            }
            break;
        case "PUT":
            global $put;
            $put = false;
            $publicationVolume = json_decode(file_get_contents('php://input'));
            if($publicationVolume->alternativeHeadline == null) {
                http_response_code(405);
                echo "alternativeHeadline can't be null.";
            }elseif($publicationVolume->commentCount == null) {
                http_response_code(405);
                echo "commentCount can't be null.";
            }elseif($publicationVolume->copyrightYear == null) {
                http_response_code(405);
                echo "copyrightYear can't be null.";
            }elseif($publicationVolume->inLanguage == null) {
                http_response_code(405);
                echo "inLanguage can't be null.";
            }elseif($publicationVolume->isAccessibleForFree == null) {
                http_response_code(405);
                echo "isAccessibleForFree can't be null.";
            }elseif($publicationVolume->pageStart == null) {
                http_response_code(405);
                echo "pageStart can't be null.";
            }elseif($publicationVolume->pageEnd == null) {
                http_response_code(405);
                echo "pageEnd can't be null.";
            }elseif($publicationVolume->pagination == null) {
                http_response_code(405);
                echo "pagination can't be null.";
            }elseif($publicationVolume->volumeNumber == null) {
                http_response_code(405);
                echo "volumeNumber can't be null.";
            }else {
                $put = false;
                for($i = 0; $i < sizeof($publicationVolumeArray); $i++){
                    if($publicationVolumeArray[$i]->getId()== $id){
                        $put = true;
                        $publicationVolumeArray[$i] = new PublicationVolume($id, $publicationVolume->alternativeHeadline, $publicationVolume->commentCount, $publicationVolume->copyrightYear, $publicationVolume->inLanguage, $publicationVolume->isAccessibleForFree, $publicationVolume->pageStart, $publicationVolume->pageEnd, $publicationVolume->pagination, $publicationVolume->volumeNumber);

                        file_put_contents("publicationVolume.json", "");
                        for($j = 0; $j <sizeof($publicationVolumeArray); $j++){
                            $arr = array('id' => $publicationVolumeArray[$j]->getId(), 'alternativeHeadline' => $publicationVolumeArray[$j]->getAlternativeHeadline(), 'commentCount' => $publicationVolumeArray[$j]->getCommentCount(), 'copyrightYear' => $publicationVolumeArray[$j]->getCopyrightYear(), 'inLanguage' => $publicationVolumeArray[$j]->getInLanguage(), 'isAccessibleForFree' => $publicationVolumeArray[$j]->getIsAccessibleForFree(), 'pageStart' => $publicationVolumeArray[$j]->getPageStart(), 'pageEnd' => $publicationVolumeArray[$j]->getPageEnd(), 'pagination' => $publicationVolumeArray[$j]->getPagination(), 'volumeNumber' => $publicationVolumeArray[$j]->getVolumeNumber());

                            // Added publicationVolume to file
                            $jsonReadPublicationVolume = file_get_contents("publicationVolume.json");

                            // If it's not empty add commas
                            if($jsonReadPublicationVolume!=null){
                                file_put_contents("publicationVolume.json", ",".json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                            }else{
                                file_put_contents("publicationVolume.json", json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                            }
                        }
                        http_response_code(200);
                    }
                }
                if(!$put) {
                    http_response_code(404);
                    echo "Not allowed.";
                }
            }
            break;
        case "POST":
            http_response_code(404);
            echo "POST not allowed over a particular publicationVolume.";
            break;
        case "DELETE":
            $delete = false;

            for($i = 0; $i < sizeof($publicationVolumeArray); $i++) {
                if ($publicationVolumeArray[$i]->getId() == $id) {
                    $delete = true;

                    file_put_contents("publicationVolume.json", "");
                    for($j = 0; $j <sizeof($publicationVolumeArray); $j++){
                        if ($publicationVolumeArray[$j]->getId() != $id){
                            $arr = array('id' => $publicationVolumeArray[$j]->getId(), 'alternativeHeadline' => $publicationVolumeArray[$j]->getAlternativeHeadline(), 'commentCount' => $publicationVolumeArray[$j]->getCommentCount(), 'copyrightYear' => $publicationVolumeArray[$j]->getCopyrightYear(), 'inLanguage' => $publicationVolumeArray[$j]->getInLanguage(), 'isAccessibleForFree' => $publicationVolumeArray[$j]->getIsAccessibleForFree(), 'pageStart' => $publicationVolumeArray[$j]->getpageStart(), 'pageEnd' => $publicationVolumeArray[$j]->getPageEnd(), 'pagination' => $publicationVolumeArray[$j]->getPagination(), 'volumeNumber' => $publicationVolumeArray[$j]->getVolumeNumber());

                            // Added publicationVolume to file
                            $jsonReadPublicationVolume = file_get_contents("publicationVolume.json");

                            // If it's not empty add commas
                            if($jsonReadPublicationVolume!=null){
                                file_put_contents("publicationVolume.json", ",".json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                            }else{
                                file_put_contents("publicationVolume.json", json_encode($arr, JSON_PRETTY_PRINT), FILE_APPEND | LOCK_EX);
                            }
                        }
                    }
                    http_response_code(200);
                }
            }
            if(!$delete) {
                http_response_code(404);
                echo "Not allowed.";
            }
            break;
        case "OPTIONS":
            http_response_code(200);
            break;
        default:
            http_response_code(404);
            echo "Not allowed.";
            break;
    }
}else{
    http_response_code(404);
    echo "Not allowed.";
}