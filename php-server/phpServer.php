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
function publicationVolumeToJSON()
{
    global $publicationVolume;
    $json ='[';
    for ($i = 0; $i < sizeof($publicationVolume); $i++) {
        $json = $json.'{'.'"@context":"http://schema.org","@type":"Book".'.' "id":' .$publicationVolume[$i]->getId(). ', "alternativeHeadline":"'.$publicationVolume[$i]->getAlternativeHeadline().'","commentCount":'.$publicationVolume[$i]->getCommentCount().', "copyrightYear":'.$publicationVolume[$i]->getCopyrightYear().', "inLanguage":'.$publicationVolume[$i]->getInLanguage().', "isAccessibleForFree":'.$publicationVolume[$i]->getIsAccessibleForFree().', "getPageStart":"'.$publicationVolume[$i]->getPageStart().'", "pageEnd":"'.$publicationVolume[$i]->getPageEnd(). '", "pagination":'.$publicationVolume[$i]->getPagination().', "volumeNumber":'.$publicationVolume[$i]->getVolumeNumber().' }';
        if($i < (sizeof($publicationVolume)-1)){
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
function publicationVolumeToHTML(){
    global $publicationVolumeArray;
    $html="<ul>";
    foreach ($publicationVolumeArray as &$publicationVolume) {
        $html = $html."<li>".$publicationVolume->getId()." ".$publicationVolume->getAlternativeHeadline()." ".$publicationVolume->getCommentCount()." ".$publicationVolume->getCopyrightYear()." ".$publicationVolume->getInLanguage()." ".$publicationVolume->getIsAccessibleForFree()." ".$publicationVolume->getPageStart()." ".$publicationVolume->getPageEnd()." ".$publicationVolume->getPagination()." ".$publicationVolume->getVolumeNumber()."</li>";
    }
    $html= $html."</ul>";
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
function publicationVolumeToText(){
    global $publicationVolumeArray;
    $text="";
    foreach ($publicationVolumeArray as &$publicationVolume) {
        $text= $text.$publicationVolume->getId()." ".$publicationVolume->getAlternativeHeadline()." ".$publicationVolume->getCommentCount()." ".$publicationVolume->getCopyrightYear()." ".$publicationVolume->getInLanguage()." ".$publicationVolume->getIsAccessibleForFree()." ".$publicationVolume->getPageStart()." ".$publicationVolume->getPageEnd()." ".$publicationVolume->getPagination()." ".$publicationVolume->getVolumeNumber()."\n";
    }
    return $text;
}

// Classes creativeWork, publicationVolume
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
}

// Arrays creativeWorkArray, publicationVolumeArray
global $creativeWorkArray;
$creativeWorkArray = Array();
global $publicationVolumeArray;
$publicationVolumeArray = Array();
/*global $softwareApplicationArray;
$softwareApplicationArray = Array();*/
$idCreativeWork = 0;
$idPublicationVolume = 0;
/*$idSoftwareApplication = 1;*/

// new Objects creativeWork, publicationVolume, softwareApplication
$creativeWorkArray[] = new CreativeWork(0, "creativeWork", 8, 1999, "English", false);
$publicationVolumeArray[] = new PublicationVolume(0,"publicationVolume", 5, 2001, "German", true, 1, 100, "pagination", 3);

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
                echo "Not allowed.";
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
                    unset($creativeWorkArray[$i]);
                }
            }
            if(!$delete) {
                http_response_code(404);
                echo "Not allowed.";
            }
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
                $idPublicationVolume++;
                $newPublicationVolume = new PublicationVolume($idPublicationVolume, $publicationVolume->alternativeHeadline, $publicationVolume->commentCount, $publicationVolume->copyrightYear, $publicationVolume->inLanguage, $publicationVolume->isAccessibleForFree, $publicationVolume->pageStart, $publicationVolume->pageEnd, $publicationVolume->pagination, $publicationVolume->volumeNumber);
                global $creativeWorkArray;
                $creativeWorkArray[]= $newPublicationVolume;
                echo $newPublicationVolume->getId()."";
            }
            break;
        case "DELETE":
            http_response_code(404);
            echo "DELETE not allowed over every publicationVolume.";
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
                    echo json_encode('{'.'"@context":"http://schema.org","@type":"PublicationVolume",'.' "id":'.$id.', "alternativeHeadline":"'.$publicationVolumeArray[$i]->getAlternativeHeadline().'","commentCount":'.$publicationVolumeArray[$i]->getCommentCount().', "copyrightYear":'.$publicationVolumeArray[$i]->getCopyrightYear().', "inLanguage":'.$publicationVolumeArray[$i]->getInLanguage().', "isAccessibleForFree":'.$publicationVolumeArray[$i]->getIsAccessibleForFree().', "pageStart":'.$publicationVolumeArray[$i]->getPageStart().', "pageEnd":'.$publicationVolumeArray[$i]->getPageEnd().', "pagination":'.$publicationVolumeArray[$i]->getPagination().', "volumeNumber":'.$publicationVolumeArray[$i]->getVolumeNumber().' }');
                    $getId = true;
                }
            }
            if(!$getId){
                http_response_code(404);
                echo "Not allowed.";
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
                for($i = 0; $i < sizeof($publicationVolume); $i++){
                    if($publicationVolumeArray[$i]->getId()== $id){
                        $put = true;
                        global $publicationVolumeArray;
                        $publicationVolumeArray[$i] = new PublicationVolume($idPublicationVolume, $publicationVolume->alternativeHeadline, $publicationVolume->commentCount, $publicationVolume->copyrightYear, $publicationVolume->inLanguage, $publicationVolume->isAccessibleForFree, $publicationVolume->pageStart, $publicationVolume->pageEnd, $publicationVolume->pagination, $publicationVolume->volumeNumber);
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
            echo "POST not allowed over a particular publicationVolume.";
            break;
        case "DELETE":
            $delete = false;
            for($i = 0; $i < sizeof($publicationVolumeArray); $i++) {
                if ($publicationVolumeArray[$i]->getId() == $id) {
                    $delete = true;
                    unset($publicationVolumeArray[$i]);
                }
            }
            if(!$delete) {
                http_response_code(404);
                echo "Not allowed.";
            }
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