import dayjs from 'dayjs'
import { parse, stringify } from 'zipson'
import { decrypt, encrypt } from '@/utils/crypto'
import { zipSync, strToU8 ,unzlibSync} from 'fflate';
// 下载配置
export function downloadConfig(data: any) {
  const brotliData = stringify(data)
  // const saveData = encrypt(brotliData)
  // const blob = new Blob([saveData]) // 将数据保存在 blob 对象中
  // const url = URL.createObjectURL(blob)
  // const link = document.createElement('a')
  // link.href = url
  // link.download = `WTab备份-${dayjs().format('YYYY-MM-DD HH:mm')}.wtab` // 设置保存的文件名称
  // link.click()
  // link.remove()
  // URL.revokeObjectURL(url)
console.log(111,data);

  let reader = new FileReader();
  // reader.readAsArrayBuffer(imgUrl);
console.log(22,reader);
// reader.addEventListener('load', (e) => {
    const zipped = zipSync({
      // "imgs": {
      //   "11.png": new Uint8Array(e?.target?.result),
      // },
      "layout.json": strToU8(brotliData)
    },
      { level: 1 });
      console.log(33,zipped);

    const blob = new Blob([zipped.buffer], { type: 'application/zip' });
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `WTab备份-${dayjs().format('YYYY-MM-DD HH:mm')}.wtab` // 设置保存的文件名称
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  // });
}

// 上传配置
export function uploadConfig(file: any): any {
  console.log(33,file);
  const data = unzlibSync(file)
  console.log(44,data);
  // return new Promise((resolve, reject) => {
  //   const reader = new FileReader()
  //   reader.readAsText(file)
  //   reader.onload = (e: any) => {
  //     resolve(parse(decrypt(e.target.result)))
  //   }
  //   reader.onerror = (e) => {
  //     reject(e)
  //   }
  // })
}
