# Simple-mp3-ID3-tag-reader-JS
The basic mp3 ID3v1 tag reader based on File API and DataView API


1. Create the instance of reader
```    
var file = new ID3Reader(file_to_read);
```
__file_to_read__ - mp3 file, that your want to read tags. 

EG, 
- Create element `<input type='file'>` 
- Select it ```var input = document.querySelector('input')```
- Select the first file ```var file = input.files[0]``` and paste it to ID3Reader

2. Use the *__read(encodeType, callback)__* method
where
- encodeType - type of encoding text. like('utf-8','windows-1251', 'iso-8859-2', etc..). See the full list of encoder types here - https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder 
- callback - callback function that returns object with tags and file info

EG,
```js
file.read('cp1251',function(data){
    console.log(data)
})
```
