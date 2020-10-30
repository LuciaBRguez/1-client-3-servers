### 1-client-3-servers
#### Implementation of a WEB client and a system in Python, JavaScript and PHP.

Schema entities used:
* CreativeWork
    * alternativeHeadline (text)
    * commentCount (integer)
    * copyrightYear (number)
    * inLanguage (text)
    * isAccessibleForFree (Boolean)

* PublicationVolume 
   * pageEnd (integer)
   * pageStart (integer)
   * pagination (text)
   * volumeNumber (integer)

* SoftwareApplication 
   * applicationCategory (text)
   * applicationSubCategory (text)
   * applicationSuite (text)
   * fileSize (text)

Both PublicationVolume and SoftwareApplication are children of CreativeWork.
