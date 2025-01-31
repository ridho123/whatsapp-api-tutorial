const { Client, MessageMedia } = require('whatsapp-web.js');
const moment = require('moment');
const express = require('express');
const { body, validationResult } = require('express-validator');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const { phoneNumberFormatter } = require('./helpers/formatter');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const port = process.env.PORT || 8000;
//const DOMParser = require('xmldom').DOMParser;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(fileUpload({
  debug: true
}));

const db = require('./helpers/db.js');

(async() => {
  app.get('/', (req, res) => {
    res.sendFile('index.html', {
      root: __dirname
    });
  });
  
  const savedSession = await db.readSession();
  const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu'
      ],
    },
    session: savedSession
  });

  client.on('message', msg => {
     result = msg.body.toUpperCase();
    if (result == 'PING') {
      msg.reply('pong');
    } else if (result == 'GOOD MORNING' || result == 'SELAMAT PAGI') {
      msg.reply('selamat pagi');
    } else if(result=='SHALAT TANGSEL') {
        var today = new Date().toISOString().substring(0, 10);
        
        axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/678/tanggal/'+today)
        .then(res => {
          pesan = "Jadwal Shalat Tangerang Selatan\n"+"Tanggal : "+res.data.query.tanggal+"\n"+"imsak : "+res.data.jadwal.data.imsak+"\n"+"terbit : "+res.data.jadwal.data.terbit+"\n"+"subuh : "+res.data.jadwal.data.subuh+"\n"+"dhuha : "+res.data.jadwal.data.dhuha+"\n"+"dzuhur : "+res.data.jadwal.data.dzuhur+"\n"+"ashar : "+res.data.jadwal.data.ashar+"\n"+"maghrib : "+res.data.jadwal.data.maghrib+"\n"+"isya : "+res.data.jadwal.data.isya+"\n"
         msg.reply(pesan); 
         // msg.reply(res.data.jadwal.data.imsak);
        })
        .catch(error => {
          msg.reply('Error');
        });
     } else if(result=='SHALAT PALEMBANG') {
        var today = new Date().toISOString().substring(0, 10);
        
        axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/622/tanggal/'+today)
        .then(res => {
          pesan = "Jadwal Shalat Palembang\n"+"Tanggal : "+res.data.query.tanggal+"\n"+"imsak : "+res.data.jadwal.data.imsak+"\n"+"terbit : "+res.data.jadwal.data.terbit+"\n"+"subuh : "+res.data.jadwal.data.subuh+"\n"+"dhuha : "+res.data.jadwal.data.dhuha+"\n"+"dzuhur : "+res.data.jadwal.data.dzuhur+"\n"+"ashar : "+res.data.jadwal.data.ashar+"\n"+"maghrib : "+res.data.jadwal.data.maghrib+"\n"+"isya : "+res.data.jadwal.data.isya+"\n"
         msg.reply(pesan); 
         // msg.reply(res.data.jadwal.data.imsak);
        })
        .catch(error => {
          msg.reply('Error');
        });
     } else if(result=='SHALAT JAMBI') {
        var today = new Date().toISOString().substring(0, 10);
        
        axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/608/tanggal/'+today)
        .then(res => {
          pesan = "Jadwal Shalat Jambi\n"+"Tanggal : "+res.data.query.tanggal+"\n"+"imsak : "+res.data.jadwal.data.imsak+"\n"+"terbit : "+res.data.jadwal.data.terbit+"\n"+"subuh : "+res.data.jadwal.data.subuh+"\n"+"dhuha : "+res.data.jadwal.data.dhuha+"\n"+"dzuhur : "+res.data.jadwal.data.dzuhur+"\n"+"ashar : "+res.data.jadwal.data.ashar+"\n"+"maghrib : "+res.data.jadwal.data.maghrib+"\n"+"isya : "+res.data.jadwal.data.isya+"\n"
         msg.reply(pesan); 
         // msg.reply(res.data.jadwal.data.imsak);
        })
        .catch(error => {
          msg.reply('Error');
        });
     } else if(result=='SHALAT PADANG') {
        var today = new Date().toISOString().substring(0, 10);
        
        axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/580/tanggal/'+today)
        .then(res => {
          pesan = "Jadwal Shalat Padang\n"+"Tanggal : "+res.data.query.tanggal+"\n"+"imsak : "+res.data.jadwal.data.imsak+"\n"+"terbit : "+res.data.jadwal.data.terbit+"\n"+"subuh : "+res.data.jadwal.data.subuh+"\n"+"dhuha : "+res.data.jadwal.data.dhuha+"\n"+"dzuhur : "+res.data.jadwal.data.dzuhur+"\n"+"ashar : "+res.data.jadwal.data.ashar+"\n"+"maghrib : "+res.data.jadwal.data.maghrib+"\n"+"isya : "+res.data.jadwal.data.isya+"\n"
         msg.reply(pesan); 
         // msg.reply(res.data.jadwal.data.imsak);
        })
        .catch(error => {
          msg.reply('Error');
        });

     } else if(result=='SHALAT DEPOK') {
        var today = new Date().toISOString().substring(0, 10);
        
        axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/703/tanggal/'+today)
        .then(res => {
          pesan = "Jadwal Shalat Jambi\n"+"Tanggal : "+res.data.query.tanggal+"\n"+"imsak : "+res.data.jadwal.data.imsak+"\n"+"terbit : "+res.data.jadwal.data.terbit+"\n"+"subuh : "+res.data.jadwal.data.subuh+"\n"+"dhuha : "+res.data.jadwal.data.dhuha+"\n"+"dzuhur : "+res.data.jadwal.data.dzuhur+"\n"+"ashar : "+res.data.jadwal.data.ashar+"\n"+"maghrib : "+res.data.jadwal.data.maghrib+"\n"+"isya : "+res.data.jadwal.data.isya+"\n"
         msg.reply(pesan); 
         // msg.reply(res.data.jadwal.data.imsak);
        })
        .catch(error => {
          msg.reply('Error');
        });

     } else if(result=='SHALAT JAKARTA') {
        var today = new Date().toISOString().substring(0, 10);
        
        axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/667/tanggal/'+today)
        .then(res => {
          pesan = "Jadwal Shalat Jakarta\n"+"Tanggal : "+res.data.query.tanggal+"\n"+"imsak : "+res.data.jadwal.data.imsak+"\n"+"terbit : "+res.data.jadwal.data.terbit+"\n"+"subuh : "+res.data.jadwal.data.subuh+"\n"+"dhuha : "+res.data.jadwal.data.dhuha+"\n"+"dzuhur : "+res.data.jadwal.data.dzuhur+"\n"+"ashar : "+res.data.jadwal.data.ashar+"\n"+"maghrib : "+res.data.jadwal.data.maghrib+"\n"+"isya : "+res.data.jadwal.data.isya+"\n"
         msg.reply(pesan); 
        })
        .catch(error => {
          msg.reply('Error');
        });


     } else if(result=='SHALAT PEKANBARU') {
         var today = new Date().toISOString().substring(0, 10);
        axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/597/tanggal/'+today)
        .then(res => {
          pesan = "Jadwal Shalat Pekanbaru\n"+"Tanggal : "+res.data.query.tanggal+"\n"+"imsak : "+res.data.jadwal.data.imsak+"\n"+"terbit : "+res.data.jadwal.data.terbit+"\n"+"subuh : "+res.data.jadwal.data.subuh+"\n"+"dhuha : "+res.data.jadwal.data.dhuha+"\n"+"dzuhur : "+res.data.jadwal.data.dzuhur+"\n"+"ashar : "+res.data.jadwal.data.ashar+"\n"+"maghrib : "+res.data.jadwal.data.maghrib+"\n"+"isya : "+res.data.jadwal.data.isya+"\n"
          msg.reply(pesan); 
        })
        .catch(error => {
          msg.reply('Error');
        });
      } else if(result=='COVID') {
         var today = new Date().toISOString().substring(0, 10);
        axios.get('https://data.covid19.go.id/public/api/update.json')
        .then(res => {
           msg.reply("Data COVID Indonesia per "+JSON.stringify(res.data.update.penambahan.tanggal)+"\nSumber covid19.go.id\n\nJumlah Positif: *"+JSON.stringify(res.data.update.penambahan.jumlah_positif).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")  +"*\nJumlah Meninggal: *"+JSON.stringify(res.data.update.penambahan.jumlah_meninggal).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") +"*\nJumlah Sembuh: *"+JSON.stringify(res.data.update.penambahan.jumlah_sembuh).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") +"*\nJumlah Dirawat: *"+JSON.stringify(res.data.update.penambahan.jumlah_dirawat).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") +"*\n\nSelalu terapkan 3M ya!");
        })
        .catch(error => {
          msg.reply('Error');
        });     
     
    } else if (result == '!groupsxx') {
      client.getChats().then(chats => {
        const groups = chats.filter(chat => chat.isGroup);
  
        if (groups.length == 0) {
          msg.reply('You have no group yet.');
        } else {
          let replyMsg = '*YOUR GROUPS*\n\n';
          groups.forEach((group, i) => {
            replyMsg += 'ID: ${group.id._serialized}\nName: ${group.name}\n\n';
          });
          replyMsg += '_You can use the group id to send a message to the group._'
          msg.reply(replyMsg);
        }
      });
    } else {
      /*
      const myArray = result.split(" ");
      if(myArray.length>0)
      {
        if(myArray[0]=='CALLSIGN')
        {
            axios.get('https://xmldata.qrz.com/xml/current/?username=YD0AKO;password=ridho123$;agent=q5.0', {
              timeout: 3000,
              responseType: 'document'
            })
            .then(res => {
              const xml = res.data;
             
                var doc = new DOMParser().parseFromString(
                    xml
                    ,'text/xml');
             
             var x = doc.getElementsByTagName('key')[0].firstChild.nodeValue;
                     
             msg.reply("HASIL "+ x);
            })
            .catch(error => {
              msg.reply('Error');
            });     
        } else if(result == 'MENU' || result == 'START'  ) {
            msg.reply('Selamat Datang di Whatsapp Bot NADIFA\n------------------------------------\n\nSilahkan ketikkan perintah di bawah ini untuk mendapatkan informasi:\n\nCOVID\n\nSHALAT TANGSEL\nSHALAT PEKANBARU\nSHALAT PALEMBANG\nSHALAT JAMBI\nSHALAT PADANG\nSHALAT DEPOK\nSHALAT JAKARTA \n\n-----------------------');
        }
        
      } else if(result == 'MENU' || result == 'START'  ) {
        msg.reply('Selamat Datang di Whatsapp Bot NADIFA\n------------------------------------\n\nSilahkan ketikkan perintah di bawah ini untuk mendapatkan informasi:\n\nCOVID\n\nSHALAT TANGSEL\nSHALAT PEKANBARU\nSHALAT PALEMBANG\nSHALAT JAMBI\nSHALAT PADANG\nSHALAT DEPOK\nSHALAT JAKARTA \n\n-----------------------');
      }
      */
    }
  });
  
  client.initialize();
  
  // Socket IO
  io.on('connection', function(socket) {
    socket.emit('message', 'Connecting...');
  
    client.on('qr', (qr) => {
      console.log('QR RECEIVED', qr);
      qrcode.toDataURL(qr, (err, url) => {
        socket.emit('qr', url);
        socket.emit('message', 'QR Code received, scan please!');
      });
    });
  
    client.on('ready', () => {
      socket.emit('ready', 'Whatsapp is ready!');
      socket.emit('message', 'Whatsapp is ready!');
    });
  
    client.on('authenticated', (session) => {
      socket.emit('authenticated', 'Whatsapp is authenticated!');
      socket.emit('message', 'Whatsapp is authenticated!');
      console.log('AUTHENTICATED', session);
      // Save session to DB
      db.saveSession(session);
    });
  
    client.on('auth_failure', function(session) {
      socket.emit('message', 'Auth failure, restarting...');
    });
  
    client.on('disconnected', (reason) => {
      socket.emit('message', 'Whatsapp is disconnected!');
      // Remove session from DB
      db.removeSession();
      client.destroy();
      client.initialize();
    });
  });
  
  
  const checkRegisteredNumber = async function(number) {
    const isRegistered = await client.isRegisteredUser(number);
    return isRegistered;
  }
  
  // Send message
  
  app.post('/send-message', [
    body('number').notEmpty(),
    body('message').notEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req).formatWith(({
      msg
    }) => {
      return msg;
    });
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: errors.mapped()
      });
    }
  
    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;
  
    const isRegisteredNumber = await checkRegisteredNumber(number);
  
    if (!isRegisteredNumber) {
      return res.status(422).json({
        status: false,
        message: 'The number is not registered'
      });
    }
  
    client.sendMessage(number, message).then(response => {
      res.status(200).json({
        status: true,
        response: response
      });
    }).catch(err => {
      res.status(500).json({
        status: false,
        response: err
      });
    });
  });
  
  // Send media
  app.post('/send-media', async (req, res) => {
    const number = phoneNumberFormatter(req.body.number);
    const caption = req.body.caption;
    const fileUrl = req.body.file;
  
    // const media = MessageMedia.fromFilePath('./image-example.png');
    // const file = req.files.file;
    // const media = new MessageMedia(file.mimetype, file.data.toString('base64'), file.name);
    let mimetype;
    const attachment = await axios.get(fileUrl, {
      responseType: 'arraybuffer'
    }).then(response => {
      mimetype = response.headers['content-type'];
      return response.data.toString('base64');
    });
  
    const media = new MessageMedia(mimetype, attachment, 'Media');
  
    client.sendMessage(number, media, {
      caption: caption
    }).then(response => {
      res.status(200).json({
        status: true,
        response: response
      });
    }).catch(err => {
      res.status(500).json({
        status: false,
        response: err
      });
    });
  });
  
  const findGroupByName = async function(name) {
    const group = await client.getChats().then(chats => {
      return chats.find(chat => 
        chat.isGroup && chat.name.toLowerCase() == name.toLowerCase()
      );
    });
    return group;
  }
  
  // Send message to group
  // You can use chatID or group name, yea!
  app.post('/send-group-message', [
    body('id').custom((value, { req }) => {
      if (!value && !req.body.name) {
        throw new Error('Invalid value, you can use `id` or `name`');
      }
      return true;
    }),
    body('message').notEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req).formatWith(({
      msg
    }) => {
      return msg;
    });
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: errors.mapped()
      });
    }
  
    let chatId = req.body.id;
    const groupName = req.body.name;
    const message = req.body.message;
  
    // Find the group by name
    if (!chatId) {
      const group = await findGroupByName(groupName);
      if (!group) {
        return res.status(422).json({
          status: false,
          message: 'No group found with name: ' + groupName
        });
      }
      chatId = group.id._serialized;
    }
  
    client.sendMessage(chatId, message).then(response => {
      res.status(200).json({
        status: true,
        response: response
      });
    }).catch(err => {
      res.status(500).json({
        status: false,
        response: err
      });
    });
  });
  
  server.listen(port, function() {
    console.log('App running on *: ' + port);
  });
})();
