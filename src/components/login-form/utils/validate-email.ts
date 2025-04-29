export default function validateEmail(value) {
  value = value.trim()

  if (!value) {
    return { valid: false, msg: 'Email tidak boleh kosong' }
  }

  if (!value.includes('@')) {
    return { valid: false, msg: 'Email harus mengandung @' }
  }

  if (!value.includes('.')) {
    return { valid: false, msg: 'Email harus mengandung titik (.)' }
  }

  const atPos = value.indexOf('@')
  const lastDot = value.lastIndexOf('.')

  if (atPos === 0) {
    return { valid: false, msg: 'Email tidak boleh diawali dengan @' }
  }

  if (lastDot < atPos) {
    return { valid: false, msg: 'Titik (.) harus setelah @' }
  }

  if (value.length < 6) {
    return { valid: false, msg: 'Email terlalu pendek' }
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(value)) {
    return { valid: false, msg: 'Email tidak valid' }
  }

  return { valid: true, msg: 'valid' }
}