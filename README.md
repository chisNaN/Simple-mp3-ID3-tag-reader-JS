# Simple-mp3-ID3-tag-reader-JS
The basic mp3 ID3v1 tag reader based on File API and DataView API


#### 1. Create the instance of reader
```    
var file = new ID3Reader(file_to_read);
```
__file_to_read__ - mp3 file, that your want to read tags. 

EG, 
- Create element `<input type='file'>` 
- Select it ```var input = document.querySelector('input')```
- Select the first file ```var file = input.files[0]``` and paste it to ID3Reader

#### 2. Use the *__read(encodeType, callback)__* method
where
- encodeType - type of encoding text like *('utf-8','windows-1251', 'iso-8859-2', etc..)*. See the full list of encoder types here - https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder 
- callback - callback function that returns object with tags and file info

EG,
```js
file.read('cp1251',function(data){
    console.log(data)
})
```
#### 3. Returned data
The method __read()__ will return object with metadata

```js
file.read('cp1251',function(data){
    console.log(data)
})

// returns
{
    Album: "Fear Of The Dark"
    Artist: "Iron Maiden"
    Comment: "Только для ознакомления"
    File Info: {
            Name: "Iron Maiden - Childhood's End.mp3", 
            Size: "10.75 mb", 
            Type: "audio/mp3"
        }
    Genre: "Other"
    Title: "Childhood's End"
    Track №: "5"
    Year: "1992"
}
```
where:
- __Album__ - album of this track
- __Artist__ - main performer/artist of this track
- __Comment__ - comment if exist (if tag is empty this returns 'no comment')
- __File Info__ - object with file info data (*name, size, type*)
- __Genre__ - music genre of this track(*pop, alternative, blues etc*)
- __Title__ - title of this track
- __Track №__ - track number in album
- __Year__ - year of this track

if mp3 file has no metadata, this method returns error 'marker TAG not found'

#### 4. SOON > FULL ID3 v2 Reader!
