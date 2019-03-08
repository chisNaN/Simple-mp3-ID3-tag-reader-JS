
var fileElm = document.querySelector('input');
var button = document.querySelector('button');

// Главный класс
var ID3Reader = function(file){
    this.file = file;
}
// Чтение файла побитово
ID3Reader.prototype.read = function(encodeType,callback){
    var blob = this.file.slice(this.file.size - 128, this.file.size);
    var reader = new FileReader();
    var self = this;
    (encodeType === null || encodeType==='') ? encodeType = 'utf-8' : encodeType;
    
    reader.onload = function(evt) {
        var buff = evt.target.result;
        var dataView = new DataView(buff);
        
        // Отправляем в callback
        callback({
            'TAG':      self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 0, 3)),
            'Title':    self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 3, 30)),
            'Artist':   self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 33, 30)),
            'Album':    self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 63, 30)),
            'Year':     self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 93, 4)),
            'File Info': {
                'Name': self.file.name,
                'Last Modified': new Date(self.file.lastModified),
                'Size': ((self.file.size) / (1024*1024)).toFixed(2) + ` mb`,
                'Type': self.file.type
            }
            
        })
    }
    reader.readAsArrayBuffer(blob);
}
// Собираем побитово данные из каждоо тега
ID3Reader.prototype.STRING_PARSE = function(dataView,offset,length){
    // массив байт для перевода в строку
    var bytes = [];
    for (var i = offset; i < offset + length; i++) {
        // Оставляем только пробелы и читаемые символы
        if (dataView.getUint8(i) >= 32) {
            bytes.push(dataView.getUint8(i));
        }
    }
    return bytes;
    
}
// Декодируем биты в строку 
ID3Reader.prototype.STRING_DECODE = function(encode, data){
    var decoder = new TextDecoder(encode);
    var bytes = new Uint8Array(data);
    return decoder.decode(bytes).trim();
}

button.onclick = function(){
        
    let file = new ID3Reader(fileElm.files[0]);
    file.read('cp1251',function(data){
        console.log(data)
    })
}