import dayjs from 'dayjs'
import { parse, stringify } from 'zipson'
import { decrypt, encrypt } from '@/utils/crypto'

// 下载配置
export function downloadConfig(data: any) {
  const brotliData = stringify(data)
  const saveData = encrypt(brotliData)
  const blob = new Blob([saveData]) // 将数据保存在 blob 对象中
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `WTab备份-${dayjs().format('YYYY-MM-DD HH:mm')}.wtab` // 设置保存的文件名称
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

// 上传配置
export function uploadConfig(file: any): any {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (e: any) => {
      resolve(parse(decrypt(e.target.result)))
    }
    reader.onerror = (e) => {
      reject(e)
    }
  })
}
