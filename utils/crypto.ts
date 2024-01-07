import encUtf8 from 'crypto-js/enc-utf8'
import aes from 'crypto-js/aes'

// 加密方法
export function encrypt(data: any): string {
  return aes.encrypt(data, import.meta.env.VITE_DECRYPT_KEY).toString()
}

// 解密方法
export function decrypt(data: string): string {
  return aes.decrypt(data, import.meta.env.VITE_DECRYPT_KEY).toString(encUtf8)
}
