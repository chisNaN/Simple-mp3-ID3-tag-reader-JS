
var fileElm = document.querySelector('input');
var button = document.querySelector('button');

// Главный класс
var ID3Reader = function(file){
    this.file = file;
    this.TYPE_TAGS = [
        'AENC',    // Audio encryption
        'APIC',    // Attached picture
        'COMM',    // Comments
        'COMR',    // Commercial frame
        'ENCR',    // Encryption method registration
        'EQUA',    // Equalization
        'ETCO',    // Event timing codes
        'GEOB',    // General encapsulated object
        'GRID',    // Group identification registration
        'IPLS',    // Involved people list
        'LINK',    // Linked information
        'MCDI',    // Music CD identifier
        'MLLT',    // MPEG location lookup table
        'OWNE',    // Ownership frame
        'PRIV',    // Private frame
        'PCNT',    // Play counter
        'POPM',    // Popularimeter
        'POSS',    // Position synchronisation frame
        'RBUF',    // Recommended buffer size
        'RVAD',    // Relative volume adjustment
        'RVRB',    // Reverb
        'SYLT',    // Synchronized lyric/text
        'SYTC',    // Synchronized tempo codes
        'TALB',    // Album/Movie/Show title
        'TBPM',    // BPM (beats per minute)
        'TCOM',    // Composer
        'TCON',    // Content type
        'TCOP',    // Copyright message
        'TDAT',    // Date
        'TDLY',    // Playlist delay
        'TENC',    // Encoded by
        'TEXT',    // Lyricist/Text writer
        'TFLT',    // File type
        'TIME',    // Time
        'TIT1',    // Content group description
        'TIT2',    // Title/songname/content description
        'TIT3',    // Subtitle/Description refinement
        'TKEY',    // Initial key
        'TLAN',    // Language(s)
        'TLEN',    // Length
        'TMED',    // Media type
        'TOAL',    // Original album/movie/show title
        'TOFN',    // Original filename
        'TOLY',    // Original lyricist(s)/text writer(s)
        'TOPE',    // Original artist(s)/performer(s)
        'TORY',    // Original release year
        'TOWN',    // File owner/licensee
        'TPE1',    // Lead performer(s)/Soloist(s)
        'TPE2',    // Band/orchestra/accompaniment
        'TPE3',    // Conductor/performer refinement
        'TPE4',    // Interpreted, remixed, or otherwise modified by
        'TPOS',    // Part of a set
        'TPUB',    // Publisher
        'TRCK',    // Track number/Position in set
        'TRDA',    // Recording dates
        'TRSN',    // Internet radio station name
        'TRSO',    // Internet radio station owner
        'TSIZ',    // Size
        'TSRC',    // ISRC (international standard recording code)
        'TSSE',    // Software/Hardware and settings used for encoding
        'TYER',    // Year
        'TXXX',    // User defined text information frame
        'UFID',    // Unique file identifier
        'USER',    // Terms of use
        'USLT',    // Unsychronized lyric/text transcription
        'WCOM',    // Commercial information
        'WCOP',    // Copyright/Legal information
        'WOAF',    // Official audio file webpage
        'WOAR',    // Official artist/performer webpage
        'WOAS',    // Official audio source webpage
        'WORS',    // Official internet radio station homepage
        'WPAY',    // Payment
        'WPUB',    // Publishers official webpage
        'WXXX',    // User defined URL link frame
        "TDRC"    // Unknown, possibly year !!!
    ];
}
// Чтение файла побитово
ID3Reader.prototype.read = function(encodeType,callback){
    var blob = this.file.slice(0, this.file.size);
    var reader = new FileReader();
    var self = this;
    (encodeType === null || encodeType==='') ? encodeType = 'utf-8' : encodeType;
    
    reader.onload = function(evt) {
        var buff = evt.target.result;
        var dataView = new DataView(buff);
        
        console.log( 'ID3 >> ',self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 0, 3) ))
        console.log( 'FRAME_NAME >> ', self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 10, 4) ))
        console.log( 'FRAME_SIZE >> ', self.STRING_PARSE(dataView, 14, 4) )
        console.log( 'FRAME_FLAGS >> ', self.STRING_PARSE(dataView, 18, 2) )
        console.log( 'FRAME_DATA >> ', self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 20, 44) ))

        // Первые 10 байт - заголовок тега >> ID3 + ....
        // Тег состоит из фреймов.
        // Фрейм в свою очередь имеет заголовок и значение фрейма.
        // Заголовок всегда занимает 10 байт.
        // В котором содержится параметры фрейма: ID (4 байта), размер (4 байта), флаги (2 байта)

        // From: https://habr.com/ru/post/140695/
        //в данном виде хранятся размеры тега  размеры фрейма
        // function UnSynchsafeInt(buffer){
        //     var value=0;
        //     for(var i=0,length=buffer.length;i<length;i++){
        //         value+=(buffer.byteAt(i)&0x7F)*Math.pow(Math.pow(2,7),length-i-1);
        //     }
        //     return value;
        // }
 
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
    return decoder.decode(bytes);
}
ID3Reader.prototype.GET_GENRE = function(number){
    return (this.GENRES[number]) ? this.GENRES[number] : 'no genre' ;
}
// Устанавливаем тэг в файл 
ID3Reader.prototype.setTag = function(tag){

}

button.onclick = function(){  
    let file = new ID3Reader(fileElm.files[0]);
    file.read('',function(data){
        console.log(data)
    })
}