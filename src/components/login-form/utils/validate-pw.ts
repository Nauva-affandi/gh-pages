export default function validatePassword(value) {
  value = value.trim();

  if (!value) {
    return { valid: false, msg: "Password tidak boleh kosong" };
  }

  if (value.length < 8) {
    return { valid: false, msg: "Password harus lebih dari 8 karakter" };
  }

  if (!/[A-Z]/.test(value)) {
    return { valid: false, msg: "Password harus mengandung huruf kapital" };
  }

  if (!/[a-z]/.test(value)) {
    return { valid: false, msg: "Password harus mengandung huruf kecil" };
  }

  if (!/[0-9]/.test(value)) {
    return { valid: false, msg: "Password harus mengandung angka" };
  }

  return { valid: true, msg: "valid" };
}
