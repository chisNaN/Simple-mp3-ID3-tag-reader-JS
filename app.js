
var fileElm = document.querySelector('input');
var button = document.querySelector('button');

// Главный класс
var ID3Reader = function(file){
    this.file = file;
    this.GENRES = [
        "Blues","Classic Rock","Country","Dance","Disco","Funk","Grunge","Hip-Hop","Jazz","Metal","New Age",
        "Oldies","Other","Pop","R&B","Rap","Reggae","Rock","Techno","Industrial","Alternative","Ska","Death Metal",
        "Pranks","Soundtrack","Euro-Techno","Ambient","Trip-Hop","Vocal","Jazz+Funk","Fusion","Trance","Classical",
        "Instrumental","Acid","House","Game","Sound Clip","Gospel","Noise","AlternRock","Bass","Soul","Punk","Space",
        "Meditative","Instrumental Pop","Instrumental Rock","Ethnic","Gothic","Darkwave","Techno-Industrial","Electronic",
        "Pop-Folk","Eurodance","Dream","Southern Rock","Comedy","Cult","Gangsta","Top 40","Christian Rap","Pop/Funk",
        "Jungle","Native American","Cabaret","New Wave","Psychadelic","Rave","Showtunes","Trailer","Lo-Fi","Tribal",
        "Acid Punk","Acid Jazz","Polka","Retro","Musical","Rock & Roll","Hard Rock","Folk","Folk-Rock","National Folk",
        "Swing","Fast Fusion","Bebob","Latin","Revival","Celtic","Bluegrass","Avantgarde","Gothic Rock","Progressive Rock",
        "Psychedelic Rock","Symphonic Rock","Slow Rock","Big Band","Chorus","Easy Listening","Acoustic","Humour","Speech",
        "Chanson","Opera","Chamber Music","Sonata","Symphony","Booty Bass","Primus","Porn Groove","Satire","Slow Jam","Club",
        "Tango","Samba","Folklore","Ballad","Power Ballad","Rhythmic Soul","Freestyle","Duet","Punk Rock","Drum Solo",
        "A capella","Euro-House","Dance Hall","Goa","Drum & Bass","Club-House","Hardcore Techno","Terror","Indie","BritPop",
        "Negerpunk","Polsk Punk","Beat","Christian Gangsta Rap","Heavy Metal","Black Metal","Crossover","Contemporary Christian",
        "Christian rock","Merengue","Salsa","Thrash Metal","Anime","Jpop", "Synthpop","Abstract","Art Rock","Baroque",
        "Bhangra","Big beat","Breakbeat","Chillout","Downtempo","Dub","EBM","Eclectic","Electro","Electroclash","Emo",
        "Experimental","Garage","Global","IDM","Illbient","Industro-Goth","Jam Band","Krautrock","Leftfield","Lounge",
        "Math Rock","New Romantic","Nu-Breakz","Post-Punk","Post-Rock","Psytrance","Shoegaze","Space Rock","Trop Rock",
        "World Music","Neoclassical","Audiobook","Audio theatre","Neue Deutsche Welle","Podcast","Indie-Rock","G-Funk",
        "Dubstep","Garage Rock","Psybient"
    ];
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
        
        if(self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 0, 3))=== 'TAG') {
            // Отправляем в callback
            callback({
                'Title':    self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 3, 30)),
                'Artist':   self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 33, 30)),
                'Album':    self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 63, 30)),
                'Year':     self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 93, 4)),
                'Comment':  self.STRING_DECODE(encodeType,self.STRING_PARSE(dataView, 97, 28)),
                'Track №':  dataView.getUint8(126).toString(),
                'genre':    self.GET_GENRE(dataView.getUint8(127)),
                'File Info': {
                    'Name': self.file.name,
                    'Last Modified': new Date(self.file.lastModified),
                    'Size': ((self.file.size) / (1024*1024)).toFixed(2) + ` mb`,
                    'Type': self.file.type
                }
                
            })
        } else {
            throw new Error('marker TAG not found')
        }
        
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
ID3Reader.prototype.GET_GENRE = function(number){
    return (this.GENRES[number]) ? this.GENRES[number] : 'no genre' ;
}


button.onclick = function(){  
    let file = new ID3Reader(fileElm.files[0]);
    file.read('cp1251',function(data){
        console.log(data)
    })
}