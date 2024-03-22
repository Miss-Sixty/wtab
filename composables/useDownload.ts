import dayjs from 'dayjs'
import { parse, stringify } from 'zipson'
import { decrypt, encrypt } from '@/utils/crypto'
import { zip, unzip, strToU8, strFromU8 } from 'fflate';

let zipObj: any = {
  wtab: []
};
var ALREADY_COMPRESSED = [
  'zip', 'gz', 'png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx', 'ppt', 'pptx',
  'xls', 'xlsx', 'heic', 'heif', '7z', 'bz2', 'rar', 'gif', 'webp', 'webm',
  'mp4', 'mov', 'mp3', 'aifc'
];

function fileToU8(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onerror = reject;
    fr.onloadend = () => {
      resolve(new Uint8Array(fr.result as ArrayBuffer));
    }
  });
}

const download = (file: BlobPart) => {
  const url = URL.createObjectURL(new Blob([file]));
  const dl = document.createElement('a');
  dl.download = `WTab备份-${dayjs().format('YYYY-MM-DD HH:mm')}.wtab`;
  dl.href = url;
  dl.click();
  URL.revokeObjectURL(url);
}

// 下载配置
export async function downloadConfig(data: any) {
  const brotliData = stringify(data)
  const saveData = encrypt(brotliData)

  zipObj.wtab.push({ "layout.json": strToU8(saveData) });
  zip(zipObj, { level: 0 }, (err, data) => {
    if (err) return alert(err);
    download(data);
  });
}

// 上传配置
export async function uploadConfig(file: File) {
  const fileData = await fileToU8(file);
  return new Promise((resolve, reject) => {
    unzip(fileData, {}, (err, data) => {
      if (err) reject(err);
      const fileData = strFromU8(data["wtab/layout.json"]);
      const decryptedData = decrypt(fileData)
      resolve(parse(decryptedData))
    });
  })
}
